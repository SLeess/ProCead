import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Registro(){

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [errors, setErrors] = useState({});

    const handleRegister = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/register', {
            method: 'post',
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.success) {
            toast.success(data.message || "Registrado com sucesso!");
        } else {
            if (data.errors) {
                setErrors(e => ({...e, ...data.errors}));

                Object.values(data.errors).forEach(errorArray => {
                    errorArray.forEach((errorMessage) => {
                        return toast.error(errorMessage);
                    });

                });
            } else {
                toast.error(data.message || "Ocorreu um erro desconhecido.");
            }
        }
    };

    const updateAttr = (e) => {
        const attr = e.target.name;
        setFormData(f => ({...f, [attr]: e.target.value}));
    };

    return(
        <>
            <h1 className="title">Cadastre-se agora</h1>
            <form className="w-1/2 mx-auto space-y-8" onSubmit={handleRegister}>
                <div>
                    <input type="text" id={`nome`} name={`nome`} placeholder="Nome" onChange={updateAttr} className={errors.nome ? 'input-error' : ''}/>
                    {
                        errors.nome && (
                            <div className="invalid-feedback">{errors.nome}</div>
                        )
                    }
                </div>
                <div>
                    <input type="text" id={`email`} name={`email`}  placeholder="Email" onChange={updateAttr} className={errors.email ? 'input-error' : ''}/>
                    {
                        errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                        )
                    }
                </div>
                <div>
                    <input type="password" id={`password`} name={`password`} placeholder="Senha" onChange={updateAttr} className={errors.password || errors.confirm_password ? 'input-error' : ''}/>
                    {
                        errors.password && (
                            <div className="invalid-feedback">{errors.password ?? errors.confirm_password}</div>
                        )
                    }
                </div>
                <div>
                    <input type="password" id={`confirm_password`} name={`confirm_password`} placeholder="Confirme sua Senha" onChange={updateAttr} className={errors.password || errors.confirm_password ? 'input-error' : ''}/>
                    {
                        errors.confirm_password && (
                            <div className="invalid-feedback">{errors.password ?? errors.confirm_password}</div>
                        )
                    }
                </div>
                <button className="primary-btn w-fit px-5 mx-auto">Registrar-se</button>
            </form>
        </>
    );
}