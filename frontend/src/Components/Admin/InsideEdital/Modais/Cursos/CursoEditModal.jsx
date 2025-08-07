import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Pencil } from 'lucide-react';
import React, { useState } from 'react'

const CursoEditModal = () => {
  const [openModal, setOpenModal] = useState(false);
  function onCloseModal() {
    setOpenModal(false);
  }
  return (
    <>
      <button onClick={() => setOpenModal(true)} className="p-1 hover:bg-gray-200 rounded-full">
        <Pencil className="h-5 w-5 text-yellow-500" />
      </button>
      <Modal show={openModal} onClose={onCloseModal} popup>

        <CabecalhoModal titleModal = {"Editar Curso"}/>

            <hr className='mb-3 mx-4'/>

        <ModalBody >
          {/* Sub-header */}
          <p id='subtitle-edital'>
            Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
          </p>
          <div>
            <div id='rows-3-input'>
              {/* Row 1 */}
              <FormField className="md:col-span-2" label="Nome do Curso"><TextInput value="Ex: Especialização Lato Sensu em Eduçação Especial" /></FormField>
              <FormField label="Edital Referente"><TextInput value="Edital Nº 08/2025" /></FormField>
            </div>
            <div id="buttons-container">
              <button onClick={onCloseModal} id='cancel-button'>Fechar</button>
              <button onClick={onCloseModal} id='save-button'>Salvar</button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default CursoEditModal