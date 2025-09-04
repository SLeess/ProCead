import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import { FormField, SelectInput, TextInput } from "@/Components/Global/ui/modals";
import { useAppContext } from "@/Contexts/AppContext";
import { Modal, ModalBody } from "flowbite-react";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AnexoCreateModal = ({ setNeedUpdate }) => {
    const { token } = useAppContext();
    const [loading, setLoading] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [formData, setFormData] = useState({
        nome: '',
        formato: '',
    });

    function onCloseModal() {
        setOpenModal(false);
    }

    const handleOnChangeAttr = (e, attr) => {
        const { value } = e.target;
        setFormData(f => ({ ...f, [attr]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/super-admin/anexos/`, {
                method: 'POST',
                body: JSON.stringify({...formData}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
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
                toast.success(result.message || "Modalidade cadastrada com sucesso!");
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
    };

    return (
        <>
            <button onClick={() => setOpenModal(true)} id='create-btn'>
                <Plus className="inline" />
                <span className='ml-1'>Cadastrar Anexo</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Criar Anexo"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >

                    {/* Sub-header */}
                    {/* {
                        !enableGlobal &&
                        <p id='subtitle-edital'>
                            Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                        </p>
                    } */}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                                <FormField label="Nome do Anexo">
                                    <TextInput className="md:col-span-1" placeholder="Ex: Comprovante de Residência"
                                    onChange={e => handleOnChangeAttr(e, 'nome')} />
                                </FormField>
                                <FormField label="Formato">
                                    <SelectInput 
                                        className="md:col-span-2" 
                                        defaultOption={true}
                                        options={['Vídeo', 'PDF']}
                                        onChange={e => handleOnChangeAttr(e, 'formato')}
                                    />
                                </FormField>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div id="buttons-container">
                            <button
                                onClick={onCloseModal}
                                id='modal-white-button'
                            >
                                Cancelar
                            </button>
                            <button
                                // onClick={handleOnSubmit}
                                id='modal-purple-button'
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default AnexoCreateModal;