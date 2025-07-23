"use client";

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { FormField, SelectInput, AnexoButton, TextInput } from "@/Components/ui/modals";

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
            <button onClick={() => setOpenModal(true)} className="p-1 hover:bg-gray-200 rounded-full">
                <Pencil className="h-5 w-5 text-yellow-500" />
            </button>
            <Modal show={openModal} onClose={onCloseModal} popup>
                <ModalHeader />
                <ModalBody >
                    {/* <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
                        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8"> */}

                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Editar Inscrição</h1>
                            <div className="flex items-center mt-2">
                                <p className="text-sm text-gray-500">Data de Inscrição: 04/07/2025</p>
                                <span className="ml-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Deferido</span>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="border-b border-gray-200 mb-8">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                                {/* Row 1 */}
                                <FormField label="Nome Completo" className="md:col-span-1">
                                    <TextInput value="Daniel Damasceno Meira" />
                                </FormField>
                                <FormField label="CPF">
                                    <TextInput value="000.000.000-00" />
                                </FormField>
                                <FormField label="Data de Nascimento">
                                    <TextInput value="05/10/2004" />
                                </FormField>

                                {/* Row 2 */}
                                <FormField label="E-mail" className="md:col-span-1">
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
                            <div className="mt-10 flex justify-end items-center space-x-4">
                                <button onClick={onCloseModal} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                    Cancelar
                                </button>
                                <button onClick={handleNext} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Próximo: Endereço
                                </button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'Endereço' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                <FormField label="CEP"><TextInput value="39401-001" /></FormField>
                <FormField label="Rua"><TextInput value="Daniel Damasceno Meira" /></FormField>
                <FormField label="Número"><TextInput value="1012" /></FormField>
                <FormField label="Complemento"><TextInput value="Bloco C, Ap. 701" /></FormField>
                <FormField label="Bairro"><TextInput value="Morada do Parque" /></FormField>
                <FormField label="UF"><SelectInput value="MG" options={['MG', 'SP', 'RJ', 'BA']} /></FormField>
                <FormField label="Cidade" className="md:col-span-3"><TextInput value="São João da Ponte" /></FormField>
            </div>
            <div className="mt-10 flex justify-end items-center space-x-4">
              <button onClick={handleBack} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Voltar</button>
              <button onClick={handleNext} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Próximo: Vaga</button>
            </div>
          </div>
        )}
        {activeTab === 'Vaga' && (
            <div className="flex flex-col items-center">
                <div className="w-full max-w-lg border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800">Lato Sensu em Alfabetização e Multiletramentos</h3>
                    <p className="text-sm text-gray-500 mb-6">Montes Claros | MG</p>
                    <div className="space-y-4">
                        <TextInput value="Modalidade 3: Negros e Pardos" />
                        <TextInput value="Categoria 3: Comunidade em Geral" />
                    </div>
                </div>
                <div className="mt-10 flex justify-end items-center w-full max-w-lg space-x-4">
                    <button onClick={handleBack} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Voltar</button>
                    <button onClick={handleNext} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Próximo: Anexos</button>
                </div>
            </div>
        )}
        {activeTab === 'Anexos e Situação' && (
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Anexos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <AnexoButton label="Identidade:" />
                    <AnexoButton label="Comprovante:" />
                    <AnexoButton label="Histórico:" />
                    <AnexoButton label="Auto Declaração:" />
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-4">Situação</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                    <FormField label="Status" className="md:col-span-1">
                        <SelectInput value="Deferido" options={['Deferido', 'Indeferido', 'Em Análise']} />
                    </FormField>
                    <FormField label="Observações" className="md:col-span-3">
                        <textarea
                            rows="4"
                            className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            defaultValue="Informamos que a inscrição de Vossa Senhoria no presente processo seletivo foi indeferida em razão do não atendimento aos requisitos formais estabelecidos no edital, especificamente pela ausência da documentação comprobatória exigida para a função pretendida, inviabilizando a devida análise e homologação da candidatura."
                        />
                    </FormField>
                </div>

                <div className="mt-10 flex justify-end items-center space-x-4">
                    <button onClick={handleBack} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Voltar</button>
                    <button onClickCapture={onCloseModal} className="px-8 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">Fechar</button>
                </div>
            </div>
        )}

                </ModalBody>
            </Modal>
        </>
    );
}
