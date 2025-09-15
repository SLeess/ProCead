

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import "./CotasModal.css";

export default function CotaEditModal() {
    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

    return (
        <>
            <button onClick={() => setOpenModal(true)} id="acoes-icons">
                <Pencil id='edit-btn' />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Editar Situação na Reserva de Vagas"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >

                    <div id="subtitle-inscricao">
                        <p id="date-inscricao">Data de Inscrição: 04/07/2025</p>
                        <span id="status-inscricao">Em análise</span>
                    </div>

                    <div>
                        <h2 id="cotas-documentos-title">Documentos Comprobatórios da Reserva de Vagas</h2>
                        <div id="cotas-documentos-grid">
                            <AnexoButton label="Documento 1:" />
                            <AnexoButton label="Documento 2:" />
                            <AnexoButton label="Vídeo:" />
                        </div>

                        <h2 id="cotas-situacao-title">Situação</h2>
                        <div className='rows-3-input'>
                            <FormField label="Status" className="md:col-span-1">
                                <SelectInput value="Em Análise" options={['Deferido', 'Indeferido', 'Em Análise']} />
                            </FormField>
                            <FormField label="Observações" className="md:col-span-3">
                                <textarea id="cotas-observacoes-textarea"
                                    rows="4"
                                    defaultValue="Informamos que a inscrição de Vossa Senhoria no presente processo seletivo foi indeferida em razão do não atendimento aos requisitos formais estabelecidos no edital, especificamente pela ausência da documentação comprobatória exigida para a função pretendida, inviabilizando a devida análise e homologação da candidatura."
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
