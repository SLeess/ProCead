import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput, Checkbox, SelectInput, MultiSelectTags } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Eye, Plus } from 'lucide-react';
import React, { useState } from 'react'

const UserShowModal = () => {
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

                <CabecalhoModal titleModal = {"Visualizar Usuário"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >

                    {/* Sub-header */}
                    <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 mb-2">
                            <FormField label="Nome Completo">
                                <TextInput readOnly={true} className="md:col-span-1" value="João da Silva" />
                            </FormField>
                            <FormField label="E-mail">
                                <TextInput readOnly={true} className="md:col-span-2" value="joão.silva@edu.unimontes.br" />
                            </FormField>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 mb-2">
                            <FormField label="Perfil">
                                <SelectInput value="Perfil" readOnly={true} options={['admin', 'super-admin', 'candidato']} />
                            </FormField>
                            <FormField label="Tipo">
                                <TextInput readOnly={true} className="md:col-span-2" value="Administrador" />
                            </FormField>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 mb-2">
                            <FormField label="Editais" className="md:col-span-2">
                                <MultiSelectTags />
                            </FormField>

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

export default UserShowModal