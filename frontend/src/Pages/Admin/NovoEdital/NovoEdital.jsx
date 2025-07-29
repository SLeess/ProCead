import { LucideCalendarCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import './NovoEdital.css';
import { CiCircleInfo } from "react-icons/ci";
import { FaRegCalendarCheck } from "react-icons/fa";
import Stepper from "@/Components/Global/Stepper/Stepper";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";
import PrazosIniciais from "./Tabs/PrazosIniciais";
import InformacoesBasicas from "./Tabs/InformacoesBasicas";
import PrazosFinais from "./Tabs/PrazosFinais";

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
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [formData, setFormData] = useState({
        edital: '',
        nome_edital: '',
        publico_alvo: '',
        formato_notas: '',
        tipo_inscricao: '',
        max_itens_inscricao: '',
        max_itens_posse: '',
        remanejamento: '',
        has_categorias: '',
        tipo_avaliacao_cotas: '',

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
    },[]);
    const [loading, setLoading] = useState(true);

    const handleOnChangeAttr = (e, attr) => {
        const { value } = e.target;

        setFormData(f => ({...f, [attr]: value}));

        console.log(formData);
    };

    useEffect(() => 
        setLoading(false)
    , [activeTabIndex]);

    const handleNext = () => {
        if (activeTabIndex < tabsData.length - 1) {
            setLoading(true);
            setActiveTabIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleBack = () => {
        if (activeTabIndex > 0) {
            setLoading(true);
            setActiveTabIndex(prevIndex => prevIndex - 1);
        }
    };

    const tabsData = [
        { label: 'Informações Básicas', icon: <CiCircleInfo /> },
        { label: 'Prazos Iniciais', icon: <LucideCalendarCheck /> },
        { label: 'Prazos Finais', icon: <FaRegCalendarCheck /> },
    ];

    return (
    <section id='novoEdital'>

        <header>
            <h1>Etapas de Criação do Edital</h1>
        </header>

        <div id="content">
            <nav aria-label="Tabs" className="timeline-nav">
                <Stepper tabsData={tabsData} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex}/>
            </nav>
            {
                loading && <LoaderPages/>
            }
            {
                activeTabIndex === 0 && <InformacoesBasicas formData={formData} handleOnChangeAttr={handleOnChangeAttr}/>
            }
            {
                activeTabIndex === 1 && <PrazosIniciais formData={formData} handleOnChangeAttr={handleOnChangeAttr}/>
            }

            {
                activeTabIndex === 2 && <PrazosFinais formData={formData} handleOnChangeAttr={handleOnChangeAttr}/>
            }
            
            {/* Botões de Prosseguimento */}
            <div className="mt-10 flex justify-end items-center space-x-4">
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
        </div>    
    </section>
    );
}