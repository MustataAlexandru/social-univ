import React, {useEffect, useState} from "react";
import {Avatar} from "flowbite-react";


export default function GroupedAvatar() {

    const [users, setUsers] = useState([])

    function fetchAllUsers() {
        fetch('http://localhost:3001/users/all')
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
            .catch((err) => console.log(err));
    }

    let usersCounter = 0;
    users.forEach(() => usersCounter += 1)

    useEffect(() => {
        fetchAllUsers()
    }, []);

    return (
        <>

            <Avatar.Group className="mb-6 gap-2">

                {users.slice(0, 3).map(item => {
                    return <Avatar key={item.user_id} alt={item.user_id}
                                   img='https://flowbite.com/docs/images/people/profile-picture-5.jpg' rounded size='sm'
                                   stacked/>
                })}
                <div>
                    <p className='p-6 text-gray-400'>{usersCounter - 3} others</p>
                </div>
            </Avatar.Group>
        </>

    );
}
