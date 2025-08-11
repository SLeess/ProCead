import { useState } from "react";
import { Plus } from 'lucide-react';
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/Global/ui/modals";
import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, } from "flowbite-react";
import "./CategoriaCreateModal.css";

export default function CategoriaCreateModal() {
    const [openCategoriasModal, setOpenCategoriasModal] = useState(false);

    function onCloseCategoriasModal() {
        setOpenCategoriasModal(false);
    }

    const handleBack = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1]);
        }
    };

    return (
        <>
            <div className="flex gap-1">
                <Plus className="inline text-green-800" />
                <button onClick={() => setOpenCategoriasModal(true)} className="text-sm text-green-800 cursor-pointer font-semibold">Adicionar Categoria</button>
            </div>
            <Modal show={openCategoriasModal} onClose={onCloseCategoriasModal} popup id="modalCategoria">

                <CabecalhoModal titleModal = {"Adicionar Categoria"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody>
                    <div>
                        <div id='rows-1-input' className='mb-4'>
                            <FormField label="Nome da Categoria">
                                <TextInput className="md:col-span-1" placeholder="Ex: Comunidade em Geral" />
                            </FormField>
                        </div>
                    </div>
                    <div id="buttons-container">
                        <button onClick={onCloseCategoriasModal} id='modal-white-button'>Cancelar</button>
                        <button onClick={onCloseCategoriasModal} id='modal-purple-button'>Salvar</button>
                    </div>
                </ModalBody>

            </Modal>
        </>
    );
};