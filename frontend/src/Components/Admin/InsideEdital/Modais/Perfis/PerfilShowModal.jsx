import { FormField, TextInput } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Eye } from 'lucide-react';
import React, { useState } from 'react'

const PerfilShowModal = () => {
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
                <ModalHeader />
                <ModalBody >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Visualizar Pefil</h1>
                        
                    </div>

                    {/* Sub-header */}
                    <p className="text-sm text-gray-500 mb-6">
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                            <FormField label="Nome do Perfil">
                                <TextInput readOnly={true} className="md:col-span-1" value="controle-acadêmico" />
                            </FormField>
                            <FormField label="Tipo">
                                <TextInput readOnly={true} className="md:col-span-2" value="Administrador" />
                            </FormField>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-10 flex justify-end items-center space-x-4">
                        
                        <button
                            onClick={onCloseModal}
                            className="cursor-pointer px-8 py-2.5 text-sm font-semibold text-white bg-[var(--button)] rounded-md hover:bg-[var(--button-hover)]"
                        >
                            Fechar
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default PerfilShowModal