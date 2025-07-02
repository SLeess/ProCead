import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export default function AppProvider({children}){
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return 'light';
    });

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };
    

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        async function fetchUser() {
            if (token) {
                try {
                    const response = await fetch('/api/user', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    } else {
                        if (response.status === 401) {
                            toast.info("Login inválido ou expirado. Redirecionando para a tela de Login...");
                            localStorage.removeItem('token');
                            setToken(null);
                            setUser(null);
                        }
                    }
                } catch (error) {
                    console.error("Erro ao validar token:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchUser();
    }, [token]);


    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark'){
            root.classList.add('dark');
        } else{
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const contextValue = { user, setUser, token, setToken, loading, toggleTheme, theme, logout }; // Exponha o 'loading'

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};