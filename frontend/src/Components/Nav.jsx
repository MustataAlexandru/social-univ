'use client'
import {Avatar, Button, Dropdown, Navbar} from "flowbite-react";
import {Link} from 'react-router-dom';
import Contact from "./Contact";
import FirstPage from "./FirstPage";
import {useUser} from "./ContextProviders/UserProvider";
import {DarkThemeToggle} from "flowbite-react";
import {useState, useEffect} from 'react';
import Search from "./Search";
import Drawerr from './Drawerr'
import {HiArrowRight} from 'react-icons/hi2'
import Dashboard from "./Dashboard.jsx";
import {Home } from 'lucide-react';


export default function Nav( {setSelectedCategory , selectedCategory} ) {
    const {user} = useUser();
    // console.log('user from nav', user)
    const {logout} = useUser();
    const [showDrawer, setShowDrawer] = useState(false);
    const [categories, setCategories] = useState([]);

    console.log(selectedCategory);
    console.log(categories);

    const fetchCategories = () => {
        fetch('http://localhost:3001/categories')
            .then(res => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        fetchCategories();
    }, []);
    // console.log(categories);
    return (
        <div className>
            {user?.token && <Drawerr show={showDrawer} setShow={setShowDrawer}/>}

            <Navbar className='border-gray-200 border-b' fluid rounded
                    style={{position: 'fixed', width: '100%', top: 0, zIndex: 100}}>

                {user?.token && <Navbar.Brand>

                    <button className="dark:text-white" onClick={() => setShowDrawer(true)}>
                        <HiArrowRight></HiArrowRight>
                    </button>
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span>
                    {/*<img src={logo}*/}
                    {/*     alt='logo'*/}
                    {/*     style={{maxWidth: "128px" , color: 'transparent'}}/>*/}
                </Navbar.Brand>}
                {user && <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings"
                                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    rounded/>
                        }
                    >
                        <Dropdown.Header>

                            <span
                                className="block text-sm text-center">{user.user_lastname} {user.user_firstname} {user.user_role === 'admin' &&
                                <p style={{color: 'green'}}>admin</p>}</span>
                            <span className="block truncate text-sm font-medium">{user.user_email}</span>
                        </Dropdown.Header>
                        {user.user_role === 'admin' && <Dropdown.Item>Admin</Dropdown.Item>}
                        <Dropdown.Item><Link to='/profil' element={<Dashboard/>}>Profil</Link></Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        {user.is_verified == 0 && <Dropdown.Item style={{color: 'orange'}}>Not Verified</Dropdown.Item>}
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
                    </Dropdown>
                </div>}
                <Navbar.Toggle/>
                <Navbar.Collapse style={{}}>
                    <Navbar.Link><DarkThemeToggle/></Navbar.Link>
                    <Navbar.Link> <Search></Search>
                    </Navbar.Link>
                    <Navbar.Link active>
                        <Link to='/' element={<FirstPage/>}> <Home /></Link>
                    </Navbar.Link>
                    <Navbar.Link>
                        <Dropdown inline label='Ce cauti'>
                            {categories.map((item) => {
                                return (<Dropdown.Item key={item.cat_id} onClick={() => setSelectedCategory(item.cat_id)} >{item.cat_title}</Dropdown.Item>)
                            })}
                        </Dropdown>
                    </Navbar.Link>

                    {!user?.token && <Navbar.Link><Link to='/account' element={<Contact/>}>Cont</Link></Navbar.Link>}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
