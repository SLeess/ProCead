import { AnexoButton, FormField, SelectInput } from '@/Components/Global/ui/modals'
import React from 'react'

const DetalhesDaVaga = ({ formData }) => {
  console.log(formData);
  return (
    <div className="bg-gray-100 dark:bg-slate-700 min-h-screen p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Vaga: Lato Sensu em Alfabetização e Multiletramentos</h2>
        <div className="space-y-6">
          <FormField label="Modalidade de Concorrência a Vaga">
            <SelectInput
              defaultValue="Modalidade 3: Negros e Pardos"
              options={['Modalidade 3: Negros e Pardos', 'Modalidade 2: Indígenas', 'Modalidade 1: Ampla Concorrência']}
            />
          </FormField>
          <FormField label="Categoria de Concorrência a Vaga">
            <SelectInput
              defaultValue="Categoria 3: Comunidade em Geral"
              options={['Categoria 3: Comunidade em Geral', 'Categoria 2: Servidores', 'Categoria 1: Egressos']}
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <AnexoButton label="CPF:" />
            <AnexoButton label="Comprovante de Residência:" />
            <AnexoButton label="Histórico:" />
            <AnexoButton label="Auto Declaração:" />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Tamanho máximo por arquivo: 10MB.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DetalhesDaVaga