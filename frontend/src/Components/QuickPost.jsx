import {Button, FileInput, FloatingLabel, Textarea} from "flowbite-react";
import {useUser} from "./ContextProviders/UserProvider.jsx";
import React, { useRef, useState} from "react";
import {SendHorizontal} from "lucide-react";

export default function QuickPost({ render }) {
    const user = useUser();
    const title = useRef(null);
    const tags = useRef(null);
    const content = useRef(null);
    const fileUpload = useRef(null);


    const addPostHandler = (e) => {
        e.preventDefault();  // This stops the form from submitting in the traditional way

        const name = user.user.user_firstname + ' ' + user.user.user_lastname;
        const toSend = {
            postTitle: '',
            postContent : content.current.value,
            postTags: '',
            postUser: user.user.username,
            postAuthor: name,
            postDate: new Date().toDateString(),
            postUserId: user.user.user_id,
            postUserEmail: user.user.user_email
        };

        fetch('http://localhost:3001/posts/add', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toSend)
        })
            .then(response => response.json())
            .then(() => {
                render();
            })
            .catch(error => {
                console.error('Failed to create post:', error);
            });
    };


    return (
        <form onSubmit={addPostHandler}  className="flex items-center max-w-lg mx-auto" style={{ minWidth: '100%' }}>

            <input
                ref={content}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-450 dark:focus:border-orange-450"
                placeholder="Posteaza Rapid"

                required
                style={{borderRadius: 'none' , borderTopLeftRadius: '10px' , borderBottomLeftRadius: '10px'}}
            />

            <Button
                gradientDuoTone="pinkToOrange"
                type="submit"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-white bd-t-r-t-b"
            >
                <svg className="w-8 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 20 20">
                    <SendHorizontal />
                </svg>
            </Button>
        </form>
);
}
