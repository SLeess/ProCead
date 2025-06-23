import React from 'react';
import ProcessoCard from '../ProcessoCard/ProcessoCard';

// Dados de exemplo. Em um aplicativo real, isso viria de uma API.
const processosData = [
  {
    id: 1,
    edital: 'Edital 04/2025',
    descricao: 'Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes Modalidade Educação a Distância',
    inscrito: true,
  },
  {
    id: 2,
    edital: 'Edital 05/2025',
    descricao: 'Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes Modalidade Educação a Distância',
    inscrito: false,
  },
  {
    id: 3,
    edital: 'Edital 07/2025',
    descricao: 'Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes Modalidade Educação a Distância',
    inscrito: false,
  },
  {
    id: 4,
    edital: 'Edital 04/2025',
    descricao: 'Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes Modalidade Educação a Distância',
    inscrito: false,
  },
  {
    id: 5,
    edital: 'Edital 04/2025',
    descricao: 'Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes Modalidade Educação a Distância',
    inscrito: false,
  },
  {
    id: 6,
    edital: 'Edital 04/2025',
    descricao: 'Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes Modalidade Educação a Distância',
    inscrito: false,
  },
];

const Processos = () => {
  return (
    <div className='mx-auto xl:mx-10 lg:mx-8 max-w-7xl'>
        <main className="container px-6 mt-10 py-12 bg-white rounded-2xl" style={{boxShadow: "-1px 0px 2px 0px rgba(0, 0, 0, 0.25), 1px 1px 2px 0px rgba(0, 0, 0, 0.25)",}}>
            <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">Processos em Andamento</h1>
            <p className="text-gray-600 mt-2">Confira aqui todos os processo em andamento atualmente.</p>
            </div>

            {/* Grade Responsiva: 
                - 1 coluna em telas pequenas (padrão)
                - 2 colunas em telas médias (md)
                - 3 colunas em telas grandes (lg)
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:mx-20">
            {processosData.map((processo) => (
                // <></>
                <ProcessoCard key={processo.id} processo={processo} />
            ))}
            </div>
        </main>
    </div>
  );
};

export default Processos;