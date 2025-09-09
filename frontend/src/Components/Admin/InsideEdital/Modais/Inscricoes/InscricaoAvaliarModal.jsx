

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { Check, Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import "./InscricaoModal.css"

export default function InscricaoAvaliarModal({ inscricao }) {
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
                {openModal && inscricao && (
                    <>
                        <CabecalhoModal titleModal={"Avaliar Inscrição"} />

                        <hr className='mb-3 mx-4' />

                        <ModalBody >

                            <div id="subtitle-inscricao">
                                <p id="date-inscricao">Data de Inscrição: {new Date(inscricao.created_at).toLocaleDateString()}</p>
                                <span id="inscricao-status-text">{inscricao.status}</span>
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
                                <div id='rows-3-input'>
                                    <FormField label="Status" className="md:col-span-1">
                                        <SelectInput defaultValue={inscricao.status} options={['Deferido', 'Indeferido', 'Em análise']} />
                                    </FormField>
                                    <FormField label="Observações" className="md:col-span-3">
                                        <textarea
                                            rows="4"
                                            id="inscricao-observacoes-textarea"
                                            defaultValue={inscricao.motivo}
                                        />
                                    </FormField>
                                </div>

                                <div id="buttons-container">
                                    <button onClick={onCloseModal} id='modal-white-button'>Cancelar</button>
                                    <button onClickCapture={onCloseModal} id='modal-purple-button'>Avaliar</button>
                                </div>
                            </div>

                        </ModalBody>
                    </>
                )}
            </Modal>
        </>
    );
}
