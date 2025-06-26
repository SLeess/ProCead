import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({children}){
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState({});

    async function getUser(){
        const res = await fetch('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'GET',
        });

        const data = await res.json();
        setUser(data);
    }

    useEffect(() => {
        if(token){
            getUser();
            console.log(token)
        }
    }, [token]);

    return (
        <AppContext.Provider value={{token, setToken, user}}>
            {children}
        </AppContext.Provider>
    );
};