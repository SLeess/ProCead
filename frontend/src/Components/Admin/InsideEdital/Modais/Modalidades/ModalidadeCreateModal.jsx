import { FormField, TextInput, Checkbox } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Pencil, Plus } from 'lucide-react';
import React, { useState } from 'react'

const ModalidadeCreateModal = () => {
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }
    return (
        <>
            <button onClick={() => setOpenModal(true)} className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--button)] rounded-md hover:bg-[var(--button-hover)] focus:outline-none cursor-pointer">
                <Plus className="inline" />
                <span className='ml-1'>Cadastrar Modalidade</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                <ModalHeader />
                <ModalBody >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Cadastrar Modalidade</h1>
                        
                    </div>

                    {/* Sub-header */}
                    <p className="text-sm text-gray-500 mb-6">
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                            <FormField label="Sigla">
                                <TextInput className="md:col-span-1" placeholder="Ex: AC" />
                            </FormField>
                            <FormField label="Descrição">
                                <TextInput className="md:col-span-2" placeholder="Ex: Ampla Concorrência" />
                            </FormField>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-600 mb-3">Tipo de Avaliação</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5">
                                <Checkbox label="Socioeconômica" />
                                <Checkbox label="Heteroidentificação" />
                                <Checkbox label="Junta Médica" />
                                <Checkbox label="Étnica" />
                                <Checkbox label="Identidade de Gênero" />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-10 flex justify-end items-center space-x-4">
                        <button
                            onClick={onCloseModal}
                            className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onCloseModal}
                            className="cursor-pointer px-8 py-2.5 text-sm font-semibold text-white bg-[var(--button)] rounded-md hover:bg-[var(--button-hover)]"
                        >
                            Salvar
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ModalidadeCreateModal