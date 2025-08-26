

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, } from "flowbite-react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import "./RecursoModal.css";

export default function RecursoShowModal() {
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

                <CabecalhoModal titleModal = {"Visualizar Recurso"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >

                    <div id="subtitle-inscricao">
                        <p id="date-inscricao">Data do Recurso: 04/07/2025</p>
                        <span id="status-inscricao">Em análise</span>
                    </div>

                    <div>
                        <h2 id='recurso-situacao-text'>Situação</h2>
                        
                        <div className="rows-2-input">
                            <FormField label="Tipo de recurso" className="col-span-1">
                                <SelectInput readOnly={true} value="Interposição de Classificação" options={['Interposição de Classificação', 'Recurso de Prova', 'Recurso de Cota']} />
                            </FormField>
                            <FormField label="Status" className="col-span-1">
                                <SelectInput readOnly={true} value="Em Análise" options={['Deferido', 'Indeferido', 'Em Análise']} />
                            </FormField>
                        
                        
                            <FormField label="Motivo" className="md:col-span-3">
                                <textarea
                                    readOnly
                                    rows="6"
                                    id='recurso-textarea'
                                    value="Informamos que a inscrição de Vossa Senhoria no presente processo seletivo foi indeferida em razão do não atendimento aos requisitos formais estabelecidos no edital, especificamente pela ausência da documentação comprobatória exigida para a função pretendida, inviabilizando a devida análise e homologação da candidatura."
                                />
                            </FormField>
                            <FormField label="Resposta" className="md:col-span-3">
                                <textarea
                                    readOnly
                                    rows="6"
                                    id='recurso-textarea'
                                    value="Ex: Em resposta ao recurso apresentado, referente ao Edital nº 04/2025, a Comissão de Avaliação do Processo Seletivo esclarece que as exigências do subitem 1.3.6 e alíneas correspondentes foram estabelecidas como critérios objetivos e pré-requisitos para participação no certame."
                                />
                            </FormField>
                        </div>

                        <div id="buttons-container">
                            {/* <button onClick={handleBack} id='modal-white-button'>Voltar</button> */}
                            <button onClickCapture={onCloseModal} id='modal-purple-button'>Fechar</button>
                        </div>
                    </div>

                </ModalBody>
            </Modal>
        </>
    );
}
