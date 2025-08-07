import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, } from "flowbite-react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput} from "@/Components/Global/ui/modals";
import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";

export default function InscricaoShowModal() {
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
            <button onClick={() => setOpenModal(true)} className="p-1 hover:bg-gray-200 rounded-full">
                <Eye className="h-5 w-5 text-blue-500" />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>

                <CabecalhoModal titleModal = {"Visualizar Inscrição"}/>

                    <hr className='mb-3 mx-4'/>

                <ModalBody >

                    <div className="flex justify-between items-center my-1">
                        <p id="date-inscricao">Data de Inscrição: 04/07/2025</p>
                        <span className="ml-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Deferido</span>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="border-b border-gray-200 mb-4">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap pt-4 pb-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Form Content - Only showing the active tab's content */}
                    {activeTab === 'Informações Básicas' && (
                        <div>
                            <div id='rows-3-input'>
                                {/* Row 1 */}
                                <FormField label="Nome Completo" className="md:col-span-1">
                                    <TextInput readOnly={true} value="Daniel Damasceno Meira" />
                                </FormField>
                                <FormField label="CPF">
                                    <TextInput readOnly={true} value="000.000.000-00" />
                                </FormField>
                                <FormField label="Data de Nascimento">
                                    <TextInput readOnly={true} value="05/10/2004" />
                                </FormField>

                                {/* Row 2 */}
                                <FormField label="E-mail" className="md:col-span-1">
                                    <TextInput readOnly={true} value="dandamasceno04@gmail.com" />
                                </FormField>
                                <FormField label="Estado Civil">
                                    <SelectInput readOnly={true} value="Solteiro" options={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']} />
                                </FormField>
                                <FormField label="Gênero">
                                    <SelectInput readOnly={true} value="Masculino" options={['Masculino', 'Feminino', 'Outro']} />
                                </FormField>

                                {/* Row 3 */}
                                <FormField label="Identidade de Gênero">
                                    <SelectInput readOnly={true} value="Transgênero" options={['Cisgênero', 'Transgênero', 'Não-binário']} />
                                </FormField>
                                <FormField label="Nome Social" className="md:col-span-2">
                                    <TextInput readOnly={true} value="Danielly Vitória Damasceno Meira" />
                                </FormField>

                                {/* Row 4 */}
                                <FormField label="RG">
                                    <TextInput readOnly={true} value="MG-00.000.000" />
                                </FormField>
                                <FormField label="Telefone">
                                    <TextInput readOnly={true} value="38999999999" />
                                </FormField>
                                <FormField label="Naturalidade">
                                    <TextInput readOnly={true} value="Montes Claros" />
                                </FormField>

                                {/* Row 5 */}
                                <FormField label="Nacionalidade">
                                    <TextInput readOnly={true} value="Brasileira" />
                                </FormField>
                                <FormField label="UF">
                                    <SelectInput readOnly={true} value="MG" options={['MG', 'SP', 'RJ', 'BA']} />
                                </FormField>
                            </div>

                            {/* Action Buttons */}
                            <div id="buttons-container">
                                <button onClick={onCloseModal} id='cancel-button'>
                                    Cancelar
                                </button>
                                <button onClick={handleNext} id='save-button'>
                                    Próximo: Endereço
                                </button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'Endereço' && (
                        <div>
                            <div id='rows-3-input'>
                                <FormField label="CEP"><TextInput readOnly={true} value="39401-001" /></FormField>
                                <FormField label="Rua"><TextInput readOnly={true} value="Daniel Damasceno Meira" /></FormField>
                                <FormField label="Número"><TextInput readOnly={true} value="1012" /></FormField>
                                <FormField label="Complemento"><TextInput readOnly={true} value="Bloco C, Ap. 701" /></FormField>
                                <FormField label="Bairro"><TextInput readOnly={true} value="Morada do Parque" /></FormField>
                                <FormField label="UF"><SelectInput readOnly={true} value="MG" options={['MG', 'SP', 'RJ', 'BA']} /></FormField>
                                <FormField label="Cidade" className="md:col-span-3"><TextInput readOnly={true} value="São João da Ponte" /></FormField>
                            </div>
                            <div id="buttons-container">
                                <button onClick={handleBack} id='cancel-button'>Voltar</button>
                                <button onClick={handleNext} id='save-button'>Próximo: Vaga</button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'Vaga' && (
                        <div>
                            <div className="flex flex-col items-center">
                                <div className="w-full max-w-lg border border-gray-200 rounded-md p-6">
                                    <h3 className="text-lg font-semibold text-gray-800">Lato Sensu em Alfabetização e Multiletramentos</h3>
                                    <p id='subtitle-edital'>Montes Claros | MG</p>
                                    <div className="space-y-4">
                                        <TextInput readOnly={true} value="Modalidade 3: Negros e Pardos" />
                                        <TextInput readOnly={true} value="Categoria 3: Comunidade em Geral" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end items-center w-full space-x-4">
                                <button onClick={handleBack} id='cancel-button'>Voltar</button>
                                <button onClick={handleNext} id='save-button'>Próximo: Anexos</button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'Anexos e Situação' && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Anexos</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                                <AnexoButton label="Identidade:" />
                                <AnexoButton label="Comprovante:" />
                                <AnexoButton label="Histórico:" />
                                <AnexoButton label="Auto Declaração:" />
                            </div>

                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Situação</h2>
                            <div id='rows-3-input'>
                                <FormField label="Status" className="md:col-span-1">
                                    <SelectInput readOnly={true} value="Deferido" options={['Deferido', 'Indeferido', 'Em Análise']} />
                                </FormField>
                                <FormField label="Observações" className="md:col-span-3">
                                    <textarea
                                        readOnly
                                        rows="4"
                                        className="bg-gray-100 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                        value="Informamos que a inscrição de Vossa Senhoria no presente processo seletivo foi indeferida em razão do não atendimento aos requisitos formais estabelecidos no edital, especificamente pela ausência da documentação comprobatória exigida para a função pretendida, inviabilizando a devida análise e homologação da candidatura."
                                    />
                                </FormField>
                            </div>

                            <div id="buttons-container">
                                <button onClick={handleBack} id='cancel-button'>Voltar</button>
                                <button onClickCapture={onCloseModal} id='save-button'>Fechar</button>
                            </div>
                        </div>
                    )}

                </ModalBody>
            </Modal>
        </>
    );
}
