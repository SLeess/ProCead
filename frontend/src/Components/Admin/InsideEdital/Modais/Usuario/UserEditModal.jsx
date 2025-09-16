import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput, Checkbox, SelectInput, MultiSelectTags } from '@/Components/Global/ui/modals';
import { formatCPF } from '@/Utils/formatters';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Eye, Pencil, Plus } from 'lucide-react';
import React, { useState } from 'react'

const UserEditModal = ({
    user = {}
}) => {
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }
    return (
        <>
            <button onClick={() => setOpenModal(true)} id="acoes-icons">
                <Pencil id='edit-btn' />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Editar Usuário"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >

                    {/* Sub-header */}
                    {/* <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p> */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 mb-2">
                            <FormField label="Nome Completo">
                                <TextInput className="md:col-span-1" value={user.nome || ""} />
                            </FormField>
                            <FormField label="CPF">
                                <TextInput className="md:col-span-2" value={formatCPF(user.cpf || "")} />
                            </FormField>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 mb-2">
                            <FormField label="Nível de Acesso">
                                <TextInput className="md:col-span-2" value={user.level_access || ""} />
                            </FormField>
                            <FormField label="E-mail">
                                <TextInput className="md:col-span-2" value={user.email || ""} />
                            </FormField>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 mb-2">
                            <FormField label="Senha">
                                <TextInput className="md:col-span-2" value={""} />
                            </FormField>
                            <FormField label="Confirmar Senha">
                                <TextInput className="md:col-span-2" value={""} />
                            </FormField>
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

export default UserEditModal