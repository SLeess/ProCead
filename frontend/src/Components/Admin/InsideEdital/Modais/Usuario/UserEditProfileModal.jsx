import { Modal, ModalBody } from "flowbite-react";
import React from "react";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import { Lock, Pencil, User } from "lucide-react";
import { FormField, TextInput, Checkbox, MultiSelectTags } from '@/Components/Global/ui/modals';
import { useState } from "react";
import ModalTabs from "../../Tabs/ModalTabs";
import "./UserProfileModals.css";
import { formatCPF, maskCPF } from "@/Utils/formatters";
import { toast } from "react-toastify";
import z from "zod/v4";
import { useAppContext } from "@/Contexts/AppContext";
import Swal from "sweetalert2";
import { editUserSchema } from "./userEditSchema";

const UserEditProfileModal = ({user}) => {
    const { apiAsyncFetch } = useAppContext();
    const [activeTab, setActiveTab] = useState('Informações Pessoais');
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [personalInfoData, setPersonalInfoData] = useState(() => ({
        "nome": user.nome, 
        "email": user.email, 
        "cpf": maskCPF(user.cpf)
    }));

    const [passwordData, setPasswordData] = useState({
        password: '',
        confirm_password: '',
    });
    
    const updateAttr = (e) => {
        const attr = e.target.name;
        
        var finalValue = e.target.value;
        if(
            attr === 'cpf' ||
            attr === 'email' ||
            attr === 'nome'
        ){
            if (attr === 'cpf') {
                finalValue = maskCPF(e.target.value);
            }
            setPersonalInfoData(f => ({...f, [attr]: finalValue}));
        } else{
            setPasswordData(f => ({...f, [attr]: finalValue}));
        }
        
    };

    function onCloseModal() {
        setOpenModal(false);
        setPasswordData({password: '',confirm_password: '',});
        setPersonalInfoData({"nome": user.nome, "email": user.email, "cpf": maskCPF(user.cpf)});
    }
    const tabs = [
        'Informações Pessoais', 
        'Alterar Senha', 
        'Acesso ao Sistema'
    ];

    const handleNext = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
        }
    };

    function confirmSubmit(e){
        if(loading == true) 
            return;
        e.preventDefault();

        Swal.fire({
            title: 'Deseja prosseguir com a alteração de dados do usuário?',
            text: "Essa ação poderá ser reversível a partir da re-alteração do registro posteriormente!",
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
            const validatedData = editUserSchema.safeParse({...personalInfoData,...passwordData, 'uuid': user?.uuid});

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
                url: `/api/super-admin/users/${validatedData.data.uuid}`,
                method: 'PATCH',
                body: validatedData.data,
            });
            toast.success((response.message ||  "Dados do usuário foram atualizados com sucesso!"));
            onCloseModal();
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <button onClick={() => setOpenModal(true)} id="acoes-icons">
                <Pencil id='edit-btn' />
            </button>
            <Modal id="modal-edit-profile-user" show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Dados do Usuário"}/>

                <hr className='mb-3 mx-4'/>

                <ModalBody className={`px-0 flex flex-col justify-between`}>

                    <div>
                        <div className="mx-4">
                            <ModalTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
                        </div>
                        {activeTab === 'Informações Pessoais' && (
                            <div>
                                {/* Identificação */}
                                <div id="informations-user">
                                    <div id="photo-user">
                                        <User width={72} height={72} color="#6c4bc3" />
                                    </div>
                                    <div id="info-user">
                                        <p id="email-user">{user?.email || "Email não disponível"}</p>
                                        {
                                            user?.last_acess_at !== null &&
                                            <p id="last-access-user">Último acesso em {user?.last_acess_at}.</p>
                                        }
                                        {
                                            user?.last_acess_at === null &&
                                            <p id="last-access-user">Último acesso não registrado.</p>
                                        }
                                        <button id="change-pass" onClick={handleNext}>
                                            <Lock id="lock-icon"/>
                                            <p id="change-pass-text">Alterar Senha</p>
                                        </button>
                                    </div>
                                </div>
                                {/* Form */}
                                <p id="form-title">Informações Pessoais</p>
                                <div id="form-body">
                                    <div className="mx-4 rows-2-input">
                                        <FormField label="Nome Completo">
                                            <TextInput name={"nome"} className="md:col-span-1" value={personalInfoData.nome} onChange={updateAttr}/>
                                        </FormField>
                                        <FormField label="E-mail">
                                            <TextInput name={"email"} className="md:col-span-2" value={personalInfoData.email} onChange={updateAttr}/>
                                        </FormField>
                                    </div>
                                    <div className="mx-4 rows-2-input">
                                        <FormField label="CPF">
                                            <TextInput name={"cpf"} className="md:col-span-1" value={personalInfoData.cpf} onChange={updateAttr} placeholder="000.000.000-00" maxLength={14}/>
                                        </FormField>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'Alterar Senha' && (
                            <div>
                                <div id="form-body">
                                    <p id="form-subtitle">Alterar Senha</p>
                                    <div className="mx-4 rows-2-input sm:grid-cols-2">
                                        <FormField label="Nova Senha" className="sm:col-span-1 md:mr-5" >
                                            <TextInput name="password" type={"password"} value={passwordData.password} onChange={updateAttr}/>
                                        </FormField>
                                        <FormField label="Confirmar Senha" className="sm:col-span-1 md:ml-5" >
                                            <TextInput name="confirm_password" type={"password"} value={passwordData.confirm_password} onChange={updateAttr}/>
                                        </FormField>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'Acesso ao Sistema' && (
                            <div>
                                <p id="form-title">Nível de acesso ao sistema</p>
                                <div id="form-body">
                                    <div className="mx-4 rows-2-input">
                                        <FormField label="Nível de Acesso">
                                            <TextInput readOnly={true} value={user?.level_access || ""} />
                                        </FormField>
                                        <FormField label="UUID">
                                            <TextInput readOnly={true} value={user?.uuid || ""} />
                                        </FormField>
                                    </div>
                                    <div className="mx-4">
                                        <FormField label="Inscrito em" className="md:col-span-3">
                                            <MultiSelectTags readOnly={true} listEditais={['Edital 1', 'Edital 2']}/>
                                        </FormField>
                                    </div>
                                    <div className="mx-4">
                                        <FormField label="Acesso de Moderador em" className="md:col-span-3">
                                            <MultiSelectTags listEditais={['Edital 3']} />
                                        </FormField>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mr-4" id="buttons-container">
                        <button onClick={onCloseModal} id='modal-white-button'>Cancelar</button>
                        <button onClick={confirmSubmit} id='modal-purple-button'>Salvar</button>
                    </div>
                </ModalBody>

            </Modal>
        </>
    );
}

export default UserEditProfileModal;