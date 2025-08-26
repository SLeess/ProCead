import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Pencil, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import ".././Modais.css"
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import { useAppContext } from '@/Contexts/AppContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PoloCreateModal = ({setNeedUpdate}) => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useAppContext();
    const editalId = useParams();
    function onCloseModal() {
        setOpenModal(false);
    }
    const [formData, setFormData] = useState({
        nome: '',
    });
    const handleOnChangeAttr = (e, attr) => {
        const { value } = e.target;
        setFormData(f => ({ ...f, [attr]: value }));
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                const res = await fetch('/api/admin/polos', {
                    method: 'post',
                    body: JSON.stringify({...formData, editalId: editalId.editalId}),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Descomente se precisar de token
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
                    toast.success((result.message || "Polo cadastrado com sucesso!"));
                }
            } catch (error) {
                toast.error(error.toString());
            } finally{
                setNeedUpdate(prev => !prev);
                // window.location.reload();
                setLoading(false);
                onCloseModal();
            }
        };

    return (
        <>
            <button onClick={() => setOpenModal(true)} id='create-btn'>
                <Plus className="inline" />
                <span className='ml-1'>Cadastrar Polo</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
            {loading && <LoaderPages/>}

                <CabecalhoModal titleModal={"Criar Polo"} />

                <hr className='mb-3 mx-4' />

                <ModalBody >
                    {/* Sub-header */}
                    <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <form id="content" onSubmit={handleSubmit}>
                        
                        <div>
                            <div className='rows-3-input'>
                                {/* Row 1 */}
                                <FormField className="md:col-span-2"  label="Nome do Polo"><TextInput value={formData.nome_completo} onChange={(e) => handleOnChangeAttr(e, "nome")}/></FormField>
                                <FormField label="Edital Referente"><TextInput value="Edital Nº 08/2025" /></FormField>
                            </div>
                            <div id="buttons-container">
                                <button onClick={onCloseModal} id='modal-white-button'>Cancelar</button>
                                <button type='submit' id='modal-purple-button'>Salvar</button>
                            </div>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default PoloCreateModal