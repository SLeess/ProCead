"use client";

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, } from "flowbite-react";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/Global/ui/modals";

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
                <ModalHeader />
                <ModalBody >
                    {/* <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
                        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8"> */}

                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Editar Quadro de Vagas</h1>
                    </div>

                    {/* Sub-header */}
                    <p className="text-sm text-gray-500 mb-6">
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>

                    {/* Tabs Navigation */}
                    <div className="border-b border-gray-200 mb-8">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
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
                            <div className="mt-10 flex justify-end items-center space-x-4">
                                <button onClick={onCloseModal} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Fechar</button>
                                <button onClick={handleNext} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Próximo: Distribuição de Vagas</button>
                            </div>
                        </div>
                    )}
                    {/* Tab Content: Distribuição de Vagas */}
                    {activeTab === 'Distribuição de Vagas' && (
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-6">
                                <FormField label="AC"><TextInput value="80" /></FormField>
                                <FormField label="NP"><TextInput value="32" /></FormField>
                                <FormField label="I"><TextInput value="6" /></FormField>
                                <FormField label="Q"><TextInput value="4" /></FormField>
                                <FormField label="PCD"><TextInput value="6" /></FormField>
                                <FormField label="TRANS"><TextInput value="2" /></FormField>
                            </div>
                            <div className="mt-10 flex justify-end items-center space-x-4">
                                <button onClick={handleBack} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Voltar</button>
                                <button onClick={handleNext} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Próximo: Categorias Customizadas</button>
                            </div>
                        </div>
                    )}
                    {/* Tab Content: Categorias Customizadas */}
                    {activeTab === 'Categorias Customizadas' && (
                        <div className="border border-gray-200 rounded-md overflow-hidden">
                            {/* Table Header */}
                            <div className="flex bg-gray-50 px-6 py-3">
                                <div className="w-16 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</div>
                                <div className="flex-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome da Categoria</div>
                            </div>
                            {/* Table Body */}
                            <div className="bg-white">
                                {categoriesData.map((category, index) => (
                                    <div key={category.id} className={`flex px-6 py-4 ${index !== categoriesData.length - 1 ? 'border-b border-gray-200' : ''}`}>
                                        <div className="w-16 text-sm text-gray-900">{category.id}</div>
                                        <div className="flex-1 text-sm text-gray-900">{category.name}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 flex justify-end items-center space-x-4">
                                <button onClick={handleBack} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Voltar</button>
                                <button onClick={onCloseModal} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Fechar</button>
                            </div>
                        </div>
                    )}

                    


                </ModalBody>
            </Modal>
        </>
    );
}
