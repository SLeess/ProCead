import { FormField, TextInput } from '@/Components/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Pencil, Plus } from 'lucide-react';
import React, { useState } from 'react'

const CursoCreateModal = () => {
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }
    return (
        <>
            <button onClick={() => setOpenModal(true)} className="px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="inline" />
                <span className='ml-1'>Cadastrar Curso</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                <ModalHeader />
                <ModalBody >

                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Editar Curso</h1>
                    </div>

                    {/* Sub-header */}
                    <p className="text-sm text-gray-500 mb-6">
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                            {/* Row 1 */}
                            <FormField className="md:col-span-2" label="Nome do Curso"><TextInput /></FormField>
                            <FormField label="Edital Referente"><TextInput value="Edital Nº 08/2025" /></FormField>
                        </div>
                        <div className="mt-10 flex justify-end items-center space-x-4">
                            <button onClick={onCloseModal} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Fechar</button>
                            <button onClick={onCloseModal} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Salvar</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default CursoCreateModal