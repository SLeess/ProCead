"use client";

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";

export default function CotaEditModal() {
    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

    return (
        <>
            <button onClick={() => setOpenModal(true)} className="p-1 hover:bg-gray-200 rounded-full">
                <Pencil className="h-5 w-5 text-yellow-500" />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Editar Situação na Reserva de Vagas"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >

                    <div id="subtitle-inscricao">
                        <p id="date-inscricao">Data de Inscrição: 04/07/2025</p>
                        <span id="status-inscricao">Em análise</span>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Documentos Comprobatórios da Reserva de Vagas</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            <AnexoButton label="Documento 1:" />
                            <AnexoButton label="Documento 2:" />
                            <AnexoButton label="Vídeo:" />
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Situação</h2>
                        <div id='rows-3-input'>
                            <FormField label="Status" className="md:col-span-1">
                                <SelectInput value="Em Análise" options={['Deferido', 'Indeferido', 'Em Análise']} />
                            </FormField>
                            <FormField label="Observações" className="md:col-span-3">
                                <textarea
                                    rows="4"
                                    className="bg-gray-100 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    defaultValue="Informamos que a inscrição de Vossa Senhoria no presente processo seletivo foi indeferida em razão do não atendimento aos requisitos formais estabelecidos no edital, especificamente pela ausência da documentação comprobatória exigida para a função pretendida, inviabilizando a devida análise e homologação da candidatura."
                                />
                            </FormField>
                        </div>

                        <div id="buttons-container">
                            <button onClick={onCloseModal} id='modal-white-button'>Cancelar</button>
                            <button onClickCapture={onCloseModal} id='modal-purple-button'>Salvar</button>
                        </div>
                    </div>

                </ModalBody>
            </Modal>
        </>
    );
}
