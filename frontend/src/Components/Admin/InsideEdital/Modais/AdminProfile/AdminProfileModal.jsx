import { Modal, ModalBody } from "flowbite-react";
import React from "react";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import { Lock, User } from "lucide-react";
import { FormField, TextInput, Checkbox } from '@/Components/Global/ui/modals';
import "./AdminProfileModal.css";

const AdminProfileModal = ({openModal, onCloseModal}) => {
    return (
        <>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Perfil do Usuário"}/>

                <hr className='mb-3 mx-4'/>

                <ModalBody className={`px-0`}>
                    {/* Identificação */}
                    <div id="informations-user">
                        <div id="photo-user">
                            <User width={80} height={80} color="#6c4bc3" />
                        </div>
                        <div id="info-user">
                            <p id="email-user">exemploemail@gmail.com</p>
                            <p id="last-access-user">Último acesso há x minutos</p>
                            <div id="change-pass">
                                <Lock id="lock-icon"/>
                                <p id="change-pass-text">Alterar Senha</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <p id="form-title">Informações Pessoais</p>
                    <div id="form-body">
                        <div id="rows-2-input" className="mx-4">
                            <FormField label="Nome Completo">
                                <TextInput className="md:col-span-1" value="Fulano de Tal" />
                            </FormField>
                            <FormField label="E-mail">
                                <TextInput className="md:col-span-2" value="exemplo@gmail.com" />
                            </FormField>
                        </div>

                        <div id="rows-2-input" className="mx-4">
                            <FormField label="Telefone">
                                <TextInput className="md:col-span-1" value="(38) 9 9999-9999" />
                            </FormField>
                            <FormField label="Tipo">
                                <TextInput className="md:col-span-2" value="Administrador" />
                            </FormField>
                        </div>
                    </div>

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