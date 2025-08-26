import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, SelectInput, TextInput } from '@/Components/Global/ui/modals';
import { useAppContext } from '@/Contexts/AppContext';
import { Modal, ModalBody } from 'flowbite-react';
import { Pencil } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const DisciplinaEditModal = ({ disciplina, setNeedUpdate }) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token, verifyStatusRequest } = useAppContext();
  const [cursos, setCursos] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    carga_horaria: '',
    curso_id: ''
  });

  useEffect(() => {
    if (disciplina) {
      setFormData({
        nome: disciplina.nome || '',
        carga_horaria: disciplina.carga_horaria || '',
        curso_id: disciplina.curso_id || ''
      });
    }
  }, [disciplina]);

  useEffect(() => {
    if (!openModal || !disciplina?.edital_id) return;

    const fetchCursos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/cursos/${disciplina.edital_id}`, {
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
  }, [openModal, disciplina, token, verifyStatusRequest]);

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

    const payload = {
      ...formData,
      edital_id: disciplina.edital_id,
    };

    try {
      const res = await fetch(`/api/admin/disciplinas/${disciplina.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
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
        toast.success(result.message || "Disciplina atualizada com sucesso!");
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
        <Pencil id='edit-btn' />
      </button>
      <Modal show={openModal} onClose={onCloseModal} popup>
        {loading && <LoaderPages />}
        <CabecalhoModal titleModal={"Editar Disciplina"} />
        <hr className='mb-3 mx-4' />
        <ModalBody>
          <p id='subtitle-edital'>
            Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
          </p>
          <form onSubmit={handleSubmit}>
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
                <FormField label="Edital Referente">
                  <TextInput value="Edital Nº 08/2025" readOnly />
                </FormField>
                <FormField className="md:col-span-2" label="Nome da Disciplina">
                  <TextInput value={formData.nome} onChange={(e) => handleOnChangeAttr(e, "nome")} required />
                </FormField>
                <FormField className="md:col-span-1" label="Carga Horária (horas)">
                  <TextInput value={formData.carga_horaria} onChange={(e) => handleOnChangeAttr(e, "carga_horaria")} required />
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
  )
}

export default DisciplinaEditModal;
