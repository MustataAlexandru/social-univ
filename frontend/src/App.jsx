import Nav from './Components/Nav';
import Contact from './Components/Contact';
import {Routes, Route} from "react-router-dom";
import FirstPage from './Components/FirstPage';
import Register from './Components/Register';
import {UserContext } from "./Components/ContextProviders/UserProvider";
import Foter from "./Components/Footer";
import Dashboard from "./Components/Dashboard";
import {Flowbite} from "flowbite-react";
import {useContext, useEffect, useState} from "react";



function App() {
    const {user} = useContext(UserContext);
    const [selectedCategory , setSelectedCategory] = useState(null);
    const handleCategoryChange = (category) => {
        console.log(selectedCategory)
        setSelectedCategory(category);
    }
    useEffect( () => {

    },[selectedCategory])

    return (

        <Flowbite theme={{dark: true}}>
            <main className="dark:bg-gray-800">
                <Nav selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange} />
                <Routes>
                    <Route path='/'  element={<FirstPage selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange}/>}/>
                    <Route path='/contact' element={<Contact/>}/>
                    {!user?.token && <Route path='/account' element={<Register/>}></Route>}
                    {user?.token && <Route path={`/profil`} element={<Dashboard/>}/>}
                    {user?.token && <Route path='*' element={<FirstPage setSelectedCategory={handleCategoryChange} selectedCategory={selectedCategory} />}></Route>}
                </Routes>
                <Foter/>
            </main>
        </Flowbite>

    );
}

export default App;
