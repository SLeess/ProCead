import { AnexoButton, FormField, SelectInput } from '@/Components/Global/ui/modals';
import React, { useState, useEffect } from 'react';
import './animations.css';

const DetalhesDaVaga = ({ formData, setFormData, handleBack, handleNext, setEnabledTabs, vagas }) => {
  const [currentVagaIndex, setCurrentVagaIndex] = useState(0);
  const [animationDirectionRight, setAnimationDirectionRight] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const currentVaga = formData.vagas[currentVagaIndex];
  useEffect(() => {
    console.log("vagas")
    console.log(vagas)
    console.log("current Vaga")
    console.log(currentVaga)
  }, [vagas, currentVaga])
  const vagaDetalhe = vagas.find(vaga => vaga.id === currentVaga?.vaga);

  useEffect(() => {
    if (currentVaga) {
      const { modalidade, categoria, anexo_cpf, anexo_comprovante_residencia, anexo_historico, anexo_autodeclaracao } = currentVaga;
      const allFieldsFilled = modalidade && ( vagaDetalhe?.categorias_customizadas && vagaDetalhe?.categorias_customizadas.length ? categoria : true) && anexo_cpf && anexo_comprovante_residencia && anexo_historico && anexo_autodeclaracao;
      setIsFormValid(allFieldsFilled);
    }

    const filledVagasCount = formData.vagas.filter(vaga => {
      const { modalidade, categoria, anexo_cpf, anexo_comprovante_residencia, anexo_historico, anexo_autodeclaracao } = vaga;
      return modalidade && categoria && anexo_cpf && anexo_comprovante_residencia && anexo_historico && anexo_autodeclaracao;
    }).length;

    if (filledVagasCount == formData.vagas.length)
      setEnabledTabs(["Informações Básicas", "Endereço", "Escolha da Vaga", "Detalhes da Vaga", "Confirmação"]);
    else
      setEnabledTabs(["Informações Básicas", "Endereço", "Escolha da Vaga", "Detalhes da Vaga"]);
  }, [currentVaga, formData.vagas, setEnabledTabs]);

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
    setAnimationDirectionRight(true)
    if (currentVagaIndex < formData.vagas.length - 1) {
      setCurrentVagaIndex(currentVagaIndex + 1);
    } else {
      handleNext();
    }
  };

  const goToPrevVaga = () => {
    setAnimationDirectionRight(false);
    if (currentVagaIndex > 0) {
      setCurrentVagaIndex(currentVagaIndex - 1);
    } else {
      handleBack();
    }
  };


  return (
    <div className="bg-gray-100 dark:bg-slate-700 min-h-screen  md:p-8 font-sans animate-fade-in animate-spin">
      <div className="max-w-6xl mx-auto">
        <div className="bg-blue-700 text-white p-6 rounded-t-2xl">
          <h1 className="text-2xl font-semibold">
            Por favor, adicione a modalidade, categoria e documentos para cada vaga
          </h1>
        </div>
        {currentVaga && (
          <div key={currentVaga.vaga} className="bg-white dark:bg-slate-800 rounded-b-2xl shadow-lg p-8 ">
            <div className={animationDirectionRight ? 'animate-fade-in-right' : 'animate-fade-in-left'}>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                <span className='text-blue-600'>Vaga {currentVagaIndex + 1}/{formData.vagas.length}:
                  {" "+vagaDetalhe?.vaga.vagable?.nome || currentVaga.title}
                </span>
              </h2>
              <div className="space-y-6">
                <FormField label="Modalidade de Concorrência a Vaga">
                  <SelectInput
                    defaultOption={true}
                    value={currentVaga.modalidade || ''}
                    onChange={(e) => handleInputChange(currentVaga.vaga, 'modalidade', e.target.value)}
                    options={vagaDetalhe?.vagas_por_modalidade?.map(item => ({
                      value: item.modalidade_id,
                      label: item.modalidade.descricao
                    })) || []}
                  />
                </FormField>
                {vagaDetalhe?.categorias_customizadas && vagaDetalhe?.categorias_customizadas.length > 0 && 
                <FormField label="Categoria de Concorrência a Vaga">
                  <SelectInput
                    defaultOption={true}
                    value={currentVaga.categoria || ''}
                    onChange={(e) => handleInputChange(currentVaga.vaga, 'categoria', e.target.value)}
                    options={vagaDetalhe?.categorias_customizadas?.map(item => ({
                      value: item.id,
                      label: item.nome
                    })) || []}
                    />
                </FormField>
                  }
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div>
                    <AnexoButton onChange={(e) => handleFileChange(currentVaga.vaga, 'anexo_cpf', e.target.files[0])} label="CPF:" />
                    {currentVaga.anexo_cpf && <p className="text-sm text-gray-500 mt-1">{currentVaga.anexo_cpf.name}</p>}
                  </div>
                  <div>
                    <AnexoButton onChange={(e) => handleFileChange(currentVaga.vaga, 'anexo_comprovante_residencia', e.target.files[0])} label="Comprovante de Residência:" />
                    {currentVaga.anexo_comprovante_residencia && <p className="text-sm text-gray-500 mt-1">{currentVaga.anexo_comprovante_residencia.name}</p>}
                  </div>
                  <div>
                    <AnexoButton onChange={(e) => handleFileChange(currentVaga.vaga, 'anexo_historico', e.target.files[0])} label="Histórico:" />
                    {currentVaga.anexo_historico && <p className="text-sm text-gray-500 mt-1">{currentVaga.anexo_historico.name}</p>}
                  </div>
                  <div>
                    <AnexoButton onChange={(e) => handleFileChange(currentVaga.vaga, 'anexo_autodeclaracao', e.target.files[0])} label="Auto Declaração:" />
                    {currentVaga.anexo_autodeclaracao && <p className="text-sm text-gray-500 mt-1">{currentVaga.anexo_autodeclaracao.name}</p>}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Tamanho máximo por arquivo: 10MB.
                </p>
              </div>
            </div>
            <div className="mt-10 flex justify-end">
              <button onClick={goToPrevVaga} className="px-6 py-2.5 mr-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                {currentVagaIndex === 0 ? 'Voltar' : 'Vaga Anterior'}
              </button>
              <button
                onClick={goToNextVaga}
                className={`px-8 py-3 text-sm font-semibold text-white rounded-lg ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!isFormValid}
              >
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