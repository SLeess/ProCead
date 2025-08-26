import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { DateTimeInput, FormField, TextInput } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Pencil, Plus } from 'lucide-react';
import React, { useState } from 'react'

const ChamadaCreateModal = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

    return (
        <>
            <button onClick={() => setOpenModal(true)} id='create-btn'>
                <Plus className="inline" />
                <span className='ml-1'>Criar Chamada</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                {loading && <LoaderPages />}

                <CabecalhoModal titleModal={"Criar Chamada"} />

                <hr className='mb-3 mx-4' />

                <ModalBody >
                    {/* Sub-header */}
                    <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <form>
                        <div>

                            <div id='rows-2-input'>
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
    )
}

export default ChamadaCreateModal