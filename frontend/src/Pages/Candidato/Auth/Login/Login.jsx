import { AppContext } from "@/Contexts/AppContext";
import { useContext, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { loginSchema } from './loginSchema';
import styles from './Login.module.css';
import { NavigationContext } from "@/Contexts/NavigationContext";

export default function Login() {
    const { setToken, setPermissions, setRoles } = useContext(AppContext);
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
            const formattedErrors = validation.error.format();

            Object.values(formattedErrors).forEach(fieldErrors => {
                if(fieldErrors._errors) {
                    fieldErrors._errors.forEach(err => toast.error(err));
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
                if (result.errors) {
                    toast.error(result.message);
                }
            } else{
                localStorage.setItem('token', result.data.token);
                setToken(result.data.token);
                setPermissions(result.data.permissions || []);
                setRoles(result.data.roles || []);
                navigate('/');
                toast.success(result.message || "Autenticado com sucesso!");
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
        <div className="flex justify-center" style={{alignItems: "center", minHeight: "94.3vh"}}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="login-container flex flex-col items-center">
                <div className="mb-12">
                    <img src="/img/img_logo.png" alt="CEAD Unimontes Logo" className="h-[155px] w-[345px]"/>
                </div>

                <form className="w-full" id="loginForm" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <div className="mx-auto relative h-[45px] w-[352px]">
                            <input 
                                type="text" 
                                id="email" 
                                name="email"
                                ref={inputRef} 
                                className={`${styles.login} input-field`} 
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
                                className={`${styles.login} input-field`} 
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
                        <button type="submit" className={`${styles.login}`}>
                            Entrar
                        </button>
                    </div>

                    <div className="text-center mb-6">
                        <a href="#" className="justify-center text-[12px] text-[#000000b2] hover:underline hover:bg-transparent">Esqueceu sua Senha?</a>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-[15px] text-[#000000e5] mb-2">Ainda não tem uma conta?</p>
                    <button 
                        id={`${styles.createAccountBtn}`}
                        onClick={() => {navigate('/registro')}}
                    >
                        Criar Conta
                    </button>
                </div>
            </div>
        </div>
    );
}