import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    /** Global Permissions and roles */
    const [globalRoles, setGlobalRoles] = useState([]);
    const [globalPermissions, setGlobalPermissions] = useState([]);
    /** -------------------------- */

    /** Local Permissions and roles */
    const [permissionsWithRolesByEdital, setPermissionsWithRolesByEdital] = useState({});
    /** -------------------------- */

    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    /**
     * Função para fazer o logout da aplicação em todos os esquemas e useStates
     */
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setGlobalPermissions([]);
        setGlobalRoles([]);
        setPermissionsWithRolesByEdital({});
    };

    /**
     * Verifica se o usuário tem um cargo global específico.
     * @param {string} roleName
     * @returns {boolean}
     */
    function hasGlobalRole(roleName) {
        return globalRoles.includes(roleName);
    }

    /**
     * Verifica se o usuário tem uma permissão global específica ou se ele é um super-Admin.
     * @param {string} permissionName
     * @returns {boolean}
     */
    function hasGlobalPermission(permissionName) {
        return globalPermissions.includes(permissionName) || isSuperAdmin();
    }

    /**
     * Verifica se o usuário tem um cargo para um edital específico.
     * @param {string} roleName
     * @param {number} editalId
     * @returns {boolean}
     */
    function hasRoleForEdital(roleName, editalId) {
        return (permissionsWithRolesByEdital[editalId]?.roles || []).includes(roleName);
    }

     /**
     * Verifica se o usuário tem uma permissão para um edital específico ou se ele é um super-Admin.
     * Considera permissões diretas E herdadas de cargos para aquele edital.
     * @param {string} permissionName
     * @param {number} editalId
     * @returns {boolean}
     */
    function hasPermissionForEdital(permissionName, editalId) {
        const editalData = permissionsWithRolesByEdital[editalId];

        if (!editalData) return false;

        return (editalData.effective_permissions || []).includes(permissionName) || isSuperAdmin();
    }

    /**
     * Determina se o usuário tem acesso administrativo a *algum* edital ou permissão global de admin.
     * Isso define se ele pode acessar a área administrativa.
     * @returns {boolean}
     */
    function canAccessAdminArea() {
        if (globalPermissions.length > 0 || globalRoles.length > 0) {
            return true;
        }

        for (const editalId in permissionsWithRolesByEdital) {
            const data = permissionsWithRolesByEdital[editalId];
            if ((data.roles && data.roles.length > 0) || (data.permissions && data.permissions.length > 0)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Função para verificar se o usuário é 'super-Admin' globalmente.
     * @returns {boolean}
     */
    function isSuperAdmin() {
        return hasGlobalRole('super-Admin');
    }

    /**
     * Função para trocar o tema da aplicação de modo global
     */
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
                const response = await fetch('/api/user-with-permissions', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    }
                });
                if (response.ok) {
                    const res = await response.json();
                    const data = res.data;

                    setUser(data.user);

                    if (data.admin_access) {
                        setGlobalPermissions(data.admin_access.global_permissions || []);
                        setGlobalRoles(data.admin_access.global_roles || []);
                        setPermissionsWithRolesByEdital(data.admin_access.editals_access || {});
                    }

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

    // console.log(token);
    // console.log(user);
    // console.log(globalRoles);
    // console.log(globalPermissions);
    // console.log(permissionsWithRolesByEdital);
    const contextValue = { 
        user, 
        setUser, 
        token, 
        setToken, 
        loading, 
        setLoading,
        toggleTheme, 
        theme, 
        logout, 
        hasGlobalRole,
        hasGlobalPermission,
        hasRoleForEdital,
        hasPermissionForEdital,
        canAccessAdminArea,
        isSuperAdmin,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);