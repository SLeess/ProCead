import { FormField, TextInput } from '@/Components/Global/ui/modals'
import React from 'react'
import VagaDetails from './VagaDetails'

const Confirmacao = ({ handleBack, handleNext, formData, setFormData }) => {

  return (
    <div className="bg-gray-100 dark:bg-slate-700 min-h-screen p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">

        <div className="bg-blue-700 text-white p-6 rounded-t-2xl">
          <h1 className="text-2xl font-semibold">
            Por favor, adicione a modalidade, categoria e documentos para cada vaga
          </h1>
        </div>

        <div className="bg-white rounded-b-2xl shadow-lg p-8">
          <div className="space-y-6">
            {/* 1ª linha: 3 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <FormField label="Nome Completo">
                <TextInput readOnly={true} value={formData.nome_completo} />
              </FormField>
              <FormField label="CPF">
                <TextInput readOnly={true} value={formData.cpf} />
              </FormField>
              <FormField label="E-mail">
                <TextInput readOnly={true} value={formData.email} />
              </FormField>
            </div>
            {/* 2ª linha: 4 colunas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <FormField label="Data de Nascimento">
                <TextInput readOnly={true} value={formData.data_nascimento} />
              </FormField>
              <FormField label="Telefone">
                <TextInput readOnly={true} value={formData.telefone} />
              </FormField>
              <FormField label="Gênero">
                <TextInput readOnly={true} value={formData.genero} />
              </FormField>
              <FormField label="CEP">
                <TextInput readOnly={true} value={formData.cep} />
              </FormField>
            </div>
            {/* 3ª linha: 3 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <FormField label="Rua">
                <TextInput readOnly={true} value={formData.rua} />
              </FormField>
              <FormField label="Bairro">
                <TextInput readOnly={true} value={formData.bairro} />
              </FormField>
              <FormField label="Número">
                <TextInput readOnly={true} value={formData.numero} />
              </FormField>
            </div>
            {/* 4ª linha: 2 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <FormField label="UF">
                <TextInput readOnly={true} value="MG" />
              </FormField>
              <FormField label="Cidade">
                <TextInput readOnly={true} value="Montes Claros" />
              </FormField>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2              
            gap-6 mb-8">
            {formData.vagas.map((vaga, index) => (
              <VagaDetails key={index} vaga={vaga} />
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Termo de Responsabilidade</h2>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-sm mb-4">Com o preenchimento da Ficha de Inscrição, o(a) candidato(a) declara:</p>
              <ol className="list-decimal list-inside text-sm space-y-2 mb-4">
                <li>Estar ciente e aceitar as normas constantes no Edital.</li>
                <li>O preenchimento desta ficha e as informações prestadas são de inteira responsabilidade do(a) candidato(a).</li>
              </ol>
              <label className="flex items-start">
                <input type="checkbox" checked={formData.termo_responsabilidade} onChange={(e) => setFormData(prevData => {
                  return { ...prevData, termo_responsabilidade: e.target.checked }
                })} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1" />
                <span className="ml-3 text-sm">Declaro atender as condições estabelecidas e indicadas neste Edital para participar do Processo Seletivo ofertado pela UAB/Unimontes.</span>
              </label>
            </div>
        <div className="mt-10 flex justify-end">
          <button onClick={handleBack} className="px-6 py-2.5 mr-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Voltar
          </button>
          <button onClick={handleNext} className="px-8 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 ">
            Concluir
          </button>

        </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmacao