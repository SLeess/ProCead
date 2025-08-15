

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import "./RecursoModal.css";

export default function RecursoEditModal() {
    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

    return (
        <>
            <button onClick={() => setOpenModal(true)} className="p-1 hover:bg-gray-200 rounded-full">
                <Pencil className="h-5 w-5 text-yellow-500" />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Editar Recurso"}/>

                    <hr className='mb-3 mx-4'/>
                    
                <ModalBody >

                    <div id="subtitle-inscricao">
                        <p id="date-inscricao">Data do Recurso: 04/07/2025</p>
                        <span id="status-inscricao">Em análise</span>
                    </div>

                    <div>
                        <h2 id='recurso-situacao-text'>Situação</h2>

                        <div id='rows-2-input'>
                            <FormField label="Tipo de recurso" className="col-span-1">
                                <SelectInput readOnly={false} value="Interposição de Classificação" options={['Interposição de Classificação', 'Recurso de Prova', 'Recurso de Cota']} />
                            </FormField>
                            <FormField label="Status" className="col-span-1">
                                <SelectInput readOnly={false} value="Em Análise" options={['Deferido', 'Indeferido', 'Em Análise']} />
                            </FormField>

                            <FormField label="Motivo" className="md:col-span-3">
                                <textarea
                                    rows="6"
                                    id='recurso-textarea'
                                    defaultValue="Informamos que a inscrição de Vossa Senhoria no presente processo seletivo foi indeferida em razão do não atendimento aos requisitos formais estabelecidos no edital, especificamente pela ausência da documentação comprobatória exigida para a função pretendida, inviabilizando a devida análise e homologação da candidatura."
                                />
                            </FormField>
                            <FormField label="Resposta" className="md:col-span-3">
                                <textarea
                                    rows="6"
                                    id='recurso-textarea'
                                    defaultValue="Ex: Em resposta ao recurso apresentado, referente ao Edital nº 04/2025, a Comissão de Avaliação do Processo Seletivo esclarece que as exigências do subitem 1.3.6 e alíneas correspondentes foram estabelecidas como critérios objetivos e pré-requisitos para participação no certame."
                                />
                            </FormField>
                        </div>

                        <div id="buttons-container">
                            <button onClick={onCloseModal} id='modal-white-button'>Cancelar</button>
                            <button onClickCapture={onCloseModal} id='modal-purple-button'>Salvar</button>
                        </div>
                    </div>

                </ModalBody>
            </Modal>
        </>
    );
}
