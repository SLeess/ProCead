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
                    <p id='subtitle-edital'>
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
                    <div id="buttons-container">
                        <button
                            onClick={onCloseModal}
                            id='cancel-button'
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onCloseModal}
                            id='save-button'
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