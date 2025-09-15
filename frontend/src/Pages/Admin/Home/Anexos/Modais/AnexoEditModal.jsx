import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import { FormField, SelectInput, TextInput } from "@/Components/Global/ui/modals";
import { useAppContext } from "@/Contexts/AppContext";
import { Modal, ModalBody } from "flowbite-react";
import { Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AnexoEditModal = ({ setNeedUpdate, anexo }) => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useAppContext();
    const [formData, setFormData] = useState({
        nome: '',
        formato: '',
    });

    useEffect(() => {
        if (openModal && anexo) {
            setFormData({
                nome: anexo.nome || '',
                formato: anexo.formato || '',
            });
        }
    }, [anexo, openModal]);

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
            const res = await fetch(`/api/admin/anexos/${anexo.id}`, {
                method: 'PUT',
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
                toast.success(result.message || "Anexo atualizado com sucesso!");
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
            <button onClick={() => setOpenModal(true)} id="acoes-icons">
                <Pencil className="h-5 w-5 text-yellow-500" />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                {loading && <LoaderPages />}
                <CabecalhoModal titleModal={"Editar Anexo"} />

                <hr className='mb-3 mx-4' />

                <ModalBody >
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                                <FormField label="Nome do Anexo">
                                    <TextInput className="md:col-span-1" placeholder="Ex: Comprovante de Residência"
                                    onChange={e => handleOnChangeAttr(e, 'nome')} value={formData.nome}/>
                                </FormField>
                                <FormField label="Formato">
                                    <SelectInput
                                        value={formData.formato}
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
                                type="button"
                            >
                                Cancelar
                            </button>
                            <button
                                type='submit'
                                id='modal-purple-button'
                            >
                                {loading ? "Salvando..." : "Salvar"}
                            </button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    );
}

export default AnexoEditModal;