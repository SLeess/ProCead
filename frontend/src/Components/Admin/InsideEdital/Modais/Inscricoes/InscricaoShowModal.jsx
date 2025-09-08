import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, } from "flowbite-react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import "./InscricaoModal.css"
import ModalTabs from "../../Tabs/ModalTabs";

export default function InscricaoShowModal({ inscricao }) {
    const [openModal, setOpenModal] = useState(false);
    const [activeTab, setActiveTab] = useState('Informações Básicas');
    const tabs = ['Informações Básicas', 'Endereço', 'Vagas', 'Anexos e Situação'];
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
                <Eye id='show-btn' />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                {openModal && inscricao && (
                    <>
                        <CabecalhoModal titleModal={"Visualizar Inscrição"} />

                        <hr className='mb-3 mx-4' />

                        <ModalBody >

                            <div id="inscricao-data-e-status-div">
                                <p id="date-inscricao">Data de Inscrição: {new Date(inscricao.created_at).toLocaleDateString()}</p>
                                <span id="inscricao-status-text">{inscricao.status}</span>
                            </div>

                            {/* Tabs Navigation */}
                            <ModalTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                            {/* Form Content - Only showing the active tab's content */}
                            {activeTab === 'Informações Básicas' && (
                                <div>
                                    <div id='rows-3-input'>

                                        {/* Row 1 */}
                                        <FormField label="Nome Completo" className="col-span-2">
                                            <TextInput readOnly={true} value={inscricao.nome_completo} />
                                        </FormField>
                                        <FormField label="Nº de Inscrição" className="col-span-1">
                                            <TextInput readOnly={true} value={inscricao.n_inscricao} />
                                        </FormField>
                                        <FormField label="CPF">
                                            <TextInput readOnly={true} value={inscricao.cpf} />
                                        </FormField>
                                        <FormField label="RG">
                                            <TextInput readOnly={true} value={inscricao.identidade} />
                                        </FormField>
                                        <FormField label="Data de Nascimento">
                                            <TextInput readOnly={true} value={new Date(inscricao.data_nascimento).toLocaleDateString()} />
                                        </FormField>

                                        {/* Row 2 */}
                                        <FormField label="E-mail" className="md:col-span-2">
                                            <TextInput readOnly={true} value={inscricao.email} />
                                        </FormField>
                                        <FormField label="Telefone">
                                            <TextInput readOnly={true} value={inscricao.telefone} />
                                        </FormField>
                                        <FormField label="Estado Civil">
                                            <SelectInput readOnly={true} value={inscricao.estado_civil} options={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']} />
                                        </FormField>
                                        <FormField label="Gênero">
                                            <SelectInput readOnly={true} value={inscricao.genero} options={['Masculino', 'Feminino', 'Outro']} />
                                        </FormField>

                                        {/* Row 3 */}
                                        <FormField label="Identidade de Gênero">
                                            <SelectInput readOnly={true} value={inscricao.identidade_genero} options={['Cisgênero', 'Transgênero', 'Não-binário']} />
                                        </FormField>
                                        <FormField label="Nome Social" className="md:col-span-2">
                                            <TextInput readOnly={true} value={inscricao.nome_social ?? ''} />
                                        </FormField>

                                        {/* Row 4 */}


                                        <FormField label="Naturalidade">
                                            <TextInput readOnly={true} value={inscricao.naturalidade} />
                                        </FormField>

                                        {/* Row 5 */}
                                        <FormField label="Nacionalidade">
                                            <TextInput readOnly={true} value={inscricao.nacionalidade} />
                                        </FormField>
                                        <FormField label="UF">
                                            <SelectInput readOnly={true} value={inscricao.uf_naturalidade} options={['MG', 'SP', 'RJ', 'BA']} />
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
                                        <FormField label="CEP"><TextInput readOnly={true} value={inscricao.cep} /></FormField>
                                        <FormField label="Rua"><TextInput readOnly={true} value={inscricao.rua} /></FormField>
                                        <FormField label="Número"><TextInput readOnly={true} value={inscricao.numero} /></FormField>
                                        <FormField label="Complemento"><TextInput readOnly={true} value={inscricao.complemento} /></FormField>
                                        <FormField label="Bairro"><TextInput readOnly={true} value={inscricao.bairro} /></FormField>
                                        <FormField label="UF"><SelectInput readOnly={true} value={inscricao.uf} options={['MG', 'SP', 'RJ', 'BA']} /></FormField>
                                        <FormField label="Cidade" className="md:col-span-3"><TextInput readOnly={true} value={inscricao.cidade} /></FormField>
                                    </div>
                                    <div id="buttons-container">
                                        <button onClick={handleBack} id='modal-white-button'>Voltar</button>
                                        <button onClick={handleNext} id='modal-purple-button'>Próximo: Vagas</button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'Vagas' && (
                                <div>
                                    <div className="space-y-4">
                                        {inscricao.vagas.map((vaga, index) => (
                                            <div key={index} id="inscricao-vaga-content">
                                                <div id="inscricao-vaga-container">
                                                    <h3 id="inscricao-vaga-title">{vaga.nome}</h3>
                                                    <p id='subtitle-edital'>{vaga.polo}</p>
                                                    <div className="space-y-4">
                                                        <TextInput readOnly={true} value={"Modalidade: "+vaga.modalidade} />
                                                        <TextInput readOnly={true} value={"Categoria: "+vaga.categoria} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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
                                            <SelectInput readOnly={true} value={inscricao.status} options={['Deferido', 'Indeferido', 'Em análise']} />
                                        </FormField>
                                        <FormField label="Observações" className="md:col-span-3">
                                            <textarea
                                                readOnly
                                                rows="4"
                                                id="inscricao-observacoes-textarea"
                                                value={inscricao.motivo}
                                            />
                                        </FormField>
                                    </div>

                                    <div id="buttons-container">
                                        <button onClick={handleBack} id='modal-white-button'>Voltar</button>
                                        <button onClickCapture={onCloseModal} id='modal-purple-button'>Fechar</button>
                                    </div>
                                </div>
                            )}

                        </ModalBody>
                    </>
                )}
            </Modal>
        </>
    );
}
