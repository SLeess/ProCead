

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { Check, Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import "./InscricaoModal.css"
import { AppContext, useAppContext } from "@/Contexts/AppContext";
import { toast } from "react-toastify";
import Loader from "@/Components/Global/Loader/Loader";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";

export default function InscricaoAvaliarModal({ inscricao, setNeedUpdate }) {
    const [openModal, setOpenModal] = useState(false);
    const { token } = useAppContext(AppContext);
    const [loading, setLoading] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

    const [formData, setFormData] = useState({
        status: inscricao ? inscricao.status : '',
        motivo: inscricao ? inscricao.motivo : '',
    });

    function renderizarStatus() {
        const statusInscricao = {
            "Deferido": "bg-green-100 text-green-700",
            "Indeferido": "bg-red-100 text-red-700",
            "Em análise": "bg-yellow-100 text-yellow-700"
        };

        const statusColor = statusInscricao[inscricao.status] || "bg-gray-100 text-gray-700";
            
        return (
            <span className={`inscricao-status-text ${statusColor}`}>{inscricao.status}</span>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            const res = await fetch(`/api/admin/inscricoes/avaliar/${inscricao.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const result = await res.json();

            if (!result.success || !res.ok) {
                if (result.errors) {
                    if (Array.isArray(result.errors)) {
                        result.errors.forEach(errorMessage => {
                            toast.error(errorMessage);
                        });
                    } else {
                        toast.error(result.errors);
                    }
                } else if (result.message) {
                    toast.error(result.message);
                } else {
                    toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.");
                }
            } else {
                toast.success(result.message || "Inscrição avaliada com sucesso!");
                if (setNeedUpdate) {
                    setNeedUpdate(prev => !prev);
                }
                onCloseModal();
            }
        } catch (error) {
            toast.error("Erro ao conectar com o servidor: " + error);
        } finally {
            setLoading(false);
        }
    }


return (
    <>
        <button onClick={() => setOpenModal(true)} id="acoes-icons">
            <Check id='avaliate-btn' />
        </button>
        <Modal show={openModal} onClose={onCloseModal} popup>
            {loading && <LoaderPages/>}
            {openModal && inscricao && (
                <>
                    <CabecalhoModal titleModal={"Avaliar Inscrição"} />

                    <hr className='mb-3 mx-4' />

                    <ModalBody >
                        <form onSubmit={handleSubmit}>

                            <div id="subtitle-inscricao">
                                <p id="date-inscricao">Data de Inscrição: {new Date(inscricao.created_at).toLocaleDateString()}</p>
                                {renderizarStatus()}
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
                                        <SelectInput
                                            defaultValue={inscricao.status}
                                            options={['Deferido', 'Indeferido', 'Em análise']}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        />
                                    </FormField>
                                    <FormField label="Observações" className="md:col-span-3">
                                        <textarea
                                            rows="4"
                                            id="inscricao-observacoes-textarea"
                                            defaultValue={inscricao.motivo}
                                            onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                                        />
                                    </FormField>
                                </div>
                                <div id="buttons-container">
                                    <button onClickCapture={onCloseModal} id='modal-white-button'>Cancelar</button>
                                    <button type='submit' id='modal-purple-button'>Avaliar</button>
                                </div>
                            </div>
                        </form>

                    </ModalBody>
                </>
            )}
        </Modal>
    </>
);
}
