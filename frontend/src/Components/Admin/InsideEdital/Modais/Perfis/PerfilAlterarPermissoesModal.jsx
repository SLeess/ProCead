import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput, Checkbox } from '@/Components/Global/ui/modals';
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

                <CabecalhoModal titleModal = {"Gerenciar Permissões do Perfil"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >

                    {/* Sub-header */}
                    <p className="text-gray-500 text-xs/5 font-semibold mb-4">
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
                    <div className="mt-6 flex justify-end items-center space-x-4">
                        <button
                            onClick={onCloseModal}
                            className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onCloseModal}
                            className="cursor-pointer px-8 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)]"
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