import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import { useAppContext } from '@/Contexts/AppContext';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Trash, TriangleAlert } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const ModalidadeDeleteModal = ({ modalidade, setNeedUpdate }) => {

    const [openModal, setOpenModal] = useState(false);
    const { token } = useAppContext();
    const [loading, setLoading] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/modalidades/${modalidade.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const result = await res.json().catch(() => ({}));
                toast.error(result.message || 'Erro ao deletar modalidade.');
                return;
            }

            toast.success("Modalidade deletado com sucesso!");
            if (setNeedUpdate) {
                setNeedUpdate(prev => !prev);
            }
            onCloseModal();

        } catch (error) {
            toast.error('Erro ao conectar com o servidor. ' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={() => setOpenModal(true)} id="acoes-icons">
                <Trash id='delete-btn' />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                {loading && <LoaderPages/>}
                <ModalHeader />
                <ModalBody >
                    <div className="flex items-center justify-center p-4 font-sans">
                        <div className=" relative text-center">
                            <div className="mb-4">
                                <TriangleAlert className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Atenção!</h2>
                            <p className="text-gray-600 mb-8">
                                Tem certeza que deseja deletar a modalidade?
                            </p>
                            <div className="flex justify-center items-center space-x-4">
                                <button
                                    onClick={onCloseModal}
                                    className="px-8 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-8 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    {loading ? 'Deletando...' : 'Deletar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

        </>
    );
}

export default ModalidadeDeleteModal