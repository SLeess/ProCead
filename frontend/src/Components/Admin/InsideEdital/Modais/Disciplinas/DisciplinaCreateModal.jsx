import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Pencil, Plus } from 'lucide-react';
import React, { useState } from 'react'

const DisciplinaCreateModal = () => {
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }
    return (
        <>
            <button onClick={() => setOpenModal(true)} className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)] focus:outline-none cursor-pointer">
                <Plus className="inline" />
                <span className='ml-1'>Cadastrar Disciplina</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Cadastrar Disciplina"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >
                    {/* Sub-header */}
                    <p className="text-gray-500 text-xs/5 font-bold mb-4">
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-2">
                            {/* Row 1 */}
                            <FormField className="md:col-span-2" label="Nome do Curso"><TextInput value="Especialização Lato Sensu em Eduçação Especial" /></FormField>
                            <FormField label="Edital Referente"><TextInput value="Edital Nº 08/2025" /></FormField>
                            <FormField className="md:col-span-2" label="Nome da Disciplina"><TextInput value="Zoologia de Invertebrados" /></FormField>
                            <FormField className="md:col-span-1" label="Carga Horária"><TextInput value="60 horas" /></FormField>
                        </div>
                        <div className="mt-6 flex justify-end items-center space-x-4">
                            <button onClick={onCloseModal} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Fechar</button>
                            <button onClick={onCloseModal} className="cursor-pointer px-6 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)]">Salvar</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default DisciplinaCreateModal