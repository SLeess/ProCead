import { Modal, ModalBody } from "flowbite-react";
import React from "react";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import { Lock, User } from "lucide-react";
import { FormField, TextInput, Checkbox } from '@/Components/Global/ui/modals';
import { useState } from "react";
import ModalTabs from "../../Tabs/ModalTabs";
import "./AdminProfileModal.css";

const AdminProfileModal = ({openModal, onCloseModal, user}) => {
    const [activeTab, setActiveTab] = useState('Informações Pessoais');
    const tabs = ['Informações Pessoais', 'Alterar Senha'];
    console.log(user);

    const handleNext = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
        }
    };

    return (
        <>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Perfil do Usuário"}/>

                <hr className='mb-3 mx-4'/>

                <ModalBody className={`px-0`}>

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
                                    <p id="last-access-user">Último acesso há x minutos</p>
                                    <button id="change-pass" onClick={handleNext}>
                                        <Lock id="lock-icon"/>
                                        <p id="change-pass-text">Alterar Senha</p>
                                    </button>
                                </div>
                            </div>

                            {/* Form */}
                            <p id="form-title">Informações Pessoais</p>
                            <div id="form-body">
                                <div id="rows-2-input" className="mx-4">
                                    <FormField label="Nome Completo">
                                        <TextInput className="md:col-span-1" value={user?.nome || "Nome não disponível"} />
                                    </FormField>
                                    <FormField label="E-mail">
                                        <TextInput className="md:col-span-2" value={user?.email || "Email não disponível"} />
                                    </FormField>
                                </div>

                                <div id="rows-2-input" className="mx-4">
                                    <FormField label="CPF">
                                        <TextInput className="md:col-span-1" value={user?.cpf || "CPF não disponível"} />
                                    </FormField>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Alterar Senha' && (
                        <div>
                            <p id="form-title">Alterar Senha</p>
                            <div id="form-body">
                                <div id="rows-2-input" className="mx-4">
                                    <FormField label="E-mail">
                                        <TextInput readOnly={true} value={user?.email || "Email não disponível"} />
                                    </FormField>
                                    <FormField label="Senha Antiga">
                                        {/* Adicionar type password */}
                                        <TextInput readOnly={true} type="password" value="senha" />
                                    </FormField>
                                </div>

                                <div id="rows-2-input" className="mx-4">
                                    <FormField label="Nova Senha">
                                        <TextInput type="password" className="md:col-span-1" />
                                    </FormField>
                                </div>

                                <div id="rows-2-input" className="mx-4">
                                    <FormField label="Confirmar Senha">
                                        <TextInput type="password" className="md:col-span-1" />
                                    </FormField>
                                </div>
                            </div>
                        </div>
                    )}

                    

                    {/* Action Buttons */}
                    <div className="mr-4" id="buttons-container">
                        <button onClick={onCloseModal} id='modal-white-button'>Cancelar</button>
                        <button onClick={onCloseModal} id='modal-purple-button'>Salvar</button>
                    </div>
                </ModalBody>

            </Modal>
        </>
    );
}

export default AdminProfileModal;