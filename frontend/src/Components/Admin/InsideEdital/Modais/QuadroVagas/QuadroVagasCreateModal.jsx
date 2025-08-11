

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, } from "flowbite-react";
import { Eye, Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import CategoriaCreateModal from "./CategoriaCreateModal";

export default function QuadroVagasCreateModal() {
    const [openModal, setOpenModal] = useState(false);
    const [activeTab, setActiveTab] = useState('Dados');
    const tabs = ['Dados', 'Distribuição de Vagas', 'Categorias Customizadas'];

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
            <button onClick={() => setOpenModal(true)} className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)] focus:outline-none cursor-pointer">
                <Plus className="inline" />
                <span className='ml-1'>Novo Quadro de Vagas</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Criar Quadro de Vagas"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >
                    {/* <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
                        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8"> */}


                    {/* Sub-header */}
                    <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>

                    {/* Tabs Navigation */}
                    <div className="border-b border-gray-200 mb-4">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab
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
                                <FormField label="Código"><TextInput /></FormField>
                                <FormField label="Semestre"><TextInput /></FormField>
                                <FormField label="Edital Referente"><TextInput /></FormField>

                                {/* Row 2 */}
                                <FormField label="Campus" className="md:col-span-1"><TextInput /></FormField>
                                <FormField label="Vaga" className="md:col-span-2"><TextInput /></FormField>

                                {/* Row 3 */}
                                <FormField label="Habilitação" className="md:col-span-3"><TextInput /></FormField>
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
                            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-x-3 gap-y-2">
                                <FormField label="AC"><TextInput /></FormField>
                                <FormField label="NP"><TextInput /></FormField>
                                <FormField label="I"><TextInput /></FormField>
                                <FormField label="Q"><TextInput /></FormField>
                                <FormField label="PCD"><TextInput /></FormField>
                                <FormField label="TRANS"><TextInput /></FormField>
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
                            <div className="border border-gray-200 rounded-md overflow-hidden">
                                {/* Table Header */}
                                <div className="flex bg-blue-50 px-6 py-3">
                                    <div className="w-16 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</div>
                                    <div className="flex-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome da Categoria</div>
                                </div>
                                {/* Table Body */}
                                <div className="bg-white">
                                        <div className="flex h-12 justify-center items-center border border-dashed border-green-400">
                                            <CategoriaCreateModal />
                                        </div>
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
