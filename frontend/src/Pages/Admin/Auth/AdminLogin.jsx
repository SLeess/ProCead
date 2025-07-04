import { AppContext } from "@/Contexts/AppContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loginSchema } from "@/Pages/Candidato/Auth/Login/loginSchema";

export default function Login() {
    const { setToken, setPermissions, setRoles } = useContext(AppContext);
    const navigate = useNavigate();

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
            const res = await fetch('/api/admin/login', {
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
                setPermissions(result.data.permissions);
                setRoles(result.data.roles);
                navigate('/admin');
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
                                className="border-2 border-[#004da9] w-full h-full px-3 py-2 text-black bg-transparent input-field focus-within:outline-0 focus-within:outline-[#02397c]" 
                                required
                                onChange={updateAttr}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                            />
                            <label htmlFor="username" className={`absolute left-[10px] top-[10px] text-[15px] text-[#000000b2] font-medium pointer-events-none transition-all duration-200 transform ${(focusedField === 'email' || formData.email.length > 0) 
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
                                className="border-2 border-[#004da9] w-full h-full px-3 py-2 text-black bg-transparent input-field focus-within:outline-0 focus-within:outline-[#02397c]" 
                                required
                                onChange={updateAttr}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                            />
                            <label htmlFor="password" className={`absolute left-[10px] top-[11px] text-[15px] text-[#000000b2] font-medium pointer-events-none transition-all duration-200 transform
                                ${(focusedField === 'password' || formData.password.length != 0) 
                                    ? 'text-xs -translate-y-5 bg-white px-0.5 rounded-xl'
                                    : ''}`}>
                                Senha
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-center mb-3">
                        <button type="submit" className="bg-[#2e3192] h-[40px] w-[161px] text-[#f2f5f7] rounded-[4px] font-bold text-[15px] shadow-md hover:bg-[#4448b4] transition-all duration-200 hover:cursor-pointer">
                            Entrar
                        </button>
                    </div>

                    <div className="text-center mb-6">
                        <a href="#" className="justify-center text-[12px] text-[#000000b2] hover:underline hover:bg-transparent">Esqueceu sua Senha?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}