import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [expireTime, setExpireTime] = useState(localStorage.getItem('expireTime'))
    const [remainingTime, setRemainingTime] = useState(() => {
        
        const expirationTimestamp = Number(expireTime);
        const now = new Date().getTime();
        const millisecondsLeft = expirationTimestamp - now;
        
        return Math.ceil(millisecondsLeft / 1000 / 60);     
    });
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

    /////////-------------------------------------------------AUTH CONTEXT FUNCTIONS-------------------------------------------------/////////
    useEffect(() => {
        async function fetchUser() {
            if (!token) {
                setLoading(false);
                return;
            }
            
            try {
                const response = await fetch('/api/usuario/permissions', {
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

                }
                if (!response.ok) {
                    verifyStatusRequest(response);
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
    /**
     * Função utilizada para tratar casos de exceção de resposta do servidor, dar um alerta e fazer o logout da aplicação
     * @param {*} response 
     */
    const verifyStatusRequest = (response) => {
        switch (response.status) {
            case 401:
                toast.info("Sessão expirada. Por favor, faça login novamente.");
                logout();
                break;
            case 403:
                // toast.info("Você não possui cadastro de candidato, favor realizar seu cadastro novamente.");
                // logout();
                break;
            case 429:
                toast.info("Usuário desconectado por excesso de requisições realizadas.", {
                    autoClose: true,
                });
                logout();
                break;
            default:
                toast.info(`Erro desconhecido: ${response.statusText}.`)
                break;
        }
    }

    const login = (apiResponse) => {
        const { token, expires_at } = apiResponse.data;

        const expirationTimestamp = new Date(expires_at).getTime();

        localStorage.setItem('token', token);
        localStorage.setItem('expireTime', expirationTimestamp);

        setToken(token);
        setExpireTime(expirationTimestamp); 
    };

    /**
     * Função para aparecer o alerta custom de que o usuário teve sua sessão encerrada, solicitando que ele refaça o login
     */
    const [swalLogoutVisible, setSwalLogoutVisible] = useState(false);
    const requestLogout = () => {
        setSwalLogoutVisible(true); 

        Swal.fire({
            title: "Sessão Expirada",
            text: "Sua sessão foi encerrada por inatividade. Por favor, faça login novamente.",
            icon: 'warning',
            confirmButtonText: "Fazer Login",
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                toast.info("Faça login novamente informando seu email ou cpf e a senha.");
                logout();
                window.location.reload();
            }
        });
    }

    /**
     * Função para fazer o logout da aplicação em todos os esquemas e useStates
     */
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expireTime');
        setToken(null);
        setUser(null);
        setRemainingTime(null);
        setExpireTime(null);
        setGlobalPermissions([]);
        setGlobalRoles([]);
        setPermissionsWithRolesByEdital({});
    };

    // ==========================================================
    // EFEITO "VIGIA" PARA EXPIRAÇÃO AUTOMÁTICA
    // ==========================================================
    useEffect(() => {
        if (!token || swalLogoutVisible) {
            setRemainingTime(null);
            return;
        }

        const checkExpiration = () => {
            const expirationTimeString = localStorage.getItem('expireTime');
            
            if (!expirationTimeString) {
                setRemainingTime(null);
                return;
            }

            const expirationTimestamp = Number(expirationTimeString);
            const now = new Date().getTime();

            if (!isNaN(expirationTimestamp)) {
                if (now > expirationTimestamp) {
                    if (!swalLogoutVisible) { 
                        requestLogout();
                    }
                } else {
                    const millisecondsLeft = expirationTimestamp - now;
                    const minutesLeft = Math.ceil(millisecondsLeft / 1000 / 60);
                    setRemainingTime(minutesLeft);
                }
            }
        };

        checkExpiration();

        const interval = setInterval(checkExpiration, 30000);

        return () => clearInterval(interval);

    }, [token, swalLogoutVisible]);

    const changeExpireTime = (expires_at) => {
        const expirationTimestamp = new Date(expires_at).getTime();
        localStorage.setItem('expireTime', expirationTimestamp);
    }

    /////////------------------------------------------------------------------------------------------------------------------------/////////


    /////////------------------------------------------ROLES & PERMISSIONS CONTEXT FUNCTIONS------------------------------------------/////////
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

    /////////-------------------------------------------------------------------------------------------------------------------------/////////

    /**
     * Função para trocar o tema da aplicação de modo global
     */
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    /**
     * Extrai todas as mensagens de erro (strings) de um objeto ou array,
     * não importa o quão aninhado ele esteja.
     * @param {any} errorObject - O objeto ou array de erros.
     * @returns {string[]} - Um array plano com todas as mensagens de erro encontradas.
     */
    const extractErrorMessages = (errorObject) => {

        const findMessages = (value) => {
            if (typeof value === 'string') {
                toast.error(value);
            } 
            else if (Array.isArray(value)) {
                value.forEach(item => findMessages(item));
            } 
            else if (typeof value === 'object' && value !== null) {
                Object.values(value).forEach(val => findMessages(val));
            }
        };

        findMessages(errorObject);
        // return messages;
    };

    async function apiAsyncFetch (method = 'GET', url = ``, body = null, isProtected = true, customErrosTrait = (res, errorResult) => {}){
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        if (isProtected) {
            const token = localStorage.getItem('token');
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            } else {
                throw new Error("Token de autenticação não encontrado.");
            }
        }

        const options = {
            method: method,
            headers: headers,
        };
        
        if (method !== 'GET' && method !== 'HEAD' && body) {
            options.body = JSON.stringify(body);
        }

        const res = await fetch(url, options);

        const newExpiresAt = res.headers.get('x-session-expires-at');
        if (newExpiresAt) {
            changeExpireTime(newExpiresAt);
        }

        if (!res.ok) {
            const errorResult = await res.json().catch(() => null);

            const errorWasHandled = customErrosTrait(res, errorResult);

            if (errorWasHandled) {
                const silentError = new Error("Handled");
                silentError.handled = true;
                throw silentError;
            }

            if (errorResult && errorResult.errors) {
                extractErrorMessages(errorResult.errors); 
            } else {
                verifyStatusRequest(res);
            }
            
            throw new Error(errorResult?.message || `Erro: ${res.status}`);
        }
        return res.json();
    }

    const contextValue = { 
        user, 
        setUser, 
        token, 
        setToken,
        remainingTime,
        setRemainingTime,
        changeExpireTime,
        apiAsyncFetch,
        // expireTime,
        // setExpireTime,
        loading, 
        setLoading,
        toggleTheme, 
        theme, 
        login,
        logout, 
        hasGlobalRole,
        hasGlobalPermission,
        hasRoleForEdital,
        hasPermissionForEdital,
        canAccessAdminArea,
        isSuperAdmin,
        verifyStatusRequest,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);