import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Pencil } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/Contexts/AppContext';
import { toast } from 'react-toastify';
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import { useParams } from 'react-router-dom';

const PoloEditModal = ({ polo, setNeedUpdate }) => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useAppContext();
    const {editalId} = useParams();
    const [formData, setFormData] = useState({
        nome: '',
        editalId: ''
    });

    useEffect(() => {
        if (polo) {
            setFormData({
                nome: polo.nome || '',
                editalId: editalId || '',
            });
        }
    }, [polo]);

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
            const res = await fetch(`/api/admin/polos/${polo.id}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
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
                toast.success(result.message || "Polo atualizado com sucesso!");
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
            <button onClick={() => setOpenModal(true)} className="p-1 hover:bg-gray-200 rounded-full">
                <Pencil className="h-5 w-5 text-yellow-500" />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                {loading && <LoaderPages />}
                <CabecalhoModal titleModal={"Editar Polo"} />
                <hr className='mb-3 mx-4' />
                <ModalBody>
                    <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <form id="content" onSubmit={handleSubmit}>
                        <div>
                            <div className='rows-3-input'>
                                <FormField className="md:col-span-2" label="Nome do Polo">
                                    <TextInput value={formData.nome} onChange={(e) => handleOnChangeAttr(e, "nome")} />
                                </FormField>
                                <FormField label="Edital Referente">
                                    <TextInput value="Edital Nº 08/2025" readOnly />
                                </FormField>
                            </div>
                            <div id="buttons-container">
                                <button type="button" onClick={onCloseModal} id='modal-white-button'>Cancelar</button>
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

export default PoloEditModal;
