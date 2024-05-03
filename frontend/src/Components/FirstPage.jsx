import React, {useState, useEffect} from 'react'
import {Button, Card} from "flowbite-react";
import './firstpage.css';
import ChatBox from "./ChatBox.jsx";
import {DateTime} from "luxon";
import GroupedAvatars from "./AvatarGroup";
import QuickPost from "./QuickPost.jsx";
import {MessageCircle, Share2, RotateCcw, ArrowUpFromDot} from "lucide-react";


export default function FirstPage({selectedCategory, setSelectedCategory}) {

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [showsScrolBtn, setShowScrolBtn] = useState(false);

    useEffect(() => {
        const handleButtonVisibility = () => {
            window.scrollY > 300 ? setShowScrolBtn(true) : setShowScrolBtn(false);
        };

        window.addEventListener("scroll", handleButtonVisibility);
        return () => {
            window.addEventListener("scroll", handleButtonVisibility);
        };
    }, []);

    const fetchCategoryPosts = (categoryId) => {
        fetch(`http://localhost:3001/posts/${categoryId}`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch((err) => console.log(err))
    }

    const fetchPosts = () => {
        fetch('http://localhost:3001/posts')
            .then(res => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.log(err));
    }
    const selectedUserHandler = (e) => {
        e.preventDefault();
    }
    const fetchComments = () => {
        fetch('http://localhost:3001/comments/limit10')
            .then(res => res.json())
            .then(data => setComments(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (selectedCategory !== null) {
            fetchCategoryPosts(selectedCategory)
        } else fetchPosts();
    }, [selectedCategory]);

    useEffect(() => {
        fetchComments();
        fetchCategoryPosts(selectedCategory)
    }, []);
    // console.log(posts);
    // console.log(comments)
    console.log(selectedCategory);
    return (
        <div className='dark:text-white flex'>
            {
                showsScrolBtn && (
                    <Button gradientDuoTone='pinkToOrange' className='scroll-btn'
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: "smooth",
                                });
                            }}
                    ><ArrowUpFromDot/></Button>)
            }

            <div className='posts-container'>
                <aside
                    className='aside rounded-lg bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col max-w-sm loading-f p-6 border-gray-200'>
                    <h1 className='text-center border-gray-200'
                        style={{marginBottom: '-2rem', paddingBottom: '15px'}}>Ce spun colegii</h1>
                    {comments.map(item => {
                        const date = item.comment_date;
                        const zonedDate = DateTime.fromISO(date).setZone('Europe/Bucharest');
                        const formattedDate = zonedDate.toFormat('MMMM d, yyyy , HH:mm z');
                        return <ChatBox key={item.comment_id} className='chat-firstpage' author={item.comment_author}
                                        comment={item.comment_content} date={formattedDate}/>
                    })}
                </aside>
                <div className='middle-side-posts'>
                    <QuickPost render={fetchPosts}/>
                    {selectedCategory !== null ?
                        <Button gradientDuoTone='pinkToOrange' className='slide-left posts-reset-btn'
                                onClick={() => setSelectedCategory(null)}><p className='mt-0.5 mr-1.5'>Vezi cele mai
                            noi</p> <RotateCcw/></Button> : ''}
                    <div className='cards'>


                        {
                            posts.map(item => {
                                return (<Card key={item.post_id} className="max-w-screen-lg loading-f">
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {item.post_title}
                                    </h5>
                                    <h5 className='text-center' onClick={selectedUserHandler}>{item.post_user}</h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                        {item.post_content}
                                    </p>
                                    <div className='actions-container'>

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
                <aside className='aside flex-col'><GroupedAvatars/></aside>

            </div>
        </div>
    )
}
