import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";
import ThemeToggleBtn from "@/Components/Global/ThemeToggleBtn/ThemeToggleBtn";
import { useAppContext } from "@/Contexts/AppContext";
import { NavigationContext } from "@/Contexts/NavigationContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import './RecuperarSenha.css';
import { recuperarSenhaSchema } from "./recuperarSenhaSchema";
import z from "zod/v4";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

import logo1 from '@/assets/img/img_logo.png';
import logo2 from '@/assets/img/logo_cead_bg_white_full.png';

export default function RecuperarSenha()
{
    const { theme, apiAsyncFetch } = useAppContext();
    const [ searchParams ] = useSearchParams();
    const { navigate } = useContext(NavigationContext);
    const inputRef = useRef(null);

    const [ loading, setLoading ] = useState(false);
    const [errors, setErrors] = useState({});
    const [ focusedField, setFocusedField ] = useState(null);
    const [formData, setFormData] = useState({
        token: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    useEffect(() => {
        setFormData(f => (
            {
                ...f,
                token: searchParams.get('token'),
                email: searchParams.get('email'),
            }
        ));

        setErrors({});
    }, [searchParams]);

    async function handleChangePassword(e){
        e.preventDefault();
        const validation = recuperarSenhaSchema.safeParse( formData );
        
        if (!validation.success) {
            const formattedErrors = z.treeifyError(validation.error);
                        
            Object.values(formattedErrors.properties).forEach(fieldErrors => {
                if(fieldErrors.errors) {
                    fieldErrors.errors.forEach(err => toast.error(err));
                }
            });

            return;
        }

        setLoading(true);
        try{
            const result = await apiAsyncFetch({
                url: `/api/reset-password`,
                method: 'POST',
                body: formData,
                isProtected: false,
            });

            toast.success(result.message  + " Redirecionando a página de Login...");
            navigate('/login');
        } finally{
            setLoading(false);
        }
    };

    const handleChangeAttr = (e) => {
        const attr = e.target.name;
        const value = e.target.value;

        setFormData(f => ({...f, [attr]: value}));
        setErrors(
            er => {
                const {[attr]: _, ...remainErrors} = er;
                return remainErrors;
            }
        )
    };

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisibility] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisibility(!isConfirmPasswordVisible);
    };

    return (
        <>
            <div className={`absolute top-2 right-2`}>
                <ThemeToggleBtn/>
            </div>
            {
                loading &&
                <LoaderPages/>
            }
            <div className="flex min-w-[300px] min-h-[95vh] flex-col px-6 py-5 lg:px-8 justify-center">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-14 sm:mt-0">
                    <img className="mx-auto h-25 w-auto" src={`${theme === 'light' ? logo1 : logo2 }`} alt="Unimontes logo"/>
                </div>
                <div id="container-recover-pass-form">
                    <div id="alert-password-form" role="alert">
                        <span className="font-normal text-md">Informe abaixo uma nova senha para sua conta.</span>
                    </div>

                    <form className="w-full" id="recuperarSenhaForm" onSubmit={handleChangePassword}>
                        <div className="mb-3 mt-5">
                            <div className="mx-auto relative h-[45px] w-[332px] max-w-full">
                                <input 
                                    type={isPasswordVisible ? 'text' : 'password'} 
                                    id="password" 
                                    name="password"
                                    ref={inputRef} 
                                    className={`input-field recoverPass`} 
                                    required
                                    autoComplete="on"
                                    onChange={handleChangeAttr}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {isPasswordVisible ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                                <label htmlFor="recoverPass" className={`${(focusedField === 'password' || formData.password.length > 0) 
                                        ? 'text-xs -translate-y-5 bg-gray-50 px-1' // ⬅️ Alteração aqui
                                        : 'text-[15px] font-medium'}`}>
                                    Senha
                                </label>
                            </div>
                        </div>
                        <div className="mb-3 mt-5">
                            <div className="mx-auto relative h-[45px] w-[332px] max-w-full">
                                <input 
                                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                                    id="confirm_password" 
                                    name="confirm_password"
                                    ref={inputRef} 
                                    className={`input-field recoverPass`} 
                                    required
                                    autoComplete="on"
                                    onChange={handleChangeAttr}
                                    onFocus={() => setFocusedField('confirm_password')}
                                    onBlur={() => setFocusedField(null)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {isConfirmPasswordVisible ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                                <label htmlFor="recoverPass" className={`${(focusedField === 'confirm_password' || formData.confirm_password.length > 0) 
                                        ? 'text-xs -translate-y-5 bg-gray-50 px-1' // ⬅️ Alteração aqui
                                        : 'text-[15px] font-medium'}`}>
                                    Confirme sua Senha
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-center mb-3">
                            <button type="submit" id={`novaSenha`}>
                                Alterar a Senha
                            </button>
                        </div>
                        <div className="w-10-12 text-center">
                            <a onClick={() => navigate("/login")} id="voltarLoginPageRecoverPass">Voltar para o formulário de login!</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}