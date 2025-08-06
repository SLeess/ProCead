import React from 'react';

const EscolhaDaVaga = ({ formData, setFormData, handleBack, handleNext }) => {
  const vagas = [
    { id: 1, title: 'Lato Sensu em Apicultura' },
    { id: 2, title: 'Lato Sensu em Arte e Cultura Visual' },
    { id: 3, title: 'Lato Sensu em Álgebra e Geometria' },
    { id: 4, title: 'Lato Sensu em Alfabetização e Multiletramentos' },
  ];

  const VagaCard = ({ title, isSelected, onSelect, onCampusChange, selectedValue }) => (
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
          <option value="">Selecione o Campus</option>
          <option value="Montes Claros">Campus: Montes Claros</option>
          <option value="Januária">Campus: Januária</option>
          <option value="Salinas">Campus: Salinas</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );

  const handleVagaSelect = (vagaId, vagaTitle) => {
    setFormData(prevFormData => {
      const isSelected = prevFormData.vagas.some(v => v.vaga === vagaId);
      const newVagas = isSelected
        ? prevFormData.vagas.filter(v => v.vaga !== vagaId)
        : [...prevFormData.vagas, { vaga: vagaId, title: vagaTitle, polo: '', modalidade: '', categoria: '' }];
      
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

  // useEffect(() => {
  //   console.log(formData);
  // },[formData.vagas])

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8 font-sans">
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
                  title={vaga.title}
                  isSelected={!!selectedVaga}
                  selectedValue={selectedVaga ? selectedVaga.polo : ''}
                  onSelect={() => handleVagaSelect(vaga.id, vaga.title)}
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
            <button onClick={handleNext} className="px-8 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 ">
              Próxima Etapa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default EscolhaDaVaga