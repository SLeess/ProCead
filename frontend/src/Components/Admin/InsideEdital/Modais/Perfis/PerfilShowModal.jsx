import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Eye } from 'lucide-react';
import React, { useState } from 'react'

const PerfilShowModal = () => {
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }
    return (
        <>
            <button onClick={() => setOpenModal(true)} id="acoes-icons">
                <Eye id='show-btn' />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                <CabecalhoModal titleModal = {"Visualizar Perfil"}/>

                    <hr className='mb-3 mx-4'/>
                <ModalBody >

                    {/* Sub-header */}
                    <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <div>
                        <div id='rows-2-input'>
                            <FormField label="Nome do Perfil">
                                <TextInput readOnly={true} className="md:col-span-1" value="controle-acadêmico" />
                            </FormField>
                            <FormField label="Tipo">
                                <TextInput readOnly={true} className="md:col-span-2" value="Administrador" />
                            </FormField>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div id="buttons-container">
                        
                        <button
                            onClick={onCloseModal}
                            id='modal-purple-button'
                        >
                            Fechar
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default PerfilShowModal