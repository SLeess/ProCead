import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import Stepper from '@/Components/Global/Stepper/Stepper';
import { CheckCheck, ListCheck, ListCollapse, MapPinHouse } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { CiCircleInfo } from 'react-icons/ci';
import InformacoesBasicas from './Tabs/InformacoesBasicas';
import Endereco from './Tabs/Endereco';
import EscolhaDaVaga from './Tabs/EscolhaDaVaga';
import DetalhesDaVaga from './Tabs/DetalhesDaVaga';
import Confirmacao from './Tabs/Confirmacao';

const Inscrever = () => {
    const [loading, setLoading] = useState(true);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    useEffect(() =>
        setLoading(false)
    , [activeTabIndex]);

    const tabsData = [
        { label: 'Informações Básicas', icon: <CiCircleInfo /> },
        { label: 'Endereço', icon: <MapPinHouse /> },
        { label: 'Escolha da Vaga', icon: <ListCheck /> },
        { label: 'Detalhes da Vaga', icon: <ListCollapse /> },
        { label: 'Confirmação', icon: <CheckCheck /> },
    ];

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

    const [formData, setFormData] = useState({
        nome_completo: '',
        cpf: '',
        email: '',
        data_nascimento: '',
        telefone: '',
        genero: '',
        nome_social: '',
        identidade_genero: '',
        rg: '',
        estado_civil: '',
        uf_nascimento: '',
        nacionalidade: '',
        naturalidade: '',
        cep: '',
        rua: '',
        bairro: '',
        numero: '',
        complemento: '',
        cidade: '',
        uf: '',
        vagas: [
            {
                vaga: '',
                polo: '',
                modalidade: '',
                categoria: ''
            },
        ],
});

    const handleOnChangeAttr = (e, attr) => {
        const { value } = e.target;
        setFormData(f => ({...f, [attr]: value}));
    };

    return (
        <div  id='inscricao'>
                <nav aria-label="Tabs" className="timeline-nav">
                    <Stepper tabsData={tabsData} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
                </nav>
            <form  id="content" onSubmit={(e) => e.preventDefault()}>
                {
                    loading && <LoaderPages />
                }
                {
                    activeTabIndex === 0 && <InformacoesBasicas formData={formData} handleOnChangeAttr={handleOnChangeAttr} handleNext={handleNext} />
                }
                {
                    activeTabIndex === 1 && <Endereco formData={formData} handleOnChangeAttr={handleOnChangeAttr} handleNext={handleNext} handleBack={handleBack}/>
                }
                {
                    activeTabIndex === 2 && <EscolhaDaVaga formData={formData} setFormData={setFormData} handleNext={handleNext} handleBack={handleBack}/>
                }
                {
                    activeTabIndex === 3 && <DetalhesDaVaga formData={formData} handleOnChangeAttr={handleOnChangeAttr} handleNext={handleNext} handleBack={handleBack}/>
                }
                {
                    activeTabIndex === 4 && <Confirmacao formData={formData} handleOnChangeAttr={handleOnChangeAttr} handleNext={handleNext} handleBack={handleBack}/>
                }
        </form>
        </div>
    )
}

export default Inscrever