

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, } from "flowbite-react";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import "./QuadroVagasModal.css";

export default function QuadroVagasEditModal() {
    const [openModal, setOpenModal] = useState(false);
    const [activeTab, setActiveTab] = useState('Dados');
    const tabs = ['Dados', 'Distribuição de Vagas', 'Categorias Customizadas'];
    const categoriesData = [
    { id: 1, name: 'Comunidade Geral (Vagas Remanecentes)' },
    { id: 2, name: 'Comunidade Geral (Vagas Remanecentes)' },
    { id: 3, name: 'Comunidade Geral (Vagas Remanecentes)' },
];

    const handleNext = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
        }
    };

    const handleBack = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1]);
        }
    };


    function onCloseModal() {
        setOpenModal(false);
    }

    return (
        <>
            <button onClick={() => setOpenModal(true)} className="p-1 hover:bg-gray-200 rounded-full">
                <Pencil className="h-5 w-5 text-yellow-500" />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Editar Quadro de Vagas"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >
                    {/* <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
                        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8"> */}


                    {/* Sub-header */}
                    <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>

                    {/* Tabs Navigation */}
                    <div id='tabs-container'>
                        <nav id='tabs-navs' aria-label="Tabs">
                            {tabs.map(tab => (
                                <button
                                    id="tabs-nav-button"
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={` ${activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Form Content - Only showing the active tab's content */}
                    {activeTab === 'Dados' && (
                        <div>
                            <div id='rows-3-input'>
                                {/* Row 1 */}
                                <FormField label="Código"><TextInput value="1" /></FormField>
                                <FormField label="Semestre"><TextInput value="2" /></FormField>
                                <FormField label="Edital Referente"><TextInput value="Edital Nº 08/2025" /></FormField>

                                {/* Row 2 */}
                                <FormField label="Campus" className="md:col-span-1"><TextInput value="Campus Montes Claros" /></FormField>
                                <FormField label="Vaga" className="md:col-span-2"><TextInput value="Lato Sensu em Alfabetização e Multi..." /></FormField>

                                {/* Row 3 */}
                                <FormField label="Habilitação" className="md:col-span-3"><TextInput value="Pós Graduação" /></FormField>
                            </div>
                            <div id="buttons-container">
                                <button onClick={onCloseModal} id='modal-white-button'>Fechar</button>
                                <button onClick={handleNext} id='modal-purple-button'>Próximo: Distribuição de Vagas</button>
                            </div>
                        </div>
                    )}
                    {/* Tab Content: Distribuição de Vagas */}
                    {activeTab === 'Distribuição de Vagas' && (
                        <div>
                            <div id="distribuicao-vagas-options">
                                <FormField label="AC"><TextInput value="80" /></FormField>
                                <FormField label="NP"><TextInput value="32" /></FormField>
                                <FormField label="I"><TextInput value="6" /></FormField>
                                <FormField label="Q"><TextInput value="4" /></FormField>
                                <FormField label="PCD"><TextInput value="6" /></FormField>
                                <FormField label="TRANS"><TextInput value="2" /></FormField>
                            </div>
                            <div id="buttons-container">
                                <button onClick={handleBack} id='modal-white-button'>Voltar</button>
                                <button onClick={handleNext} id='modal-purple-button'>Próximo: Categorias Customizadas</button>
                            </div>
                        </div>
                    )}
                    {/* Tab Content: Categorias Customizadas */}
                    {activeTab === 'Categorias Customizadas' && (
                        <div>
                            <div id="categorias-customizadas-table">
                                {/* Table Header */}
                                <div id="categorias-customizadas-header">
                                    <div id="categorias-customizadas-header-text" className="w-16">#</div>
                                    <div id="categorias-customizadas-header-text" className="flex-1">Nome da Categoria</div>
                                </div>
                                {/* Table Body */}
                                <div className="bg-white">
                                    {categoriesData.map((category, index) => (
                                        <div key={category.id} className={`flex px-6 py-4 ${index !== categoriesData.length - 1 ? 'border-b border-gray-200' : ''}`}>
                                            <div id="categorias-customizadas-body-text" className="w-16">{category.id}</div>
                                            <div id="categorias-customizadas-body-text" className="flex-1">{category.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div id="buttons-container">
                                <button onClick={handleBack} id='modal-white-button'>Voltar</button>
                                <button onClick={onCloseModal} id='modal-purple-button'>Salvar</button>
                            </div>
                        </div>
                    )}

                    


                </ModalBody>
            </Modal>
        </>
    );
}
