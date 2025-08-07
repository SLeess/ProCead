"use client";

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, } from "flowbite-react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";

export default function RecursoShowModal() {
    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

    return (
        <>
            <button onClick={() => setOpenModal(true)} className="p-1 hover:bg-gray-200 rounded-full">
                <Eye className="h-5 w-5 text-blue-500" />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Visualizar Recurso"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >

                    <div className="flex justify-between items-center mb-2 mt-1">
                        <p className="text-sm text-gray-500">Data do Recurso: 04/07/2025</p>
                        <span className="ml-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Em análise</span>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Situação</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <FormField label="Tipo de recurso" className="col-span-1">
                                <SelectInput readOnly={true} value="Interposição de Classificação" options={['Interposição de Classificação', 'Recurso de Prova', 'Recurso de Cota']} />
                            </FormField>
                            <FormField label="Status" className="col-span-1">
                                <SelectInput readOnly={true} value="Em Análise" options={['Deferido', 'Indeferido', 'Em Análise']} />
                            </FormField>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-2">
                            <FormField label="Motivo" className="md:col-span-3">
                                <textarea
                                    readOnly
                                    rows="6"
                                    className="bg-gray-100 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    value="Informamos que a inscrição de Vossa Senhoria no presente processo seletivo foi indeferida em razão do não atendimento aos requisitos formais estabelecidos no edital, especificamente pela ausência da documentação comprobatória exigida para a função pretendida, inviabilizando a devida análise e homologação da candidatura."
                                />
                            </FormField>
                            <FormField label="Resposta" className="md:col-span-3">
                                <textarea
                                    readOnly
                                    rows="6"
                                    className="bg-gray-100 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    value="Ex: Em resposta ao recurso apresentado, referente ao Edital nº 04/2025, a Comissão de Avaliação do Processo Seletivo esclarece que as exigências do subitem 1.3.6 e alíneas correspondentes foram estabelecidas como critérios objetivos e pré-requisitos para participação no certame."
                                />
                            </FormField>

                        </div>

                        <div className="mt-6 flex justify-end items-center space-x-4">
                            {/* <button onClick={handleBack} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Voltar</button> */}
                            <button onClickCapture={onCloseModal} className="cursor-pointer px-8 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)]">Fechar</button>
                        </div>
                    </div>

                </ModalBody>
            </Modal>
        </>
    );
}
