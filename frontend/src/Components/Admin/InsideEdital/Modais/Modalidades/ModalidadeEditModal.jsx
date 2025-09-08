import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput, Checkbox } from '@/Components/Global/ui/modals';
import { useAppContext } from '@/Contexts/AppContext';
import { Modal, ModalBody } from 'flowbite-react';
import { Pencil } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const availableTiposAvaliacao = [
    "Socioeconômica",
    "Heteroidentificação",
    "Junta Médica",
    "Étnica",
    "Identidade de Gênero"
];

const ModalidadeEditModal = ({ setNeedUpdate, modalidade }) => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useAppContext();
    const {editalId} = useParams();
    const [formData, setFormData] = useState({
        sigla: '',
        descricao: '',
    });
    const [selectedTipos, setSelectedTipos] = useState([]);

    useEffect(() => {
        if (openModal && modalidade) {
            setFormData({
                sigla: modalidade.sigla || '',
                descricao: modalidade.descricao || '',
            });
            if (modalidade.tipos_avaliacoes && Array.isArray(modalidade.tipos_avaliacoes)) {
                setSelectedTipos(modalidade.tipos_avaliacoes);
            } else {
                setSelectedTipos([]);
            }
        }
    }, [modalidade, openModal]);


    function onCloseModal() {
        setOpenModal(false);
    }

    const handleOnChangeAttr = (e, attr) => {
        const { value } = e.target;
        setFormData(f => ({ ...f, [attr]: value }));
    };

    const handleCheckboxChange = (label) => {
        setSelectedTipos(prevSelected => {
            if (prevSelected.includes(label)) {
                return prevSelected.filter(item => item !== label);
            } else {
                return [...prevSelected, label];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const dataToSend = {
            ...formData,
            tipos_avaliacao: selectedTipos,
            editalId: editalId
        };

        try {
            const res = await fetch(`/api/admin/modalidades/${modalidade.id}`, {
                method: 'PUT',
                body: JSON.stringify(dataToSend),
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
                toast.success(result.message || "Modalidade atualizada com sucesso!");
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
                <CabecalhoModal titleModal={"Editar Modalidade"} />

                <hr className='mb-3 mx-4' />

                <ModalBody >
                    {/* Sub-header */}
                    <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <form onSubmit={handleSubmit}>

                        <div>
                            <div id='rows-2-input' className='mb-4'>
                                <FormField label="Sigla">
                                    <TextInput
                                        className="md:col-span-1"
                                        value={formData.sigla}
                                        onChange={e => handleOnChangeAttr(e, 'sigla')}
                                    />
                                </FormField>
                                <FormField label="Descrição">
                                    <TextInput
                                        className="md:col-span-2"
                                        value={formData.descricao}
                                        onChange={e => handleOnChangeAttr(e, 'descricao')}
                                    />
                                </FormField>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-600 mb-3">Tipo de Avaliação</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5">
                                    {availableTiposAvaliacao.map((tipo) => (
                                        <Checkbox
                                            key={tipo}
                                            label={tipo}
                                            checked={selectedTipos.includes(tipo)}
                                            onChange={() => handleCheckboxChange(tipo)}
                                        />
                                    ))}
                                </div>
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
    )
}

export default ModalidadeEditModal