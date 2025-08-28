import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import { AppContext } from '@/Contexts/AppContext';
import React, { useState, useEffect } from 'react';

const EscolhaDaVaga = ({ formData, setFormData, handleBack, handleNext, setEnabledTabs, vagas }) => {
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    const isValid = formData.vagas.length > 0 && formData.vagas.every(v => v.polo && v.polo !== '');
    setIsFormValid(isValid);
    setEnabledTabs(isValid ? ["Informações Básicas", "Endereço", "Escolha da Vaga", "Detalhes da Vaga"] : ["Informações Básicas", "Endereço", "Escolha da Vaga"]);
  }, [formData.vagas]);

  const VagaCard = ({ title, isSelected, onSelect, onCampusChange, selectedValue, campus }) => (
    <div
      onClick={onSelect}
      className={`cursor-pointer border-2 rounded-lg p-4 flex flex-col justify-between h-48 transition-colors ${isSelected ? 'bg-yellow-300 border-yellow-400' : 'bg-white border-gray-200 hover:border-blue-500'}`}
    >
      <p className="font-semibold text-gray-800">{title}</p>
      <div className="relative mt-4">
        <select
          onClick={(e) => e.stopPropagation()}
          onChange={onCampusChange}
          value={selectedValue}
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          disabled={!isSelected}
        >
          <option value="" disabled>Selecione o Campus</option>
          {campus && campus.map(c => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
    </div>
  );

  const handleVagaSelect = (vagaId, vagaTitle) => {
    setFormData(prevFormData => {
      const isSelected = prevFormData.vagas.some(v => v.vaga === vagaId);
      const newVagas = isSelected
        ? prevFormData.vagas.filter(v => v.vaga !== vagaId)
        : [...prevFormData.vagas, { vaga: vagaId, title: vagaTitle, polo: '', modalidade: '', categoria: '', anexo_cpf: null, anexo_comprovante_residencia: null, anexo_historico: null, anexo_autodeclaracao: null }];

      return { ...prevFormData, vagas: newVagas.filter(v => v.vaga) };
    });
  };

  const handleCampusChange = (vagaId, campus) => {
    setFormData(prevFormData => {
      const newVagas = prevFormData.vagas.map(v =>
        v.vaga === vagaId ? { ...v, polo: campus } : v
      );
      return { ...prevFormData, vagas: newVagas };
    });
  };

  useEffect(() => {
    console.log(vagas)
  }, [vagas])

  return (
    <div className="bg-gray-100 min-h-screen md:p-8 font-sans animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="bg-blue-700 text-white p-6 rounded-t-2xl">
          <h1 className="text-2xl font-semibold">
            Por favor, selecione as vagas do seu interesse
          </h1>
        </div>
        <div className="bg-white rounded-b-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Selecione a Vaga Pretendida</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            {vagas.map(vaga => {
              const selectedVaga = formData.vagas.find(v => v.vaga === vaga.id);
              return (
                <VagaCard
                  key={vaga.id}
                  title={vaga.vaga.vagable.nome}
                  campus={vaga.campus}
                  isSelected={!!selectedVaga}
                  selectedValue={selectedVaga ? selectedVaga.polo : ''}
                  onSelect={() => handleVagaSelect(vaga.id, vaga.vaga.vagable.nome)}
                  onCampusChange={(e) => handleCampusChange(vaga.id, e.target.value)}
                />
              );
            })}

          </div>
          <p className="text-sm text-gray-500 mt-6">
            OBS: A quantidade máxima de itens selecionáveis depende das especificações do presente edital.
          </p>
          <div className="mt-10 flex justify-end">
            <button onClick={handleBack} className="px-6 py-2.5 mr-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Voltar
            </button>
            <button
              onClick={handleNext}
              className={`px-8 py-3 text-sm font-semibold text-white rounded-lg ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!isFormValid}
            >
              Próxima Etapa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default EscolhaDaVaga