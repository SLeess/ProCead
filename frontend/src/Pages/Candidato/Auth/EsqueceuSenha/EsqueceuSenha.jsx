import { toast } from 'react-toastify';
import './EsqueceuSenha.css';
import { esqueceuSenhaSchema } from './esqueceuSenhaSchema';
import { NavigationContext } from '@/Contexts/NavigationContext';
import { useContext, useRef, useState } from 'react';
import z from 'zod/v4';
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import { useAppContext } from '@/Contexts/AppContext';
import ThemeToggleBtn from '@/Components/Global/ThemeToggleBtn/ThemeToggleBtn';

export default function EsqueceuSenha(){
    const { navigate } = useContext(NavigationContext);
    const { theme } = useAppContext();
    const [ loading, setLoading ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ focusedField, setFocusedField ] = useState(null);
    const { inputRef } = useRef(`border-[#004da9]`);

    const handleForgetPassword = async (e) => {
        e.preventDefault();

        const validation = esqueceuSenhaSchema.safeParse({ email });
        
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
            const res = await fetch('/api/forgot-password', {
                method: 'post',
                body: JSON.stringify({'email': email}),
            });

            const result = await res.json();
            console.log(result);
            if (!result.success || !res.ok) {
                if(Array.isArray(result.errors) && result.errors.length > 0){
                    Object(result.errors).forEach((er) => toast.error(er));
                } else{
                    result.errors ? toast.error(result.message) : toast.warning(result.message);
                }
            } else {
                toast.success(result.message);
            }
        } catch (error) {
            toast.error(error.toString());
        } finally{
            setLoading(false);
        }
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
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
                    <img className="mx-auto h-25 w-auto" src={`${theme === 'light' ? "/img/img_logo.png" : '/img/logo_cead_bg_white_full.png'}`} alt="Unimontes logo"/>
                </div>
                <div id="container-forget-pass-form">
                    <div id="alert-forget-password-form" role="alert">
                        <span className="font-normal text-md">Informe abaixo o seu e-mail para receber um link para redefinir a sua senha de acesso.</span>
                    </div>

                    <form className="w-full" id="esqueceuSenhaForm" onSubmit={handleForgetPassword}>
                        <div className="mb-3 mt-5">
                            <div className="mx-auto relative h-[45px] w-[332px] max-w-full">
                                <input 
                                    type="email" 
                                    id="forgetPass" 
                                    name="email"
                                    ref={inputRef} 
                                    className={`input-field`} 
                                    required
                                    autoComplete="on"
                                    onChange={handleChangeEmail}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                />
                                <label htmlFor="forgetPass" className={`${(focusedField === 'email' || email.length > 0) 
                                        ? 'text-xs -translate-y-5 bg-gray-50 px-1' // ⬅️ Alteração aqui
                                        : 'text-[15px] font-medium'}`}>
                                    E-mail de recuperação
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-center mb-3">
                            <button type="submit" id={`forgetPassword`}>
                                Solicitar nova senha
                            </button>
                        </div>
                        <div className="w-10-12 text-center">
                            <a onClick={() => navigate("/login")} id="voltarLoginPage">Voltar para o formulário de login!</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}