import { FormField, TextInput, Checkbox } from '@/Components/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { List, Pencil, Plus } from 'lucide-react';
import React, { useState } from 'react'

const PefilAlterarPermissoesModal = () => {
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }
    return (
        <>
            <button onClick={() => setOpenModal(true)} className="p-1 hover:bg-gray-200 rounded-full">
                <List className="h-5 w-5 text-green-500" />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                <ModalHeader />
                <ModalBody >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Alterar Permissões do Perfil</h1>

                    </div>

                    {/* Sub-header */}
                    <p className="text-sm text-gray-500 mb-6">
                        Nome do Perfil: controle-academico
                    </p>
                    <div>

                        <div>
                            {/* <h3 className="text-sm font-medium text-gray-600 mb-3">Tipo de Avaliação</h3> */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5">
                                <Checkbox checked={true} label="Avaliar cotas da modalidade heteroidentificação" />
                                <Checkbox checked={true} label="Avaliar cotas da modalidade heteroidentificação" />
                                <Checkbox label="Avaliar cotas da modalidade heteroidentificação" />
                                <Checkbox label="Avaliar cotas da modalidade heteroidentificação" />
                                <Checkbox label="Avaliar cotas da modalidade heteroidentificação" />
                                <Checkbox checked={true} label="Cadastrar Perfis" />
                                <Checkbox checked={true} label="Cadastrar Perfis" />
                                <Checkbox label="Cadastrar Perfis" />
                                <Checkbox label="Cadastrar Perfis" />
                                <Checkbox label="Cadastrar Perfis" />
                                <Checkbox checked={true} label="Deletar Administradores" />
                                <Checkbox checked={true} label="Deletar Administradores" />
                                <Checkbox label="Deletar Administradores" />
                                <Checkbox label="Deletar Administradores" />
                                <Checkbox label="Deletar Administradores" />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-10 flex justify-end items-center space-x-4">
                        <button
                            onClick={onCloseModal}
                            className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onCloseModal}
                            className="px-8 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Salvar
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default PefilAlterarPermissoesModal