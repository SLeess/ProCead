"use client";

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/Global/ui/modals";

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
                <ModalHeader />
                <ModalBody >
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Deferir e/ou Indeferir na Reserva de Vagas</h1>
                            <div className="flex items-center mt-2">
                                <p className="text-sm text-gray-500">Data de Inscrição: 04/07/2025</p>
                                <span className="ml-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Em análise</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Documentos Comprobatórios da Reserva de Vagas</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            <AnexoButton label="Documento 1:" />
                            <AnexoButton label="Documento 2:" />
                            <AnexoButton label="Vídeo:" />
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Situação</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                            <FormField label="Status" className="md:col-span-1">
                                <SelectInput value="Em Análise" options={['Deferido', 'Indeferido', 'Em Análise']} />
                            </FormField>
                            <FormField label="Observações" className="md:col-span-3">
                                <textarea
                                    rows="4"
                                    className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    defaultValue="Informamos que a inscrição de Vossa Senhoria no presente processo seletivo foi indeferida em razão do não atendimento aos requisitos formais estabelecidos no edital, especificamente pela ausência da documentação comprobatória exigida para a função pretendida, inviabilizando a devida análise e homologação da candidatura."
                                />
                            </FormField>
                        </div>

                        <div className="mt-10 flex justify-end items-center space-x-4">
                            <button onClick={onCloseModal} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Voltar</button>
                            <button onClickCapture={onCloseModal} className="px-8 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">Salvar</button>
                        </div>
                    </div>

                </ModalBody>
            </Modal>
        </>
    );
}
