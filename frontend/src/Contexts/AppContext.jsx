import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setPermissions([]);
        setRoles([]);
    };

    const hasPermissionForEdital = (action, editalId) => {
        const permissionName = `${action}-edital:${editalId}`;
        return permissions.includes(permissionName);
    };

    function can(permission) {
        return !!permissions.find((p) => p == permission);
    }

    function isAdmin() {
        return permissions.length > 0;
    }
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        async function fetchUser() {
            if (!token) {
                setLoading(false);
                return;
            }
            
            try {
                const response = await fetch('/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    }
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData.data.user);
                    setPermissions(userData.data.permissions);
                    setRoles(userData.data.roles);
                } else {
                    if (response.status === 401) {
                        toast.info("Sessão expirada. Por favor, faça login novamente.");
                        localStorage.removeItem('token');
                        setToken(null);
                        setUser(null);
                    }
                    if (response.status === 403) {
                        toast.info("Você não possui cadastro de candidato, favor realizar seu cadastro novamente.");
                        localStorage.removeItem('token');
                        setToken(null);
                        setUser(null);
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
                toast.error("Erro ao conectar com o servidor.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [token]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const contextValue = { 
        user, 
        setUser, 
        token, 
        setToken, 
        loading, 
        toggleTheme, 
        theme, 
        logout, 
        permissions, 
        roles, 
        can, 
        isAdmin, 
        setPermissions, 
        setRoles,
        hasPermissionForEdital,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);