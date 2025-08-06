import { FormField, TextInput, Checkbox, SelectInput } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'

const AdminCreateModal = () => {
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }
    return (
        <>
            <button onClick={() => setOpenModal(true)} className="px-4 py-2.5 text-sm cursor-pointer font-semibold text-white bg-[var(--button)] rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="inline" />
                <span className='ml-1'>Cadastrar Administrador</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                <ModalHeader />
                <ModalBody >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Cadastrar Administrador</h1>

                    </div>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                            <FormField label="Nome Completo">
                                <TextInput className="md:col-span-1" placeholder="João da Silva" />
                            </FormField>
                            <FormField label="E-mail">
                                <TextInput className="md:col-span-2" placeholder="joao.silva@edu.unimontes.br" />
                            </FormField>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                            <FormField label="Perfil">
                                <SelectInput value="Perfil"  options={['admin', 'super-admin', 'candidato']} />
                            </FormField>
                            <FormField label="Tipo">
                                <TextInput className="md:col-span-2" readOnly={true} value="Administrador" />
                            </FormField>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                            <FormField label="Perfil">
                                <SelectInput value="Editais" options={['08/2025', '07/2025', '04/2024']} />
                            </FormField>
                           
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

export default AdminCreateModal