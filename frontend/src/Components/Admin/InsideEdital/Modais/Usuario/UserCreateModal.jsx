import { FormField, TextInput, Checkbox, SelectInput } from '@/Components/Global/ui/modals';
import { useAppContext } from '@/Contexts/AppContext';
import { maskCPF } from '@/Utils/formatters';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import z from 'zod/v4';
import { userCreateSchema } from './userCreateSchema';
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';

const UserCreateModal = () => {
    const { apiAsyncFetch } = useAppContext();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        cpf: '',
    });

    const updateAttr = (e) => {
        const attr = e.target.name;
        
        var finalValue = e.target.value;

        if (attr === 'cpf') {
            finalValue = maskCPF(e.target.value);
        }
        
        setFormData(f => ({...f, [attr]: finalValue}));

        // setErrors(er => {
        //     const {[attr]: _, ...remainErrors} = er;
        //     return remainErrors;
        // });
    };
    function onCloseModal() {
        setOpenModal(false);
    }

    function confirmSubmit(e){
        if(loading == true) 
            return;
        e.preventDefault();

        Swal.fire({
            title: 'Deseja prosseguir com o cadastro do usuário?',
            text: "Essa ação poderá ser reversível a partir da exclusão do registro posteriormente!",
            // type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Prosseguir com as alterações!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                handleRegister();
            }
        });
    }
    async function handleRegister() 
    {
        setLoading(true);

        try {
            const validatedData = userCreateSchema.safeParse(formData);
            if (!validatedData.success) {
                const formattedErrors = z.treeifyError(validatedData.error);
                                        
                Object.values(formattedErrors.properties).forEach(fieldErrors => {
                    if(fieldErrors.errors) {
                        fieldErrors.errors.forEach(err => toast.error(err));
                    }
                });
                return;
            }

            const response = await apiAsyncFetch({
                url: `/api/super-admin/users/register`,
                method: 'post',
                body: validatedData.data,
            });
            
            toast.success((response.message ||  "Registrado com sucesso!"));
            setFormData({email: '', cpf: '', nome: ''});
            setOpenModal(false);
        } catch (error) {
            toast.error(error.toString());
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <button onClick={() => setOpenModal(true)} className="px-4 py-2.5 text-sm cursor-pointer font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="inline" />
                <span className='ml-1'>Cadastrar Usuário</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                {
                    loading && <LoaderPages></LoaderPages>
                }
                <ModalHeader />
                <ModalBody >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Cadastrar Usuário</h1>

                    </div>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                            <FormField label="Nome Completo">
                                <TextInput name='nome' className="md:col-span-1" onChange={updateAttr} value={formData.nome} placeholder="João da Silva" />
                            </FormField>
                            <FormField label="CPF">
                                <TextInput name='cpf' className="md:col-span-1" onChange={updateAttr} value={formData.cpf} placeholder="000.000.000-00" />
                            </FormField>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                            <FormField label="E-mail">
                                <TextInput name='email' className="md:col-span-2" onChange={updateAttr} value={formData.email} placeholder="joao.silva@edu.unimontes.br" />
                            </FormField>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div id="buttons-container">
                        <button
                            onClick={onCloseModal}
                            id='modal-white-button'
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={confirmSubmit}
                            id='modal-purple-button'
                        >
                            Salvar
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default UserCreateModal