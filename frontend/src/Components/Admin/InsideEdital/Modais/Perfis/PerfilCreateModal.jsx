import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput, Checkbox, SelectInput } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'

const PerfilCreateModal = ({enableGlobal = true}) => {
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }
    return (
        <>
            <button onClick={() => setOpenModal(true)} className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)] focus:outline-none cursor-pointer">
                <Plus className="inline" />
                <span className='ml-1'>Cadastrar Perfil</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Criar Perfil"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >

                    {/* Sub-header */}
                    {
                        !enableGlobal &&
                        <p className="text-gray-500 text-xs/5 font-semibold mb-4">
                            Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                        </p>
                    }
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                            <FormField label="Nome do Perfil">
                                <TextInput className="md:col-span-1" placeholder="Ex: controle-acadêmico" />
                            </FormField>
                            <FormField label="Tipo">
                                <SelectInput className="md:col-span-2" value="Local" options={ (enableGlobal == true ) ? ['Global', 'Local'] : ['Local']} />
                                {/* <TextInput className="md:col-span-2" placeholder="Administrador" /> */}
                            </FormField>
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

export default PerfilCreateModal