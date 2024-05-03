import React, {useEffect, useState, useRef} from "react";
import {Alert, Avatar, Button, Card, FloatingLabel, Textarea} from "flowbite-react";
import './dashboard.css'
import {useUser} from "./ContextProviders/UserProvider.jsx";
import {Modal} from "flowbite-react";
import {FileInput} from "flowbite-react";
import ChatBox from "./ChatBox.jsx";
import {SendHorizontal, Trash2, MessageCircle, Share2} from 'lucide-react';
import axios from "axios";

import {DeletePostModal} from "./DeletePostModal.jsx";
import {SelectTW} from "./DynamicComponents/SelectTW.jsx";



export default function Dashboard() {
    const [selectedValue , setSelectedValue] = useState(0);
    const user = useUser();
    const [alertKind, setAlertKind] = useState('success');
    const [isAlertVisible, setIsAlertVisible] = useState('hidden');
    const [alert, setAlert] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [userComments, setUserComments] = useState([]);
    const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
    const title = useRef('');
    const content = useRef('');
    const tags = useRef('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(0);
    const [categories, setCategories] = useState([]);
    const openDeleteModal = (postId) => {
        setPostToDelete(postId);
        setIsDeleteModalOpen(true);
    }
    const closeDeleteModal = () => setIsDeleteModalOpen(false);
    const handleSelectValue = (newValue) => {
        setSelectedValue(newValue);
    }
    const toggleAlert = () => {
        setIsAlertVisible('visible');
        setTimeout(() => {
            setIsAlertVisible('hidden');
        }, 8000);
    }
    // console.log(user);

    const handleAddPost = (e) => {
        e.preventDefault();
        const name = user.user.user_firstname + ' ' + user.user.user_lastname;
        console.log(user.user.first_name);
        const toBeSent = {
            postTitle: title.current.value,
            postContent: content.current.value,
            postTags: tags.current.value,
            postUser: user.user.username,
            postAuthor: name,
            postDate: new Date().toDateString(),
            postUserId: user.user.user_id,
            postUserEmail: user.user.user_email,
            postCategoryId: selectedValue,
        }
        fetch("http://localhost:3001/posts/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(toBeSent)
        })
            .then(response => response.json())
            .then(() => {
                setAlertKind('success');
                setAlert('Post adaugat cu success!');
                toggleAlert();
                title.current.value = '';
                content.current.value = '';
                tags.current.value = '';
                fetchUserPosts();
                setIsAddPostModalOpen(false);

            }).catch(error => {
            console.error("Eroare la postare", error)
            setAlert(error.message);
        })
    }
    const deleteHandler = (postId) => {
        axios.delete(`http://localhost:3001/posts/${postId}`)
            .then(response => {
                console.log(response.data);
                fetchUserPosts();
                setAlertKind('success');
                setAlert('Post sters cu success!');
                toggleAlert();

            })
            .catch(error => {
                console.error('Error deleting the post', error);
                setAlertKind('failure');
                setAlert(error.message);
                toggleAlert();
            })
    }
    const fetchUserPosts = () => {
        const user_id = user.user?.user_id;
        fetch(`http://localhost:3001/posts/user/${user_id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(data => {
                setUserPosts(data);
            })
            .catch(error => console.error('Failed to fetch posts:', error));
    }
    const fetchUserComments = () => {
        const user_id = user.user?.user_id;
        console.log('user id :', user_id);
        fetch(`http://localhost:3001/comments/user/${user_id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(data => {
                setUserComments(data);
                console.log(data)
            })
            .catch(err => console.error('Failed fetching comments', err));
    }



    const fetchCategories = () => {
        fetch('http://localhost:3001/categories')
            .then(res => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        fetchUserComments();
        fetchUserPosts();
        fetchCategories();

        // console.log('userPosts:', userPosts, 'userComments:', userComments);
    }, []);

    return (
        <div className='dashboard-container dark:text-white loading-f flex'>

            <Modal style={{zIndex: 200}} className='loading-f'
                   show={isAddPostModalOpen}
                   onClose={() => setIsAddPostModalOpen(false)}
                   size="lg"
            >

                <Modal.Body className='p-8'>
                    <form onSubmit={handleAddPost} className="flex flex-col gap-3">
                        <FloatingLabel
                            className="peer-focus:text-green-500 peer-focus:dark:text-green-300 dark:bg-gray-800 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-300 dark:focus:border-green-300"
                            type="text"
                            label="Titlu(optional)"
                            variant="outlined"
                            ref={title}
                        />
                        <FileInput id="file-upload"
                                   className="peer-focus:text-green-500 peer-focus:dark:text-green-300 dark:bg-gray-800 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-300 dark:focus:border-green-300"/>
                        <Textarea
                            className="peer-focus:text-green-500 peer-focus:dark:text-green-300 dark:bg-gray-800 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-300 dark:focus:border-green-300"
                            type="text"
                            rows={12}
                            variant="outlined"
                            required
                            placeholder='La ce te gandesti?'
                            ref={content}
                        />
                        <SelectTW style={{border: '24px solid red'}} className='border-gray-200' title={'Ce postezi?'} data={categories} value={selectedValue} onChange={handleSelectValue}/>
                        <FloatingLabel
                            className="peer-focus:text-green-500 peer-focus:dark:text-green-300 dark:bg-gray-800 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-300 dark:focus:border-green-300"
                            type="text"
                            label="Tags(optional)"
                            variant="outlined"
                            required
                            ref={tags}
                        />
                        <Button gradientDuoTone="greenToBlue" type="submit"><SendHorizontal/></Button>
                        <Button color="gray" onClick={() => setIsAddPostModalOpen(false)}>
                            Close
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
            <DeletePostModal style={{zIndex: 200}} state={isDeleteModalOpen} post={postToDelete} handler={deleteHandler}
                             close={closeDeleteModal}/>
            <Modal style={{zIndex: 200}} className='loading-f'
                   show={isCommentsModalOpen}
                   onClose={() => setIsCommentsModalOpen(false)}
                   size="lg"
            >
                <Modal.Header>Comentarii</Modal.Header>
                <Modal.Body>
                    {userComments.map(item => {
                        return <div className='comment-container shadow-xl'><ChatBox key={item.comment_id}
                                                                                     author={item.comment_author}
                                                                                     date={item.comment_date}
                                                                                     comment={item.comment_content}/>
                        </div>
                    })}
                    <Button style={{width: '100%'}} color="gray" onClick={() => setIsCommentsModalOpen(false)}>
                        Close
                    </Button>

                </Modal.Body>
            </Modal>
            <Alert color={alertKind} className={`${isAlertVisible} ${alertKind} absolute-alert`}
                   onDismiss={() => setIsAlertVisible('hidden')}>
                {alert}
            </Alert>
            <div className='rounded bg-white dark:border-gray-700 dark:bg-gray-800 flex-col p-8 user-info'>

                <Card className='user-card1'>
                    <div className='top-user-settings border-bot-1 p-2 '>
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded/>
                        <p className='text-center'><strong>{user.user?.username}</strong></p>
                        <p className='text-center'>
                            <strong>{user.user?.user_firstname} {user.user?.user_lastname}</strong></p>
                        <p className='text-center'><strong>{user.user?.user_email}</strong></p>
                        <div className='flex gap-8 mt-4'>
                            <p>{user.user?.profil}</p>
                            <p>An: {user.user?.an_studiu}</p>
                            <p>Grupa:{user.user?.grupa}</p>
                        </div>
                    </div>
                    <div className='middle-user-settings p-2 border-bot-1'>
                        {user.user?.is_verified == 0 ? (<div className='verifi'>
                            <p className='text-orange-500'> Not verified</p>
                            <p className='text-gray-500'>Please check your email</p>
                        </div>) : <p className='text-green-400'>Verified</p>}
                        <div className='flex justify-evenly'>
                            <p><strong>Posts:</strong> {userPosts.length ? userPosts.length : 0}</p>
                            <p><strong>Comentarii:</strong> {userComments.length ? userComments.length : 0}</p>
                            <p><strong>Like:</strong> 0</p>
                        </div>
                    </div>
                    <div className='third-user-settings p-2'>
                        <div className='flex gap-8'>
                            <Button onClick={() => setIsAddPostModalOpen(true)}
                                    gradientDuoTone='pinkToOrange'>Posteaza</Button>
                            <Button onClick={() => setIsCommentsModalOpen(true)} gradientDuoTone='pinkToOrange'>Comentariile
                                tale</Button>
                        </div>
                    </div>
                </Card>
                <div className='user-card' style={{border: 'none', padding: 0}}>
                    <p className='text-center mb-2'><strong>Postarile tale</strong></p>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '4rem'}}>
                        {userPosts.length === 0 ? <p style={{color: 'gray', marginTop: '1rem'}}>Nu ai postat nimic
                            inca!</p> : userPosts.map(item => {
                            return (<Card className='loading-out' key={item.post_id} style={{
                                margin: '0 auto',
                                minWidth: '100%',
                                boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
                            }} key={item.post_id} className="max-w-sm loading-f">
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                                    {item.post_title}
                                </h5>
                                <h5 className='text-center'>{item.post_author}</h5>
                                <p className='text-gray-400'>{item.post_date}</p>
                                <p className="font-normal text-gray-700 dark:text-gray-400 border-bot-1 pb-4">
                                    {item.post_content}
                                </p>
                                <div className='actions-container'>
                                    <button onClick={() => openDeleteModal(item.post_id)}><Trash2 color='red' />
                                    </button>
                                    <MessageCircle color='green'/>
                                    <Share2 color='gray'/>
                                </div>
                                <Button gradientDuoTone="pinkToOrange">
                                    Vezi
                                </Button>
                            </Card>)
                        })
                        }</div>
                </div>

            </div>


        </div>
    );
}