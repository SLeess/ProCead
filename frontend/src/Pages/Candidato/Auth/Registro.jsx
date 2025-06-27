import { AppContext } from "../../../Contexts/AppContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Registro(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [errors, setErrors] = useState({});

    const { setToken } = useContext(AppContext);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/register', {
                method: 'post',
                body: JSON.stringify(formData)
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
                toast.success(result.message || "Registrado com sucesso!");
                localStorage.setItem('token', result.data.token);
                setToken(result.data.token);
                navigate('/');
            }
        } catch (error) {
            toast.error(error.toString());
        }

    };

    const updateAttr = (e) => {
        const attr = e.target.name;
        setFormData(f => ({...f, [attr]: e.target.value}));

        setErrors(e => {
            const {[attr]: _, ...remainErrors} = e;
            return remainErrors;
        });
    };

    return(
        <>
            <h1 className="title">Cadastre-se agora</h1>
            <form className="w-1/2 mx-auto space-y-8" onSubmit={handleRegister}>
                <div>
                    <input type="text" id={`nome`} name={`nome`} placeholder="Nome" onChange={updateAttr} className={errors.nome ? 'input-error' : ''}/>
                    {
                        errors.nome && (
                            <span id="nome-span" className="invalid-feedback">{errors.nome[0]}</span>
                        )
                    }
                </div>
                <div>
                    <input type="text" id={`email`} name={`email`}  placeholder="Email" onChange={updateAttr} className={errors.email ? 'input-error' : ''}/>
                    {
                        errors.email && (
                            <span id="email-span" className="invalid-feedback">{errors.email[0]}</span>
                        )
                    }
                </div>
                <div>
                    <input type="password" id={`password`} name={`password`} placeholder="Senha" onChange={updateAttr} className={errors.password || errors.confirm_password ? 'input-error' : ''}/>
                    {
                        errors.password && (
                            <span id="password-span" className="invalid-feedback">{errors.password[0] ?? errors.confirm_password[0]}</span>
                        )
                    }
                </div>
                <div>
                    <input type="password" id={`confirm_password`} name={`confirm_password`} placeholder="Confirme sua Senha" onChange={updateAttr} className={errors.password || errors.confirm_password ? 'input-error' : ''}/>
                    {
                        errors.confirm_password && (
                            <span id="confirm_password-span" className="invalid-feedback">{errors.confirm_password[0]}</span>
                        )
                    }
                </div>
                <button className="primary-btn w-fit px-5 mx-auto">Registrar-se</button>
            </form>
        </>
    );
}