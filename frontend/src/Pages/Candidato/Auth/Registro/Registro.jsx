import { AppContext } from "../../../../Contexts/AppContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "./Registro.css";
import { maskCPF, registerSchema } from "./registroSchema";
import { NavigationContext } from "@/Contexts/NavigationContext";
import z from 'zod/v4';
import ThemeToggleBtn from "@/Components/Global/ThemeToggleBtn/ThemeToggleBtn";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";

export default function Registro(){

    const { navigate } = useContext(NavigationContext);

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        cpf: '',
        password: '',
        confirm_password: '',
    });

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const { setToken, theme } = useContext(AppContext);

    const handleRegister = async (e) => {
        if(loading == true) 
            return;

        e.preventDefault();

        setLoading(true);

        try {
            const validatedData = registerSchema.safeParse(formData);
            if (!validatedData.success) {
                const formattedErrors = z.treeifyError(validatedData.error);
                                        
                Object.values(formattedErrors.properties).forEach(fieldErrors => {
                    if(fieldErrors.errors) {
                        fieldErrors.errors.forEach(err => toast.error(err));
                    }
                });
                return;
            }

            setErrors({});

            const response = await fetch('/api/register', {
                method: 'post',
                body: JSON.stringify(validatedData.data)
            });

            const result = await response.json();   

            if (!result.success || !response.ok) {
                if (result.errors) {
                    setErrors(e => ({...e, ...result.errors}));

                    Object.values(result.errors).forEach(errorArray => {
                        errorArray.forEach((errorMessage) => {
                            return toast.error(errorMessage);
                        });

                    });
                } else {
                    toast.error(result.message || "Ocorreu um erro desconhecido.");
                }
            } else{
                toast.success((result.message ||  "Registrado com sucesso!"));
                localStorage.setItem('token', result.data.token);
                setToken(result.data.token);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.toString());
        } finally {
            setLoading(false);
        }

    };

    const updateAttr = (e) => {
        const attr = e.target.name;
        
        var finalValue = e.target.value;

        if (attr === 'cpf') {
            finalValue = maskCPF(e.target.value);
        }
        
        setFormData(f => ({...f, [attr]: finalValue}));

        setErrors(er => {
            const {[attr]: _, ...remainErrors} = er;
            return remainErrors;
        });
    };

    return(
        <>
            <div className={`absolute top-2 right-2`}>
                <ThemeToggleBtn/>
            </div>
            <div className="flex min-w-[300px] min-h-[95vh] flex-col px-6 py-5 lg:px-8 justify-center">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-14 sm:mt-0">
                    <img className="mx-auto h-25 w-auto" src={`${theme === 'light' ? "/img/img_logo.png" : '/img/logo_cead_bg_white_full.png'}`} alt="Unimontes logo"/>
                </div>
                {
                    loading && <LoaderPages></LoaderPages>
                }
                <div id="container-form">
                    <div id="alert-form" role="alert">
                        <span className="flex rounded-full bg-blue-500 uppercase px-2 py-1 text-xs font-bold mr-3"><strong>Atenção</strong></span>
                        <span className="font-semibold text-sm mr-2 text-left flex-auto">Só é possível criar uma conta por CPF e e-mail.</span>
                        <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                    </div>
                    <form onSubmit={handleRegister} id="register">
                        <div>
                            <label htmlFor="nome"><strong>Nome completo</strong></label>
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    id={`nome`} 
                                    name={`nome`}
                                    value={formData.nome} 
                                    placeholder="Nome Completo" 
                                    onChange={updateAttr} 
                                    required 
                                    className={` ${errors.nome ? 'outline-red-600' : 'outline-gray-300'}`}
                                    />
                                {
                                    errors.nome && (
                                        <span id="nome-span" className="invalid-feedback px-3">{errors.nome[0]}</span>
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <label htmlFor="cpf"><strong>CPF</strong></label>
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    name={`cpf`} 
                                    id={`cpf`}
                                    value={formData.cpf} 
                                    autoComplete="cpf" 
                                    // data-mask="000.000.000-00" 
                                    placeholder="000.000.000-00" 
                                    required 
                                    maxLength="14" 
                                    onChange={updateAttr}
                                    className={` ${errors.cpf ? 'outline-red-600' : 'outline-gray-300'}`}
                                />
                                {
                                    errors.cpf && (
                                        <span id="nome-span" className="invalid-feedback px-3">{errors.cpf[0]}</span>
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email"><strong>Email</strong></label>
                            <div className="mt-2">
                                <input 
                                    type="email" 
                                    name={`email`} 
                                    id={`email`}
                                    value={formData.email}  
                                    autoComplete="email" 
                                    placeholder="seu-email@dominio.com" 
                                    onChange={updateAttr} 
                                    required 
                                    className={` ${errors.email ? 'outline-red-600' : 'outline-gray-300'}`}
                                />
                                {
                                    errors.email && (
                                        <span id="nome-span" className="invalid-feedback px-3">{errors.email[0]}</span>
                                    )
                                }
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"><strong>Senha</strong></label>
                            </div>
                            <div className="mt-2">
                                <input 
                                    type="password" 
                                    name={`password`} 
                                    id={`password`} 
                                    value={formData.password} 
                                    autoComplete="current-password" 
                                    placeholder="*********" 
                                    onChange={updateAttr} 
                                    required 
                                    className={` ${errors.password ? 'outline-red-600' : 'outline-gray-300'}`}
                                />
                                {
                                    errors.password && (
                                        <span id="nome-span" className="invalid-feedback px-3">{errors.password[0]}</span>
                                    )
                                }
                            </div>
                        </div>

                        <div className="">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password_confirmation"><strong>Confirmar Senha</strong></label>
                            </div>
                            <div className="mt-2">
                                <input 
                                    type="password" 
                                    name={`confirm_password`} 
                                    id={`confirm_password`} 
                                    autoComplete="current-password" 
                                    placeholder="*********"
                                    value={formData.confirm_password}  
                                    onChange={updateAttr} 
                                    required 
                                    className={` ${errors.confirm_password ? 'outline-red-600' : 'outline-gray-300'}`}
                                />
                                {
                                    errors.confirm_password && (
                                        <span id="nome-span" className="invalid-feedback px-3">{errors.confirm_password[0]}</span>
                                    )
                                }
                            </div>
                        </div>

                        <div>
                            <button type="submit" id="cadastroBtn">
                                    Cadastrar-se
                            </button>
                        </div>
                        <div className="w-10-12 text-center">
                            <a onClick={() => navigate("/login")} id="already_have_account">Já possui uma conta? Faça login!</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}