import { Modal, ModalBody } from "flowbite-react";
import React from "react";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import { Eye, Lock, User } from "lucide-react";
import { FormField, TextInput, Checkbox, MultiSelectTags } from '@/Components/Global/ui/modals';
import { useState } from "react";
import ModalTabs from "../../Tabs/ModalTabs";
import "./UserProfileModals.css";
import { formatCPF } from "@/Utils/formatters";

const UserShowProfileModal = ({user}) => {
    const [activeTab, setActiveTab] = useState('Informações Pessoais');
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }
    const tabs = [
        'Informações Pessoais', 
        'Acesso ao Sistema'
    ];

    return (<>
        <button onClick={() => setOpenModal(true)} id="acoes-icons">
            <Eye id='show-btn' />
        </button>
        <Modal id="modal-show-profile-user" show={openModal} onClose={onCloseModal} popup>

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
                                </div>
                            </div>
                            {/* Form */}
                            <p id="form-title">Informações Pessoais</p>
                            <div id="form-body">
                                <div className="mx-4 rows-2-input">
                                    <FormField label="Nome Completo">
                                        <TextInput readOnly={true} className="md:col-span-1" value={user?.nome || "Nome não disponível"} />
                                    </FormField>
                                    <FormField label="E-mail">
                                        <TextInput readOnly={true} className="md:col-span-2" value={user?.email || "Email não disponível"} />
                                    </FormField>
                                </div>
                                <div className="mx-4 rows-2-input">
                                    <FormField label="CPF">
                                        <TextInput readOnly={true} className="md:col-span-1" value={formatCPF(user?.cpf) || "CPF não disponível"} />
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
                                        <MultiSelectTags listEditais={['Edital 1', 'Edital 2']} readOnly={true}/>
                                    </FormField>
                                </div>
                                <div className="mx-4">
                                    <FormField label="Acesso de Moderador em" className="md:col-span-3">
                                        <MultiSelectTags listEditais={['Edital 3']}  readOnly={true}/>
                                    </FormField>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mr-4" id="buttons-container">
                    <button onClick={onCloseModal} id='modal-purple-button'>Sair</button>
                </div>
            </ModalBody>

        </Modal>
    </>);
}

export default UserShowProfileModal;