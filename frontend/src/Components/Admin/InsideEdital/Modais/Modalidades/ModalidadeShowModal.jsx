import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput, Checkbox } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Eye, Pencil, Plus } from 'lucide-react';
import React, { useState } from 'react'

const ModalidadeShowModal = () => {
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

                <CabecalhoModal titleModal = {"Visualizar Modalidade"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >
                    {/* Sub-header */}
                    <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <div>
                        <div id='rows-2-input' className='mb-4'>
                            <FormField  label="Sigla">
                                <TextInput readOnly={true} className="md:col-span-1" value="AC" />
                            </FormField>
                            <FormField label="Descrição">
                                <TextInput readOnly={true} className="md:col-span-2" value="Ampla Concorrência" />
                            </FormField>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-600 mb-3">Tipo de Avaliação</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5">
                                <Checkbox readOnly={true} checked={true} label="Socioeconômica" />
                                <Checkbox readOnly={true} checked={true} label="Heteroidentificação" />
                                <Checkbox readOnly={true} label="Junta Médica" />
                                <Checkbox readOnly={true} label="Étnica" />
                                <Checkbox readOnly={true} label="Identidade de Gênero" />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div id="buttons-container">
                        <button
                            onClick={onCloseModal}
                            id='modal-purple-button'
                        >
                            Fechar
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ModalidadeShowModal