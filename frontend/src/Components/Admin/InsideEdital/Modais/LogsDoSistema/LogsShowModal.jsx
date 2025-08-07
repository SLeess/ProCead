"use client";

import { Modal, ModalBody, ModalHeader, } from "flowbite-react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput, DetailRow, AlterationRow } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";

export default function LogsShowModal() {

    const [openModal, setOpenModal] = useState(false);
    const [activeTab, setActiveTab] = useState('Dados');
    const tabs = ['Dados', 'Alterações'];

    const logData = [
        { field: 'ID', value: '20000' },
        { field: 'Descrição', value: 'Criação' },
        { field: 'ID do objeto', value: '2000' },
        { field: 'Tipo do objeto', value: 'Inscrição' },
        { field: 'ID do responsável', value: '160' },
        { field: 'Tipo do usuário', value: 'Candidato' },
        { field: 'Nome do responsável', value: 'JESSICA ELOIZA RODRIGUES' },
        { field: 'Data do registro', value: '22/07/2025 14:36:40' },
    ];

    // Data for the "Alterações" tab
    const alterationsData = [
        { attribute: 'identidade', oldValue: 'MG-16.971.110', newValue: 'MG-16.971.110' },
        { attribute: 'cpf', oldValue: '000.000.000-00', newValue: '000.000.000-00' },
        { attribute: 'nome', oldValue: 'JESSICA ELOIZA RODRIGUES', newValue: 'JESSICA ELOIZA RODRIGUES' },
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
                <Eye className="h-5 w-5 text-blue-500" />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Ver Registro de Logs"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >
                    {/* <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
                        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8"> */}

                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div>
                                <p className="text-gray-500 text-xs/5 font-bold">Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025</p>
                            </div>
                        </div>
                    </div>

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
                    {/* Tab Content */}
                    {activeTab === 'Dados' && (
                        <div>
                            <div className="border border-gray-200 rounded-md overflow-hidden">
                                <DetailRow field="Campo" value="Valor" isHeader={true} />
                                <div className="bg-white">
                                    {logData.map((item, index) => (
                                        <div key={index} className={`${index !== logData.length - 1 ? 'border-b border-gray-200' : ''}`}>
                                            <DetailRow field={item.field} value={item.value} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="mt-6 flex justify-end items-center space-x-4">
                                <button onClick={onCloseModal} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                    Cancelar
                                </button>
                                <button onClick={handleNext} className="cursor-pointer px-6 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)]">
                                    Próximo: Alterações
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Alterações' && (
                        <div>
                            <div className="border border-gray-200 rounded-md overflow-hidden">
                                <AlterationRow attribute="Atributo" oldValue="Valor Antigo" newValue="Valor Novo" isHeader={true} />
                                <div className="bg-white">
                                    {alterationsData.map((item, index) => (
                                        <div key={index} className={`${index !== alterationsData.length - 1 ? 'border-b border-gray-200' : ''}`}>
                                            <AlterationRow attribute={item.attribute} oldValue={item.oldValue} newValue={item.newValue} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end items-center space-x-4">
                                <button onClick={handleBack} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Voltar</button>
                                <button onClickCapture={onCloseModal} className="cursor-pointer px-8 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)]">Fechar</button>
                            </div>
                        </div>
                    )}

                   

                </ModalBody>
            </Modal>
        </>
    );
}
