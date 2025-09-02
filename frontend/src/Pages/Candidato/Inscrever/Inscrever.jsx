import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import Stepper from '@/Components/Global/Stepper/Stepper';
import { CheckCheck, ListCheck, ListCollapse, MapPinHouse } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { CiCircleInfo } from 'react-icons/ci';
import InformacoesBasicas from './Tabs/InformacoesBasicas';
import Endereco from './Tabs/Endereco';
import EscolhaDaVaga from './Tabs/EscolhaDaVaga';
import DetalhesDaVaga from './Tabs/DetalhesDaVaga';
import { toast } from "react-toastify";
import Confirmacao from './Tabs/Confirmacao';
import { useAppContext } from '@/Contexts/AppContext';
import { useNavigate, useParams } from 'react-router-dom';


const Inscrever = () => {
    const { token, user, verifyStatusRequest } = useAppContext();
    const { editalId } = useParams();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [enabledTabs, setEnabledTabs] = useState([0]);
    const [loading, setLoading] = useState(false);

    const tabsData = [
        { label: 'Informações Básicas', icon: <CiCircleInfo /> },
        { label: 'Endereço', icon: <MapPinHouse /> },
        { label: 'Escolha da Vaga', icon: <ListCheck /> },
        { label: 'Detalhes da Vaga', icon: <ListCollapse /> },
        { label: 'Confirmação', icon: <CheckCheck /> },
    ];

    const handleNext = () => {
        if (activeTabIndex < tabsData.length - 1) {
            setActiveTabIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleBack = () => {
        if (activeTabIndex > 0) {
            setActiveTabIndex(prevIndex => prevIndex - 1);
        }
    };

    const defaultFormData = true;

    const [formData, setFormData] = useState({
        nome_completo: defaultFormData ? 'John Doe' : '',
        cpf: defaultFormData ? '123.456.789-00' : '',
        email: defaultFormData ? 'john.doe@example.com' : '',
        data_nascimento: defaultFormData ? '1990-01-01' : '',
        telefone: defaultFormData ? '(11) 99999-9999' : '',
        genero: defaultFormData ? 'Masculino' : '',
        nome_social: defaultFormData ? '' : '',
        identidade_genero: defaultFormData ? 'Cisgênero' : '',
        rg: defaultFormData ? '12.345.678-9' : '',
        estado_civil: defaultFormData ? 'Solteiro(a)' : '',
        uf_nascimento: defaultFormData ? 'SP' : '',
        nacionalidade: defaultFormData ? 'Brasileiro(a)' : '',
        naturalidade: defaultFormData ? 'São Paulo' : '',
        cep: defaultFormData ? '12345-678' : '',
        rua: defaultFormData ? 'Rua dos Bobos' : '',
        bairro: defaultFormData ? 'Centro' : '',
        numero: defaultFormData ? '0' : '',
        complemento: defaultFormData ? 'Apto 123' : '',
        cidade: defaultFormData ? 'São Paulo' : '',
        uf: defaultFormData ? 'SP' : '',
        vagas: [],
        termo_responsabilidade: false,
        user_uuid: user?.uuid
    });

    const handleOnChangeAttr = (e, attr) => {
        const { value } = e.target;
        setFormData(f => ({ ...f, [attr]: value }));
    };

    const navigate = useNavigate();

    const [vagas, setVagas] = useState([]);
    useEffect(() => {
        async function fetchVagas() {
            setLoading(true);
            try {
                const res = await fetch(`/api/admin/quadro-vagas/${editalId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await res.json();

                if (!res.ok) {
                    verifyStatusRequest(res.status, result);
                    throw new Error(`Erro ao buscar Vagas: ${res.status} ${res.statusText}`);
                }

                setVagas(result.data);
            } catch (error) {

                setVagas([]);
                throw new Error(`Erro ao buscar vagas: ${error}`)
            } finally {
                setLoading(false);
            }
        }
        fetchVagas();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();

            // Append all formData fields, handling nested 'vagas' array
            Object.keys(formData).forEach(key => {
                if (key === 'vagas') {
                    formData.vagas.forEach((vaga, index) => {
                        Object.keys(vaga).forEach(vagaKey => {
                            data.append(`vagas[${index}][${vagaKey}]`, vaga[vagaKey]);
                        });
                    });
                } else if (key === 'termo_responsabilidade') {
                    data.append(key, formData[key] ? 1 : 0);
                } else {
                    data.append(key, formData[key]);
                }
            });

            // Append additional data
            // data.append('user_uuid', JSON.stringify(user.uuid));
            data.append('editalId', editalId);

            const res = await fetch('/api/inscricao', {
                method: 'post',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await res.json();

            if (!result.success || !res.ok) {
                if (result.errors) {
                    if (Array.isArray(result.errors)) {
                        result.errors.forEach(errorMessage => {
                            toast.error(errorMessage);
                        });
                    } else {
                        toast.error(result.errors);
                    }
                } else if (result.message) {
                    toast.error(result.message);
                } else {
                    toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.");
                }
            } else {
                localStorage.setItem('token', result.data.token);
                toast.success((result.message || "Inscrição realizada com sucesso! Redirecionando..."));
                new Promise(resolve => setTimeout(resolve, 3000)).then(() => navigate(`/inscricao/${editalId}`));
            }
        } catch (error) {
            toast.error(error.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id='inscricao' >
            <nav aria-label="Tabs" className="timeline-nav overflow-x-auto mb-2">
                <Stepper tabsData={tabsData} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} enabledTabs={enabledTabs} />
            </nav>
            <form id="content" onSubmit={handleSubmit}>
                {
                    loading && (
                        <div
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0,0,0, 0.3)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 9999,
                            }}
                        >
                            <LoaderPages />
                        </div>
                    )
                }
                {
                    activeTabIndex === 0 && <InformacoesBasicas formData={formData} handleOnChangeAttr={handleOnChangeAttr} handleNext={handleNext} enabledTabs={enabledTabs} setEnabledTabs={setEnabledTabs} />
                }
                {
                    activeTabIndex === 1 && <Endereco formData={formData} handleOnChangeAttr={handleOnChangeAttr} handleNext={handleNext} handleBack={handleBack} enabledTabs={enabledTabs} setEnabledTabs={setEnabledTabs} />
                }
                {
                    activeTabIndex === 2 && <EscolhaDaVaga  vagas={vagas} formData={formData} setFormData={setFormData} handleNext={handleNext} handleBack={handleBack} enabledTabs={enabledTabs} setEnabledTabs={setEnabledTabs} />
                }
                {
                    activeTabIndex === 3 && <DetalhesDaVaga  vagas={vagas} formData={formData} setFormData={setFormData} handleNext={handleNext} handleBack={handleBack} enabledTabs={enabledTabs} setEnabledTabs={setEnabledTabs} />
                }
                {
                    activeTabIndex === 4 && <Confirmacao vagas={vagas} formData={formData} setFormData={setFormData} handleOnChangeAttr={handleOnChangeAttr} handleNext={handleNext} handleBack={handleBack} enabledTabs={enabledTabs} setEnabledTabs={setEnabledTabs} />
                }
            </form>
        </div>
    )
}

export default Inscrever