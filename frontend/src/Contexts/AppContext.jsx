import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { set } from "zod/v4";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || localStorage.getItem('tokenAdmin'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
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

    function can(permission) {
        return !!permissions.find((p) => p == permission);
    }

    function isAdmin() {
        console.log(permissions)
        return permissions.length > 0;
    }
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
                        // console.log("Dados do usuário:", userData);
                        setUser(userData.data.user);
                        setPermissions(userData.data.permissions);
                        setRoles(userData.data.roles);
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
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const contextValue = { user, setUser, token, setToken, loading, toggleTheme, theme, logout, permissions, roles, can, isAdmin, setPermissions, setRoles }; // Exponha o 'loading'

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};