import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput, Checkbox } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Eye, Pencil, Plus } from 'lucide-react';
import React, { useState } from 'react';
import "./ModalidadeModal.css";

const ModalidadeShowModal = () => {
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

                <CabecalhoModal titleModal = {"Visualizar Modalidade"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >
                    {/* Sub-header */}
                    <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <div>
                        <div className="mb-4 rows-2-input">
                            <FormField  label="Sigla">
                                <TextInput readOnly={true} className="md:col-span-1" value="AC" />
                            </FormField>
                            <FormField label="Descrição">
                                <TextInput readOnly={true} className="md:col-span-2" value="Ampla Concorrência" />
                            </FormField>
                        </div>

                        <div>
                            <h3 id='tipo-avaliacao-title'>Tipo de Avaliação</h3>
                            <div id='tipo-avaliacao-grid'>
                                <Checkbox readOnly={true} checked={true} label="Socioeconômica" />
                                <Checkbox readOnly={true} checked={true} label="Heteroidentificação" />
                                <Checkbox readOnly={true} label="Junta Médica" />
                                <Checkbox readOnly={true} label="Étnica" />
                                <Checkbox readOnly={true} label="Identidade de Gênero" />
                            </div>
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

export default ModalidadeShowModal