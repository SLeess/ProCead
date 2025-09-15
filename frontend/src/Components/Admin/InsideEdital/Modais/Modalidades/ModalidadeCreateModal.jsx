import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput, Checkbox } from '@/Components/Global/ui/modals';
import { useAppContext } from '@/Contexts/AppContext';
import { Modal, ModalBody } from 'flowbite-react';
import { Plus } from 'lucide-react';
import { MultiSelect } from 'primereact/multiselect';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ModalidadeCreateModal = ({ setNeedUpdate }) => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token, verifyStatusRequest } = useAppContext();
    const { editalId } = useParams();
    const [formData, setFormData] = useState({
        sigla: '',
        descricao: '',
        tipos_avaliacao: [],
        anexos: []
    });
    const [anexos, setAnexos] = useState([])

    const availableTiposAvaliacao = [
        "Socioeconômica",
        "Heteroidentificação",
        "Junta Médica",
        "Étnica",
        "Identidade de Gênero"
    ];

    function onCloseModal() {
        setOpenModal(false);
        setFormData({
            sigla: '',
            descricao: '',
            tipos_avaliacao: [],
            anexos: []
        });
    }

    const handleOnChangeAttr = (e, attr) => {
        const { value } = e.target;
        setFormData(f => ({ ...f, [attr]: value }));
    };

    const handleCheckboxChange = (label) => {
        setFormData(prevFormData => {
            const currentTipos = prevFormData.tipos_avaliacao;
            if (currentTipos.includes(label)) {
                return {
                    ...prevFormData,
                    tipos_avaliacao: currentTipos.filter(item => item !== label)
                };
            } else {
                return {
                    ...prevFormData,
                    tipos_avaliacao: [...currentTipos, label]
                };
            }
        });
    };

    useEffect(() => {
        const fetchAnexos = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/admin/anexos', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    method: 'GET'
                })
                if (!res.ok) {
                    verifyStatusRequest(res);
                    throw new Error(`Erro ao buscar processos: ${res.status} ${res.statusText}`);
                }
                const result = await res.json();
                setAnexos(result.data)
            } catch (error) {
                setAnexos([]);
                throw new Error(`Erro : ${error}`);
            } finally {
                setLoading(false);
            }
        }
        fetchAnexos()
    }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/admin/modalidades/`, {
                method: 'POST',
                body: JSON.stringify({ ...formData, editalId }),
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
                <span className='ml-1'>Cadastrar Modalidade</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                {loading && <LoaderPages />}
                <CabecalhoModal titleModal={"Criar Modalidade"} />

                <hr className='mb-3 mx-4' />

                <ModalBody >
                    {/* Sub-header */}
                    <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p>
                    <form onSubmit={handleSubmit}>

                        <div>
                            <div className="mb-4 rows-2-input">
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
                                            checked={formData.tipos_avaliacao.includes(tipo)}
                                            onChange={() => handleCheckboxChange(tipo)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='mt-3'>
                                <FormField label="Anexos da Vaga" className="md:col-span-3">

                                    <MultiSelect
                                        value={formData.anexos}
                                        onChange={(e) => setFormData(f => ({ ...f, anexos: e.value }))}
                                        options={(anexos)}
                                        optionLabel="nome"
                                        display="chip"
                                        placeholder="Selecione os Anexos"
                                        className=" items-center"
                                        id='multiselect-primereact'
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
    )
}

export default ModalidadeCreateModal