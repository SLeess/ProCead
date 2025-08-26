import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, SelectInput, TextInput } from '@/Components/Global/ui/modals';
import { AppContext } from '@/Contexts/AppContext';
import { Modal, ModalBody } from 'flowbite-react';
import { Plus } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';

const DisciplinaCreateModal = ({ setNeedUpdate }) => {
    const [openModal, setOpenModal] = useState(false);
    const { editalId } = useParams();
    const { token, verifyStatusRequest } = useContext(AppContext);
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        nome: '',
        carga_horaria: '',
        curso_id: ''
    });

    function onCloseModal() {
        setOpenModal(false);
        setFormData({
            nome: '',
            carga_horaria: '',
            curso_id: ''
        });
    }

    useEffect(() => {
        if (!openModal) return;
        const fetchCursos = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/admin/cursos/${editalId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await res.json();

                if (!res.ok) {
                    verifyStatusRequest(res.status, result);
                    throw new Error(`Erro ao buscar cursos: ${res.status} ${res.statusText}`);
                }

                setCursos(result.data);
            } catch (error) {
                console.error(error);
                setCursos([]);
                toast.error("Erro ao buscar cursos.");
            } finally {
                setLoading(false);
            }
        };
        fetchCursos();
    }, [openModal]);

    const handleOnChangeAttr = (e, attr) => {
        const { value } = e.target;
        setFormData(f => ({ ...f, [attr]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`/api/admin/disciplinas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    edital_id: editalId
                })
            });

            const result = await res.json();

            if (!res.ok) {
                verifyStatusRequest(res.status, result);
                toast.error(result.message || "Ocorreu um erro ao criar a disciplina.");
            } else {
                toast.success(result.message || "Disciplina criada com sucesso!");
                setNeedUpdate(prev => !prev);
                onCloseModal();
            }
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro ao criar a disciplina.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <button onClick={() => setOpenModal(true)} id='create-btn'>
                <Plus className="inline" />
                <span className='ml-1'>Cadastrar Disciplina</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                {submitting && <LoaderPages />}
                <CabecalhoModal titleModal={"Cadastrar Disciplina"} />
                <hr className='mb-3 mx-4' />
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <p id='subtitle-edital'>
                            Edital Referente: Processo de Seleção de Discentes...
                        </p>
                        {loading ? <LoaderPages /> : (
                            <div>
                                <div id='rows-3-input'>
                                    <FormField className="md:col-span-2" label="Nome do Curso">
                                        <SelectInput
                                            value={formData.curso_id}
                                            onChange={(e) => handleOnChangeAttr(e, 'curso_id')}
                                            defaultOption={true}
                                            options={cursos.map(curso => ({ value: curso.id, label: curso.nome }))}
                                        />
                                    </FormField>
                                    <FormField label="Edital Referente"><TextInput readOnly={true} value={`Edital Nº ${editalId}`} /></FormField>
                                    <FormField className="md:col-span-2" label="Nome da Disciplina">
                                        <TextInput
                                            value={formData.nome}
                                            onChange={(e) => handleOnChangeAttr(e, 'nome')}
                                            placeholder="Ex: Zoologia de Invertebrados"
                                        />
                                    </FormField>
                                    <FormField className="md:col-span-1" label="Carga Horária">
                                        <TextInput
                                            value={formData.carga_horaria}
                                            onChange={(e) => handleOnChangeAttr(e, 'carga_horaria')}
                                            placeholder="Ex: 60"
                                        />
                                    </FormField>
                                </div>
                                <div id="buttons-container">
                                    <button type="button" onClick={onCloseModal} id='modal-white-button'>Cancelar</button>
                                    <button type="submit" id='modal-purple-button' disabled={submitting}>
                                        {submitting ? 'Salvando...' : 'Salvar'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default DisciplinaCreateModal;