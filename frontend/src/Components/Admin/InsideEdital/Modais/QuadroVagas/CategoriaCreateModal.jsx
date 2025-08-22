import { useState } from "react";
import { Plus, ChevronUp, ChevronDown } from 'lucide-react';
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import { FormField, TextInput } from "@/Components/Global/ui/modals";
import { Modal, ModalBody } from "flowbite-react";
import "./CategoriaCreateModal.css";

export default function CategoriaCreateModal() {
    const [openCategoriasModal, setOpenCategoriasModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState("");

    function onCloseCategoriasModal() {
        setOpenCategoriasModal(false);
        // Optional: reset state when closing modal
        // setNewCategoryName("");
        // setCategories([]);
    }

    function handleAddCategory() {
        if (newCategoryName.trim()) {
            setCategories([...categories, { name: newCategoryName.trim() }]);
            setNewCategoryName(""); // Clear input after adding
        }
    }

    function handleMove(index, direction) {
        const newCategories = [...categories];
        const newIndex = index + direction;

        if (newIndex < 0 || newIndex >= newCategories.length) {
            return; // Invalid move
        }

        // Swap elements
        [newCategories[index], newCategories[newIndex]] = [newCategories[newIndex], newCategories[index]];
        
        setCategories(newCategories);
    }

    return (
        <>
            <div className="flex gap-1">
                <Plus className="inline text-green-800" />
                <button type="button" onClick={() => setOpenCategoriasModal(true)} className="text-sm text-green-800 cursor-pointer font-semibold">Adicionar Categoria</button>
            </div>
            <Modal show={openCategoriasModal} onClose={onCloseCategoriasModal} popup id="modalCategoria">

                <CabecalhoModal titleModal={"Adicionar Categoria"} />

                <hr className='mb-3 mx-4' />

                <ModalBody>
                    <div className="space-y-6">
                        {/* Input Section */}
                        <div className="flex items-end gap-2">
                            <div className="flex-grow">
                                <FormField label="Nome da Categoria">
                                    <TextInput 
                                        className="md:col-span-1" 
                                        placeholder="Ex: Comunidade em Geral"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                                    />
                                </FormField>
                            </div>
                            <button onClick={handleAddCategory} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300">
                                Adicionar
                            </button>
                        </div>
                        
                        {/* Table Section */}
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 w-16">
                                            Índice
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Nome
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.length > 0 ? (
                                        categories.map((category, index) => (
                                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-4 py-4 text-center">
                                                    {index + 1}
                                                </td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {category.name}
                                                </th>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button 
                                                            onClick={() => handleMove(index, -1)} 
                                                            disabled={index === 0}
                                                            className="p-1 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200"
                                                        >
                                                            <ChevronUp className="w-5 h-5" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleMove(index, 1)} 
                                                            disabled={index === categories.length - 1}
                                                            className="p-1 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200"
                                                        >
                                                            <ChevronDown className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                                Nenhuma categoria adicionada.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    {/* Buttons Section */}
                    <div id="buttons-container" className="mt-6">
                        <button onClick={onCloseCategoriasModal} id='modal-white-button'>Cancelar</button>
                        <button onClick={onCloseCategoriasModal} id='modal-purple-button'>Salvar</button>
                    </div>
                </ModalBody>

            </Modal>
        </>
    );
};