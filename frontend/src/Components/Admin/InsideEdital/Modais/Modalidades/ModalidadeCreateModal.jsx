import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
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
            <button onClick={() => setOpenModal(true)} className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)] focus:outline-none cursor-pointer">
                <Plus className="inline" />
                <span className='ml-1'>Cadastrar Modalidade</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Criar Modalidade"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >
                    {/* Sub-header */}
                    <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <div>
                        <div id='rows-2-input' className='mb-4'>
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
                    <div id="buttons-container">
                        <button
                            onClick={onCloseModal}
                            id='modal-white-button'
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onCloseModal}
                            id='modal-purple-button'
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