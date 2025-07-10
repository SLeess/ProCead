import { AppContext } from "@/Contexts/AppContext";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { loginSchema } from './loginSchema';
import styles from './Login.module.css';
import { NavigationContext } from "@/Contexts/NavigationContext";
import z from 'zod/v4';
import ThemeToggleBtn from "@/Components/Global/ThemeToggleBtn/ThemeToggleBtn";

export default function Login() {
    const { setToken, setPermissions, setRoles, theme } = useContext(AppContext);
    const { navigate } = useContext(NavigationContext);
    const { inputRef } = useRef(`border-[#004da9]`);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [focusedField, setFocusedField] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        const {email, password} = formData;
        const validation = loginSchema.safeParse({ email, password });
        
        if (!validation.success) {
            const formattedErrors = z.treeifyError(validation.error);
            
            Object.values(formattedErrors.properties).forEach(fieldErrors => {
                if(fieldErrors.errors) {
                    fieldErrors.errors.forEach(err => toast.error(err));
                }
            });

            return;
        }

        try{
            const res = await fetch('/api/login', {
                method: 'post',
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            
            if (!result.success || !res.ok) {
                if(result.errors){
                    Object.values(result.errors).forEach(errorArray => {
                        errorArray.forEach(errorMessage => {
                            toast.error(errorMessage);
                        });
                    });
                }
            } else{
                
                toast.success((result.message || "Autenticado com sucesso!")  + " Redirecionando a página...", {
                    autoClose: 1500,
                    closeOnClick: false,
                    // theme: theme,
                    onClose: () => {
                        localStorage.setItem('token', result.data.token);
                        setToken(result.data.token);
                        setPermissions(result.data.permissions || []);
                        setRoles(result.data.roles || []);
                    }
                });
            }
        } catch (error) {
            toast.error(error.toString());
        }
    };

    const updateAttr = (e) => {
        const attr = e.target.name;
        setFormData(f => ({...f, [attr]: e.target.value}));
    };

    return (
        <>
            <div className={`absolute top-2 right-2`}>
                <ThemeToggleBtn/>
            </div>

            <div className="flex justify-center" style={{alignItems: "center", minHeight: "94.3vh"}}>
                <div className="login-container flex flex-col items-center">
                    <div className="mb-12">
                        <img src={`${theme === 'light' ? "/img/img_logo.png" : '/img/logo_cead_bg_white_full.png'}`} alt="CEAD Unimontes Logo" className="h-[155px] w-[345px]"/>
                    </div>

                    <form className="w-full" id="loginForm" onSubmit={handleLogin}>
                        <div className="mb-4">
                            <div className="mx-auto relative h-[45px] w-[352px]">
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    ref={inputRef} 
                                    className={`${styles.login} input-field `} 
                                    required
                                    autoComplete="on"
                                    onChange={updateAttr}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                />
                                <label htmlFor="email" className={`${styles.loginLabel} ${(focusedField === 'email' || formData.email.length > 0) 
                                        ? 'text-xs -translate-y-5 bg-white px-0.5 rounded-xl'
                                        : ''}`}>
                                    Email
                                </label>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="mx-auto relative h-[45px] w-[352px]">
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    ref={inputRef}
                                    className={`${styles.login} input-field `} 
                                    required
                                    autoComplete="on"
                                    onChange={updateAttr}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                />
                                <label htmlFor="password" className={`${styles.loginLabel}
                                    ${(focusedField === 'password' || formData.password.length != 0) 
                                        ? 'text-xs -translate-y-5 bg-white px-0.5 rounded-xl'
                                        : ''}`}>
                                    Senha
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-center mb-3">
                            <button type="submit" className={`${styles.loginBtn}`}>
                                Entrar
                            </button>
                        </div>

                        <div className="text-center mb-6">
                            <a onClick={()=> navigate('/esqueceu-senha')} className="hover:cursor-pointer justify-center text-[12px] text-[#000000b2] dark:text-white hover:underline hover:bg-transparent">Esqueceu sua Senha?</a>
                        </div>
                    </form>

                    <div className="text-center">
                        <p className="text-[15px] text-[#000000e5] dark:text-white mb-2">Ainda não tem uma conta?</p>
                        <button 
                            id={`${styles.createAccountBtn}`}
                            className={`dark:bg-[#095ec5] bg-white border-[#0000004b] border-1 dark:border-none`}
                            onClick={() => navigate('/registro')}
                        >
                            Criar Conta
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}