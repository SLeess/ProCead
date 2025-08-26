

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { Check, Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import "./InscricaoModal.css"

export default function InscricaoAvaliarModal() {
    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

    return (
        <>
            <button onClick={() => setOpenModal(true)} id="acoes-icons">
                <Check id='avaliate-btn' />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Avaliar Inscrição"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >

                    <div id="subtitle-inscricao">
                        <p id="date-inscricao">Data de Inscrição: 04/07/2025</p>
                        <span id="inscricao-status-text">Deferido</span>
                    </div>

                    <div>
                        <h2 id="inscricao-documentos-title">Anexos</h2>
                        <div id="inscricao-documentos-grid">
                            <AnexoButton label="Identidade:" />
                            <AnexoButton label="Comprovante:" />
                            <AnexoButton label="Histórico:" />
                            <AnexoButton label="Auto Declaração:" />
                        </div>

                        <h2 id="inscricao-situacao-title">Situação</h2>
                        <div className='rows-3-input'>
                            <FormField label="Status" className="md:col-span-1">
                                <SelectInput value="Deferido" options={['Deferido', 'Indeferido', 'Em Análise']} />
                            </FormField>
                            <FormField label="Observações" className="md:col-span-3">
                                <textarea
                                    rows="4"
                                    id="inscricao-observacoes-textarea"
                                    defaultValue="Informamos que a inscrição de Vossa Senhoria no presente processo seletivo foi indeferida em razão do não atendimento aos requisitos formais estabelecidos no edital, especificamente pela ausência da documentação comprobatória exigida para a função pretendida, inviabilizando a devida análise e homologação da candidatura."
                                />
                            </FormField>
                        </div>

                        <div id="buttons-container">
                            <button onClick={onCloseModal} id='modal-white-button'>Cancelar</button>
                            <button onClickCapture={onCloseModal} id='modal-purple-button'>Avaliar</button>
                        </div>
                    </div>

                </ModalBody>
            </Modal>
        </>
    );
}
