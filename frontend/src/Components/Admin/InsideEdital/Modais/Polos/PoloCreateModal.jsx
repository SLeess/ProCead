import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Pencil, Plus } from 'lucide-react';
import React, { useState } from 'react'
import ".././Modais.css"

const PoloCreateModal = () => {
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }
    return (
        <>
            <button onClick={() => setOpenModal(true)} className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)] focus:outline-none cursor-pointer">
                <Plus className="inline" />
                <span className='ml-1'>Cadastrar Polo</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Criar Polo"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >
                    {/* Sub-header */}
                    <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <div>
                        <div id='rows-3-input'>
                            {/* Row 1 */}
                            <FormField className="md:col-span-2" label="Nome do Polo"><TextInput /></FormField>
                            <FormField label="Edital Referente"><TextInput value="Edital Nº 08/2025" /></FormField>
                        </div>
                        <div id="buttons-container">
                            <button onClick={onCloseModal} id='cancel-button'>Fechar</button>
                            <button onClick={onCloseModal} id='save-button'>Salvar</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default PoloCreateModal