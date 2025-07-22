import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Trash, TriangleAlert } from 'lucide-react';
import React, { useState } from 'react'

const CursoDeleteModal = () => {

    const [isOpen, setIsOpen] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }
    if (!isOpen) return null;

    return (
        <>
            <button onClick={() => setOpenModal(true)} className="p-1 hover:bg-gray-200 rounded-full">
                <Trash className="h-5 w-5 text-red-500" />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                <ModalHeader />
                <ModalBody >
                    <div className="flex items-center justify-center p-4 font-sans">
                        <div className=" relative text-center">
                            <div className="mb-4">
                                <TriangleAlert className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Atenção!</h2>
                            <p className="text-gray-600 mb-8">
                                Tem certeza que deseja deletar o curso?
                            </p>
                            <div className="flex justify-center items-center space-x-4">
                                <button
                                    onClick={onCloseModal}
                                    className="px-8 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={onCloseModal}
                                    className="px-8 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

        </>
    );
}

export default CursoDeleteModal