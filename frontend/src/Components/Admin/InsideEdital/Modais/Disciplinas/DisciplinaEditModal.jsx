import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Pencil } from 'lucide-react';
import React, { useState } from 'react'

const DisciplinaEditModal = () => {
  const [openModal, setOpenModal] = useState(false);
  function onCloseModal() {
    setOpenModal(false);
  }
  return (
    <>
      <button onClick={() => setOpenModal(true)} id="acoes-icons">
        <Pencil id='edit-btn' />
      </button>
      <Modal show={openModal} onClose={onCloseModal} popup>

        <CabecalhoModal titleModal = {"Editar Disciplina"}/>

            <hr className='mb-3 mx-4'/>

        <ModalBody >
          {/* Sub-header */}
          <p id='subtitle-edital'>
            Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
          </p>
          <div>
            <div id='rows-3-input'>
              {/* Row 1 */}
              <FormField className="md:col-span-2" label="Nome do Curso"><TextInput value="Especialização Lato Sensu em Eduçação Especial" /></FormField>
              <FormField label="Edital Referente"><TextInput value="Edital Nº 08/2025" /></FormField>
              <FormField className="md:col-span-2" label="Nome da Disciplina"><TextInput value="Zoologia de Invertebrados" /></FormField>
              <FormField className="md:col-span-1" label="Carga Horária"><TextInput value="60 horas" /></FormField>
            </div>
            <div id="buttons-container">
              <button onClick={onCloseModal} id='modal-white-button'>Cancelar</button>
              <button onClick={onCloseModal} id='modal-purple-button'>Salvar</button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default DisciplinaEditModal