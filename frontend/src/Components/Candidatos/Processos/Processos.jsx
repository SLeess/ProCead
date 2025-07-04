import React from 'react';
import ProcessoCard from '../ProcessoCard/ProcessoCard';

// Dados de exemplo. Em um aplicativo real, isso viria de uma API.
const processosData = [
  {
    id: 102,
    edital: 'Edital 08/2025',
    descricao: 'Processo Seletivo para contratação de Professor Substituto de Direito',
    inscrito: true,
  },
  {
    id: 104,
    edital: 'Edital 11/2024',
    descricao: 'Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes Modalidade Educação a DistânciaSeleção para o Programa de Pós-Graduação em Biotecnologia (PPGBiotec)',
    inscrito: true,
  },
  {
    id: 106,
    edital: 'Edital 01/2025',
    descricao: 'Seleção de tutores para cursos de Educação a Distância (EaD)',
    inscrito: true,
  },
  {
    id: 101,
    edital: 'Edital 12/2024',
    descricao: 'Seleção para Mestrado em Produção Vegetal no Semiárido',
    inscrito: false,
  },
  {
    id: 103,
    edital: 'Edital 02/2025',
    descricao: 'Vagas remanescentes para o curso de Especialização em Gestão Pública',
    inscrito: false,
  },
  {
    id: 105,
    edital: 'Edital 09/2025',
    descricao: 'Processo de Seleção de Discentes para o curso de Odontologia',
    inscrito: false,
  },
];

const Processos = () => {
  return (
    <div className="px-6 mt-10 py-12 bg-white rounded-2xl" style={{boxShadow: "-1px 0px 2px 0px rgba(0, 0, 0, 0.25), 1px 1px 2px 0px rgba(0, 0, 0, 0.25)",}}>
        <div className="text-center mb-12">
          <h1 className="text-4xl text-gray-800 font-normal">Processos em Andamento</h1>
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
    </div>
  );
};

export default Processos;