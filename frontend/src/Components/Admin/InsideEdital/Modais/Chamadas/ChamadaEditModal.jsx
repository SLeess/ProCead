import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import { DateTimeInput, FormField } from "@/Components/Global/ui/modals";
import { Modal, ModalBody, TextInput } from "flowbite-react";
import { Pencil } from "lucide-react";
import React, { useState } from "react";

const ChamadaEditModal = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

    return (
        <>
            <button onClick={() => setOpenModal(true)} id="acoes-icons">
                <Pencil id='edit-btn' />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                {loading && <LoaderPages />}

                <CabecalhoModal titleModal={"Editar Chamada"} />

                <hr className='mb-3 mx-4' />

                <ModalBody >
                    {/* Sub-header */}
                    <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <form>
                        <div>

                            <div className="rows-2-input">
                                {/* Row 1 */}
                                <FormField className="md:col-span-1" label="Edital Referente">
                                    <TextInput />
                                </FormField>
                                <FormField className="md:col-span-1" label="Início da Matrícula">
                                    <DateTimeInput />
                                </FormField>

                                {/* Row 2 */}
                                <FormField className="md:col-span-1" label="Fim da Matrícula">
                                    <DateTimeInput />
                                </FormField>
                                <FormField className="md:col-span-1" label="Resultado Final da Matrícula">
                                    <DateTimeInput />
                                </FormField>
                            </div>

                            <div id="buttons-container">
                                <button onClick={onCloseModal} id='modal-white-button'>Cancelar</button>
                                <button type='submit' id='modal-purple-button' disabled={loading}>
                                    {loading ? 'Salvando...' : 'Salvar'}
                                </button>
                            </div>

                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default ChamadaEditModal;