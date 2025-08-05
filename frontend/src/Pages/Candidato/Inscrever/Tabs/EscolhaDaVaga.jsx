import React, { useState } from 'react'

const EscolhaDaVaga = ({ formData, handleBack, handleNext, handleOnChangeAttr }) => {
  const vagas = [
    { id: 1, title: 'Lato Sensu em Apicultura' },
    { id: 2, title: 'Lato Sensu em Arte e Cultura Visual' },
    { id: 3, title: 'Lato Sensu em Álgebra e Geometria' },
    { id: 4, title: 'Lato Sensu em Alfabetização e Multiletramentos' },
  ];
  const VagaCard = ({ title, isSelected, onSelect }) => (
    <div
      onClick={onSelect}
      className={`cursor-pointer border-2 rounded-lg p-4 flex flex-col justify-between h-48 transition-colors ${isSelected ? 'bg-yellow-300 border-yellow-400' : 'bg-white border-gray-200 hover:border-blue-500'}`}
    >
      <p className="font-semibold text-gray-800">{title}</p>
      <div className="relative mt-4">
        <select className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
          <option>Campus: Montes Claros</option>
          <option>Campus: Januária</option>
          <option>Campus: Salinas</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
    </div>
  );
  const [vagasSelecionadas, setVagasSelecionadas] = useState([2, 4]);
  const toggleVaga = (id) => {
    setVagasSelecionadas(prev =>
      prev.includes(id) ? prev.filter(vid => vid !== id) : [...prev, id]
    );
  };
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-blue-700 text-white p-6 rounded-t-2xl">
          <h1 className="text-2xl font-semibold">
            Por favor, selecione as vagas do seu interesse
          </h1>
        </div>

        {/* Form Panel */}
        <div className="bg-white rounded-b-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Selecione a Vaga Pretendida</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {vagas.map(vaga => (
              <VagaCard
                key={vaga.id}
                title={vaga.title}
                isSelected={vagasSelecionadas.includes(vaga.id)}
                onSelect={() => toggleVaga(vaga.id)}
              />
            ))}
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
  )
}

export default EscolhaDaVaga