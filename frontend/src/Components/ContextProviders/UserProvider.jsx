import React, { createContext, useContext, useState , useEffect} from 'react';



export const UserContext = createContext({ user: null, login: () => {}, logout: () => {} , isLoggedIn: null});

export const UserProvider = ({ children }) => {
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        console.log(userData);
        localStorage.setItem('user', JSON.stringify(userData));

    };

    const logout = () => {

        setUser(null);
        setIsLoggedIn(false)
        localStorage.removeItem('user');
        window.location = '/';

    };

    useEffect(() => {

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, login, logout , isLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUser = () => {
    const context = useContext(UserContext);

    return context;
};