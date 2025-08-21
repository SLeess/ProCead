import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, SelectInput, TextInput } from '@/Components/Global/ui/modals';
import { useAppContext } from '@/Contexts/AppContext';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Pencil, Trash } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import { perfilEditSchema } from './perfilEditSchema';
import z from 'zod/v4';
import Swal from 'sweetalert2';

const PerfilEditModal = ({perfil = {name: "", scope: "", id: ""}}) => {
    const { token, verifyStatusRequest } = useAppContext();
    const [openModal, setOpenModal] = useState(false);
    const [role, setRole] = useState(perfil);

    const selectedScopeLabel = useMemo(() => {
        if (role.scope === 'local') {
            return 'Perfil Local';
        }
        if (role.scope === 'global') {
            return 'Perfil Global';
        }
        return '';
    }, [role.scope]);
    
    const handleScopeChange = (e) => {
        const selectedLabel = e.target.value;
        const newScopeValue = selectedLabel === 'Perfil Local' ? 'local' : 'global';
        setRole((prevRole) => ({ ...prevRole, scope: newScopeValue }));
    };
    const handleNameChange = (e) => {
        const name = e.target.value;
        setRole((prev) => ({...prev, name: name}));
    }

    function onCloseModal() {
        setOpenModal(false);
    }

    function confirmSubmit(){
        Swal.fire({
            title: 'Deseja prosseguir com a alteração dos dados?',
            text: "Essa ação não poderá ser reversível!",
            // type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Prosseguir com as alterações!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                handleOnSubmit();
            }
        });
    }
    async function handleOnSubmit() 
    {
        try {

            const validation = perfilEditSchema.safeParse({ ...role });
                    
            if (!validation.success) {
                const formattedErrors = z.treeifyError(validation.error);
                
                Object.values(formattedErrors.properties).forEach(fieldErrors => {
                    if(fieldErrors.errors) {
                        fieldErrors.errors.forEach(err => toast.error(err));
                    }
                });
    
                return;
            }

            const res = await fetch(`/api/super-admin/roles/${role.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                method: 'POST',
                body: JSON.stringify({...role, _method: "PUT"})
            });

            const result = await res.json();
            
            if (!res.ok) {
                if (result.errors) {
                    Object.values(result.errors).forEach(
                        (er) => Object.values(er).forEach(
                                    (e) => toast.error(e)
                                )
                    );
                } else{
                    verifyStatusRequest(res);
                }
                throw new Error(`Erro ao atualizar os dados: ${res.status} ${res.statusText}`);
            } else {
                onCloseModal();
                toast.success(result.message);
                window.location.reload();
            }
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <>
            <button onClick={() => setOpenModal(true)} id="acoes-icons">
                <Pencil id='edit-btn' />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                <CabecalhoModal titleModal = {"Editar Perfil"}/>

                    <hr className='mb-3 mx-4'/>
                <ModalBody >

                    {/* Sub-header */}
                    {/* <p id='subtitle-edital'>
                        Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                    </p> */}
                    <div>
                        <div id='rows-2-input'>
                            <FormField label="Nome do Perfil">
                                <TextInput value={perfil.name} onChange={handleNameChange} className="md:col-span-1" placeholder="Ex: controle-acadêmico" />
                            </FormField>
                            <FormField label="Escopo">
                                <SelectInput
                                    value={selectedScopeLabel}
                                    onChange={handleScopeChange}
                                    options={['Perfil Local', 'Perfil Global']}
                                />
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

export default PerfilEditModal