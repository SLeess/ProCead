import { LucideCalendarCheck } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { FaRegCalendarCheck } from "react-icons/fa";
import Stepper from "@/Components/Global/Stepper/Stepper";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";
import PrazosIniciais from "./Tabs/PrazosIniciais";
import InformacoesBasicas from "./Tabs/InformacoesBasicas";
import PrazosFinais from "./Tabs/PrazosFinais";
import './NovoEdital.css';
import { useAppContext } from "@/Contexts/AppContext";
import AccessDenied from "@/Components/Global/AccessDenied/AccessDenied";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { NavigationContext } from "@/Contexts/NavigationContext";
import { editalCreateSchema } from "./editalCreateSchema";

const Step = ({ icon: IconComponent, label, isActive, isCompleted }) => {
    const statusClass = isActive
        ? 'step-active'
        : isCompleted
            ? 'step-completed'
            : 'step-future';

    return (
        <div className={`step-item ${statusClass}`}>
            <div className="step-icon-wrapper">
                {IconComponent} {/* Renderiza o componente de ícone diretamente */}
            </div>
            <p className="step-label">{label}</p>
        </div>
    );
};

export default function NovoEdital()
{
    const { hasGlobalPermission, apiAsyncFetch } = useAppContext();
    const { navigate } = useContext(NavigationContext);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [metaData, setMetaData] = useState({});
    const [formData, setFormData] = useState({
        referencia: '',
        descricao: '',
        publico_alvo: '',
        formato_notas: '',
        tipo_inscricao: '',
        max_itens_inscricao: '',
        max_itens_posse: '',
        remanejamento: '',
        has_categorias: '',
        // tipo_avaliacao_cotas: '',

        inicio_inscricoes: '',
        fim_inscricoes: '',
        inicio_alteracao_dados: '',
        fim_alteracao_dados: '',
        inicio_avaliacao_socioeconomico: '',
        fim_avaliacao_socioeconomico: '',
        inicio_avaliacao_junta_medica: '',
        fim_avaliacao_junta_medica: '',
        inicio_avaliacao_heteroidentificacao: '',
        fim_avaliacao_heteroidentificacao: '',
        inicio_avaliacao_etnica: '',
        fim_avaliacao_etnica: '',
        inicio_avaliacao_identidade_genero: '',
        fim_avaliacao_identidade_genero: '',

        momentosDeRecursos: [],

        resultado_preliminar_inscricao: '',
        resultado_preliminar_geral: '',
        resultado_final: '',
    });

    function confirmSubmit(){
        Swal.fire({
            icon: "question",
            title: "Criação de edital em andamento.",
            text: `Atenção! Você confirma o registro do edital com as respectivas informações repassadas?`,
            // text: "Essa ação não poderá ser reversível!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirma',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                handleOnSubmit();
            }
        });
    }
    async function handleOnSubmit() 
    {
        try {

            const validation = editalCreateSchema.safeParse(formData);
                
            if (!validation.success) {
                const formattedErrors = validation.error.flatten().fieldErrors;
                
                Object.values(formattedErrors).forEach(fieldErrors => {
                    if(fieldErrors) {
                        fieldErrors.forEach(err => toast.error(err));
                    }
                });

                return;
            }

            const response = await apiAsyncFetch({
                url: `/api/admin/editais`,
                method: 'POST',
                body: validation.data,
            });
            
            toast.success(response.message);
            navigate("/admin");
            window.location.reload();
        } 
        catch (error) {
            // toast.error(error);
        }
    }

    const [loading, setLoading] = useState(true);

    const handleOnChangeAttr = (e, attr) => {
        const { value } = e.target;
        setFormData(f => ({...f, [attr]: value}));
    };

    useEffect(() => {
        if (!hasGlobalPermission('cadastrar-edital')) return;
        const fetchMetaDataNewEdital = async () => {
            setLoading(true);
            try {
                const result = await apiAsyncFetch({ url: `/api/admin/editais/create` });

                setMetaData(result.data[0]);
            } finally {
                setLoading(false);
            }
        }
        fetchMetaDataNewEdital();
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [activeTabIndex]);

    const handleNext = (e) => {
        e.preventDefault();
        if (activeTabIndex < tabsData.length - 1) {
            setLoading(true);
            setActiveTabIndex(prevIndex => prevIndex + 1);
        }
        if(activeTabIndex === tabsData.length -1){
            confirmSubmit();
        }
    };

    const handleBack = (e) => {
        e.preventDefault();
        if (activeTabIndex > 0) {
            setLoading(true);
            setActiveTabIndex(prevIndex => prevIndex - 1);
        } else{
            navigate(-1);
        }
    };

    const tabsData = [
        { label: 'Informações Básicas', icon: <CiCircleInfo /> },
        { label: 'Prazos Iniciais', icon: <LucideCalendarCheck /> },
        { label: 'Prazos Finais', icon: <FaRegCalendarCheck /> },
    ];

    return (
    <section id='novoEdital' className={`${!hasGlobalPermission('cadastrar-edital') ? 'flex justify-center items-center': ''}`}>

        <header>
            <h1>Etapas de Criação do Edital</h1>
        </header>
        {
            !hasGlobalPermission('cadastrar-edital') &&
            <AccessDenied/>
        }
         {
        hasGlobalPermission('cadastrar-edital') &&
        <form id="content">
            <nav aria-label="Tabs" className="timeline-nav">
                <Stepper tabsData={tabsData} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex}/>
            </nav>
            {
                (loading && Object.keys(metaData).length > 1 ) && <LoaderPages/>
            }
            {
                activeTabIndex === 0 && <InformacoesBasicas formData={formData} handleOnChangeAttr={handleOnChangeAttr} metaData={metaData}/>
            }
            {
                activeTabIndex === 1 && <PrazosIniciais formData={formData} handleOnChangeAttr={handleOnChangeAttr}/>
            }

            {
                activeTabIndex === 2 && <PrazosFinais formData={formData} handleOnChangeAttr={handleOnChangeAttr} setFormData={setFormData}/>
            }
            
            {/* Botões de Prosseguimento */}
            <div id="buttons-container">
                <button onClick={handleBack} className="voltar_and_cancelar">
                    {
                        activeTabIndex !== 0 ? 'Voltar' : 'Cancelar'
                    }
                </button>
                <button onClick={handleNext} className="prosseguir_and_finalizar">
                    {
                        (tabsData[activeTabIndex + 1] != undefined)
                            ? 
                        `Próximo: ${tabsData[activeTabIndex + 1].label}`
                        :
                        'Finalizar'
                    }
                </button>
            </div>
        </form>    
         }
    </section>
    );
    // } else{
    // return (
    //     <AccessDenied />
    // )
    // }
}