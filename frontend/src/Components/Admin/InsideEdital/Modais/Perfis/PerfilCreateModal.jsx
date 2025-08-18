import CabecalhoModal from '@/Components/Global/Modais/CabecalhoModal';
import { FormField, TextInput, Checkbox, SelectInput } from '@/Components/Global/ui/modals';
import { useAppContext } from '@/Contexts/AppContext';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { Plus } from 'lucide-react';
import React, { useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import z from 'zod/v4';
import { perfilCreateSchema } from './perfilCreateSchema';

const PerfilCreateModal = ({enableGlobal = true}) => {
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }

    const { apiAsyncFetch } = useAppContext();
    const [role, setRole] = useState({
        name: "",
        scope: "",
    });

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
        setRole((prev) => ({ ...prev, scope: newScopeValue }));
    };
    const handleNameChange = (e) => {
        const name = e.target.value;
        setRole((prev) => ({...prev, name: name}));
    }


    async function handleOnSubmit() 
    {
        try {
            const validation = perfilCreateSchema.safeParse({ ...role });
                                
            if (!validation.success) {
                const formattedErrors = z.treeifyError(validation.error);
                Object.values(formattedErrors.properties).forEach(fieldErrors => {
                    if(fieldErrors.errors) {
                        fieldErrors.errors.forEach(err => toast.error(err));
                    }
                });
    
                return;
            }
            
            const result = await apiAsyncFetch(
                'POST', 
                `/api/super-admin/roles`, 
                role,
            );

            onCloseModal();
            toast.success(result.message);
            window.location.reload();
        } catch (error) {
            toast.error(error);
        }
    }
    return (
        <>
            <button onClick={() => setOpenModal(true)} className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)] focus:outline-none cursor-pointer">
                <Plus className="inline" />
                <span className='ml-1'>Cadastrar Perfil</span>
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Criar Perfil"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >

                    {/* Sub-header */}
                    {
                        !enableGlobal &&
                        <p id='subtitle-edital'>
                            Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025
                        </p>
                    }
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                            <FormField label="Nome do Perfil">
                                <TextInput value={role.name} onChange={handleNameChange} className="md:col-span-1" placeholder="Ex: controle-acadêmico" />
                            </FormField>
                            <FormField label="Tipo">
                                <SelectInput 
                                    className="md:col-span-2" 
                                    defaultOption={true}
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

export default PerfilCreateModal