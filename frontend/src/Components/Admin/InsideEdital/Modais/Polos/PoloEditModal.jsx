import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Pencil } from 'lucide-react';
import React, { useState } from 'react'

const PoloEditModal = () => {
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

        <CabecalhoModal titleModal = {"Editar Polo"}/>

          <hr className='mb-3 mx-4'/>

        <ModalBody >
          {/* Sub-header */}
          <p className="text-gray-500 text-xs/5 font-semibold mb-4">
            Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
          </p>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-2">
              {/* Row 1 */}
              <FormField className="md:col-span-2" label="Nome do Polo"><TextInput value="Ex: Especialização Lato Sensu em Eduçação Especial" /></FormField>
              <FormField label="Edital Referente"><TextInput value="Edital Nº 08/2025" /></FormField>
            </div>
            <div className="mt-6 flex justify-end items-center space-x-4">
              <button onClick={onCloseModal} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">Fechar</button>
              <button onClick={onCloseModal} className="cursor-pointer px-6 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)]">Salvar</button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default PoloEditModal