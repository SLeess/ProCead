import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, SelectInput, TextInput } from '@/Components/Global/ui/modals';
import { useAppContext } from '@/Contexts/AppContext';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Pencil } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify';

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

    async function handleOnSubmit() 
    {
        try {
            const res = await fetch(`/api/super-admin/roles/${role.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                method: 'POST',
                body: JSON.stringify({...role, _method: "PUT"})
            });

            console.log(JSON.stringify({...role, _method: "PUT"}));


            if (!res.ok) {
                if (res.errors) {
                    Object(res.errors).forEach((er) => toast.error(er));
                } else{
                    verifyStatusRequest(res);
                }
                throw new Error(`Erro ao atualizar os dados: ${res.status} ${res.statusText}`);
            } else {
                const result = await res.json();

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
            <button onClick={() => setOpenModal(true)} className="p-1 hover:bg-gray-200 rounded-full">
                <Pencil className="h-5 w-5 text-yellow-500" />
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
                            onClick={handleOnSubmit}
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