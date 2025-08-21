

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import "./InscricaoModal.css";
import ModalTabs from "../../Tabs/ModalTabs";

export default function InscricaoEditModal() {
    const [openModal, setOpenModal] = useState(false);
    const [activeTab, setActiveTab] = useState('Informações Básicas');
    const tabs = ['Informações Básicas', 'Endereço', 'Vaga', 'Anexos e Situação'];

    const handleNext = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
        }
    };

    const handleBack = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1]);
        }
    };



    function onCloseModal() {
        setOpenModal(false);
    }

    return (
        <>
            <button onClick={() => setOpenModal(true)} id="acoes-icons">
                <Pencil id='edit-btn' />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Editar e/ou Avaliar Inscrição"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >

                    <div id="inscricao-data-e-status-div">
                        <p id="date-inscricao">Data de Inscrição: 04/07/2025</p>
                        <span id="inscricao-status-text">Deferido</span>
                    </div>

                    {/* Tabs Navigation */}
                    <ModalTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>

                    {/* Form Content - Only showing the active tab's content */}
                    {activeTab === 'Informações Básicas' && (
                        <div>
                            <div id='rows-3-input'>
                                {/* Row 1 */}
                                <FormField label="Nome Completo">
                                    <TextInput value="Daniel Damasceno Meira" />
                                </FormField>
                                <FormField label="CPF">
                                    <TextInput value="000.000.000-00" />
                                </FormField>
                                <FormField label="Data de Nascimento">
                                    <TextInput value="05/10/2004" />
                                </FormField>

                                {/* Row 2 */}
                                <FormField label="E-mail">
                                    <TextInput value="dandamasceno04@gmail.com" />
                                </FormField>
                                <FormField label="Estado Civil">
                                    <SelectInput value="Solteiro" options={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']} />
                                </FormField>
                                <FormField label="Gênero">
                                    <SelectInput value="Masculino" options={['Masculino', 'Feminino', 'Outro']} />
                                </FormField>

                                {/* Row 3 */}
                                <FormField label="Identidade de Gênero">
                                    <SelectInput value="Transgênero" options={['Cisgênero', 'Transgênero', 'Não-binário']} />
                                </FormField>
                                <FormField label="Nome Social" className="md:col-span-2">
                                    <TextInput value="Danielly Vitória Damasceno Meira" />
                                </FormField>

                                {/* Row 4 */}
                                <FormField label="RG">
                                    <TextInput value="MG-00.000.000" />
                                </FormField>
                                <FormField label="Telefone">
                                    <TextInput value="38999999999" />
                                </FormField>
                                <FormField label="Naturalidade">
                                    <TextInput value="Montes Claros" />
                                </FormField>

                                {/* Row 5 */}
                                <FormField label="Nacionalidade">
                                    <TextInput value="Brasileira" />
                                </FormField>
                                <FormField label="UF">
                                    <SelectInput value="MG" options={['MG', 'SP', 'RJ', 'BA']} />
                                </FormField>
                            </div>

                            {/* Action Buttons */}
                            <div id="buttons-container">
                                <button onClick={onCloseModal} id='modal-white-button'>
                                    Cancelar
                                </button>
                                <button onClick={handleNext} id='modal-purple-button'>
                                    Próximo: Endereço
                                </button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'Endereço' && (
                        <div>
                            <div id='rows-3-input'>
                                <FormField label="CEP"><TextInput value="39401-001" /></FormField>
                                <FormField label="Rua"><TextInput value="Daniel Damasceno Meira" /></FormField>
                                <FormField label="Número"><TextInput value="1012" /></FormField>
                                <FormField label="Complemento"><TextInput value="Bloco C, Ap. 701" /></FormField>
                                <FormField label="Bairro"><TextInput value="Morada do Parque" /></FormField>
                                <FormField label="UF"><SelectInput value="MG" options={['MG', 'SP', 'RJ', 'BA']} /></FormField>
                                <FormField label="Cidade" className="md:col-span-3"><TextInput value="São João da Ponte" /></FormField>
                            </div>
                            <div id="buttons-container">
                                <button onClick={handleBack} id='modal-white-button'>Voltar</button>
                                <button onClick={handleNext} id='modal-purple-button'>Próximo: Vaga</button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'Vaga' && (
                        <div>
                            <div id="inscricao-vaga-content">
                                <div id="inscricao-vaga-container">
                                    <h3 id="inscricao-vaga-title">Lato Sensu em Alfabetização e Multiletramentos</h3>
                                    <p id='subtitle-edital'>Montes Claros | MG</p>
                                    <div className="space-y-4">
                                        <TextInput value="Modalidade 3: Negros e Pardos" />
                                        <TextInput value="Categoria 3: Comunidade em Geral" />
                                    </div>
                                </div>
                            </div>
                            <div id="buttons-container">
                                <button onClick={handleBack} id='modal-white-button'>Voltar</button>
                                <button onClick={handleNext} id='modal-purple-button'>Próximo: Anexos</button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'Anexos e Situação' && (
                        <div>
                            <h2 id="inscricao-documentos-title">Anexos</h2>
                            <div id="inscricao-documentos-grid">
                                <AnexoButton label="Identidade:" />
                                <AnexoButton label="Comprovante:" />
                                <AnexoButton label="Histórico:" />
                                <AnexoButton label="Auto Declaração:" />
                            </div>

                            <h2 id="inscricao-situacao-title">Situação</h2>
                            <div id='rows-3-input'>
                                <FormField label="Status" className="md:col-span-1">
                                    <SelectInput value="Deferido" options={['Deferido', 'Indeferido', 'Em Análise']} />
                                </FormField>
                                <FormField label="Observações" className="md:col-span-3">
                                    <textarea
                                        rows="4"
                                        id="inscricao-observacoes-textarea"
                                        defaultValue="Informamos que a inscrição de Vossa Senhoria no presente processo seletivo foi indeferida em razão do não atendimento aos requisitos formais estabelecidos no edital, especificamente pela ausência da documentação comprobatória exigida para a função pretendida, inviabilizando a devida análise e homologação da candidatura."
                                    />
                                </FormField>
                            </div>

                            <div id="buttons-container">
                                <button onClick={handleBack} id='modal-white-button'>Voltar</button>
                                <button onClickCapture={onCloseModal} id='modal-purple-button'>Salvar</button>
                            </div>
                        </div>
                    )}

                </ModalBody>
            </Modal>
        </>
    );
}
