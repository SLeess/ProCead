import { AnexoButton, FormField, SelectInput } from '@/Components/Global/ui/modals';
import React from 'react';

const DetalhesDaVaga = ({ formData, setFormData, handleBack, handleNext }) => {

  const handleInputChange = (vagaId, field, value) => {
    setFormData(prevFormData => {
      const newVagas = prevFormData.vagas.map(vaga => {
        if (vaga.vaga === vagaId) {
          return { ...vaga, [field]: value };
        }
        return vaga;
      });
      return { ...prevFormData, vagas: newVagas };
    });
  };

  return (
    <div className="bg-gray-100 dark:bg-slate-700 min-h-screen p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="bg-blue-700 text-white p-6 rounded-t-2xl">
          <h1 className="text-2xl font-semibold">
            Por favor, adicione a modalidade, categoria e documentos para cada vaga
          </h1>
        </div>
        {formData.vagas.map(vaga => (
          <div key={vaga.vaga} className="bg-white rounded-b-2xl shadow-lg p-8 mt-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Vaga: {vaga.title}</h2>
            <div className="space-y-6">
              <FormField label="Modalidade de Concorrência a Vaga">
                <SelectInput
                  value={vaga.modalidade || ''}
                  onChange={(e) => handleInputChange(vaga.vaga, 'modalidade', e.target.value)}
                  options={['Modalidade 3: Negros e Pardos', 'Modalidade 2: Indígenas', 'Modalidade 1: Ampla Concorrência']}
                />
              </FormField>
              <FormField label="Categoria de Concorrência a Vaga">
                <SelectInput
                  value={vaga.categoria || ''}
                  onChange={(e) => handleInputChange(vaga.vaga, 'categoria', e.target.value)}
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
        ))}
        <div className="mt-10 flex justify-end">
          <button onClick={handleBack} className="px-6 py-2.5 mr-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Voltar
          </button>
          <button onClick={handleNext} className="px-8 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 ">
            Próxima Etapa
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalhesDaVaga;