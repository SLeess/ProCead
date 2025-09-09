import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import "./InscricaoModal.css";
import ModalTabs from "../../Tabs/ModalTabs";

export default function InscricaoEditModal({ inscricao }) {
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
                {openModal && inscricao && (
                    <>
                        <CabecalhoModal titleModal={"Editar e/ou Avaliar Inscrição"} />

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
                                            <TextInput defaultValue={inscricao.nome_completo} />
                                        </FormField>
                                        <FormField label="Nº de Inscrição" className="col-span-1">
                                            <TextInput defaultValue={inscricao.n_inscricao} />
                                        </FormField>
                                        <FormField label="CPF">
                                            <TextInput defaultValue={inscricao.cpf} />
                                        </FormField>
                                        <FormField label="RG">
                                            <TextInput defaultValue={inscricao.identidade} />
                                        </FormField>
                                        <FormField label="Data de Nascimento">
                                            <TextInput defaultValue={new Date(inscricao.data_nascimento).toLocaleDateString()} />
                                        </FormField>

                                        {/* Row 2 */}
                                        <FormField label="E-mail" className="md:col-span-2">
                                            <TextInput defaultValue={inscricao.email} />
                                        </FormField>
                                        <FormField label="Telefone">
                                            <TextInput defaultValue={inscricao.telefone} />
                                        </FormField>
                                        <FormField label="Estado Civil">
                                            <SelectInput defaultValue={inscricao.estado_civil} options={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']} />
                                        </FormField>
                                        <FormField label="Gênero">
                                            <SelectInput defaultValue={inscricao.genero} options={['Masculino', 'Feminino', 'Outro']} />
                                        </FormField>

                                        {/* Row 3 */}
                                        <FormField label="Identidade de Gênero">
                                            <SelectInput defaultValue={inscricao.identidade_genero} options={['Cisgênero', 'Transgênero', 'Não-binário']} />
                                        </FormField>
                                        <FormField label="Nome Social" className="md:col-span-2">
                                            <TextInput defaultValue={inscricao.nome_social} />
                                        </FormField>

                                        {/* Row 4 */}


                                        <FormField label="Naturalidade">
                                            <TextInput defaultValue={inscricao.naturalidade} />
                                        </FormField>

                                        /* Row 5 */}
                                        <FormField label="Nacionalidade">
                                            <TextInput defaultValue={inscricao.nacionalidade} />
                                        </FormField>
                                        <FormField label="UF">
                                            <SelectInput
                                                defaultValue={inscricao.uf_naturalidade}
                                                options={[
                                                    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
                                                    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
                                                    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
                                                ]}
                                            />
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
                                        <FormField label="CEP"><TextInput defaultValue={inscricao.cep} /></FormField>
                                        <FormField label="Rua"><TextInput defaultValue={inscricao.rua} /></FormField>
                                        <FormField label="Número"><TextInput defaultValue={inscricao.numero} /></FormField>
                                        <FormField label="Complemento"><TextInput defaultValue={inscricao.complemento} /></FormField>
                                        <FormField label="Bairro"><TextInput defaultValue={inscricao.bairro} /></FormField>
                                        <FormField label="UF"><SelectInput defaultValue={inscricao.uf} options={[
                                            'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
                                            'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
                                            'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
                                        ]} /></FormField>
                                        <FormField label="Cidade" className="md:col-span-3"><TextInput defaultValue={inscricao.cidade} /></FormField>
                                    </div>
                                    <div id="buttons-container">
                                        <button onClick={handleBack} id='modal-white-button'>Voltar</button>
                                        <button onClick={handleNext} id='modal-purple-button'>Próximo: Vaga</button>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'Vaga' && (
                                <div>
                                    <div className="space-y-4">
                                        {inscricao.vagas.map((vaga, index) => (
                                            <div key={index} id="inscricao-vaga-content">
                                                <div id="inscricao-vaga-container">
                                                    <h3 id="inscricao-vaga-title">{vaga.nome}</h3>
                                                    <p id='subtitle-edital'>{vaga.polo}</p>
                                                    <div className="space-y-4">
                                                        <TextInput defaultValue={"Modalidade: " + vaga.modalidade} />
                                                        <TextInput defaultValue={"Categoria: " + vaga.categoria} />
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
                                            <SelectInput defaultValue={inscricao.status} options={['Deferido', 'Indeferido', 'Em análise']} />
                                        </FormField>
                                        <FormField label="Observações" className="md:col-span-3">
                                            <textarea
                                                rows="4"
                                                id="inscricao-observacoes-textarea"
                                                defaultValue={inscricao.motivo}
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
                    </>
                )}
            </Modal>
        </>
    );
}