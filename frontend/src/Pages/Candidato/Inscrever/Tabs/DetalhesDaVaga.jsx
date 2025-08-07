import { AnexoButton, FormField, SelectInput } from '@/Components/Global/ui/modals';
import React, { useState } from 'react';

const DetalhesDaVaga = ({ formData, setFormData, handleBack, handleNext }) => {
  const [currentVagaIndex, setCurrentVagaIndex] = useState(0);

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

  const handleFileChange = (vagaId, field, file) => {
    setFormData(prevFormData => {
      const newVagas = prevFormData.vagas.map(vaga => {
        if (vaga.vaga === vagaId) {
          return { ...vaga, [field]: file };
        }
        return vaga;
      });
      return { ...prevFormData, vagas: newVagas };
    });
  };

  const goToNextVaga = () => {
    if (currentVagaIndex < formData.vagas.length - 1) {
      setCurrentVagaIndex(currentVagaIndex + 1);
    } else {
      handleNext();
    }
  };

  const goToPrevVaga = () => {
    if (currentVagaIndex > 0) {
      setCurrentVagaIndex(currentVagaIndex - 1);
    } else {
      handleBack();
    }
  };

  const currentVaga = formData.vagas[currentVagaIndex];

  return (
    <div className="bg-gray-100 dark:bg-slate-700 min-h-screen p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="bg-blue-700 text-white p-6 rounded-t-2xl">
          <h1 className="text-2xl font-semibold">
            Por favor, adicione a modalidade, categoria e documentos para cada vaga
          </h1>
        </div>
        {currentVaga && (
          <div key={currentVaga.vaga} className="bg-white dark:bg-slate-800 rounded-b-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              <span className='text-blue-600'>Vaga {currentVagaIndex + 1}/{formData.vagas.length}: </span>
              {currentVaga.title}
            </h2>
            <div className="space-y-6">
              <FormField label="Modalidade de Concorrência a Vaga">
                <SelectInput
                  value={currentVaga.modalidade || ''}
                  onChange={(e) => handleInputChange(currentVaga.vaga, 'modalidade', e.target.value)}
                  options={['Modalidade 3: Negros e Pardos', 'Modalidade 2: Indígenas', 'Modalidade 1: Ampla Concorrência']}
                />
              </FormField>
              <FormField label="Categoria de Concorrência a Vaga">
                <SelectInput
                  value={currentVaga.categoria || ''}
                  onChange={(e) => handleInputChange(currentVaga.vaga, 'categoria', e.target.value)}
                  options={['Categoria 3: Comunidade em Geral', 'Categoria 2: Servidores', 'Categoria 1: Egressos']}
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <AnexoButton onChange={(e) => handleFileChange(currentVaga.vaga, 'anexo_cpf', e.target.files[0])} label="CPF:" />
                <AnexoButton onChange={(e) => handleFileChange(currentVaga.vaga, 'anexo_comprovante_residencia', e.target.files[0])} label="Comprovante de Residência:" />
                <AnexoButton onChange={(e) => handleFileChange(currentVaga.vaga, 'anexo_historico', e.target.files[0])} label="Histórico:" />
                <AnexoButton onChange={(e) => handleFileChange(currentVaga.vaga, 'anexo_autodeclaracao', e.target.files[0])} label="Auto Declaração:" />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Tamanho máximo por arquivo: 10MB.
              </p>
            </div>
        <div className="mt-10 flex justify-end">
          <button onClick={goToPrevVaga} className="px-6 py-2.5 mr-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            {currentVagaIndex === 0 ? 'Voltar Etapa' : 'Vaga Anterior'}
          </button>
          <button onClick={goToNextVaga} className="px-8 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 ">
            {currentVagaIndex === formData.vagas.length - 1 ? 'Próxima Etapa' : 'Próxima Vaga'}
          </button>
        </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetalhesDaVaga;