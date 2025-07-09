import React from 'react';
import './MeusProcessos.css'
import { FaSearch } from 'react-icons/fa';
import { IoIosFunnel } from "react-icons/io";
import ProcessoPessoalCard from '@/Components/Candidatos/ProcessoPessoalCard/ProcessoPessoalCard.tsx';

const processosData = [
  {
    id: 102,
    edital: 'EDITAL N.° 08/2025',
    descricao: 'Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes Modalidade Educação a Distância',
    status: "Em andamento",
    obs: "",
  },
  {
    id: 104,
    edital: 'EDITAL N.° 11/2024',
    descricao: 'Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes Modalidade Educação a DistânciaSeleção para o Programa de Pós-Graduação em Biotecnologia (PPGBiotec)',
    status: "Em andamento",
    obs: "",
  },
  {
    id: 106,
    edital: 'EDITAL N.° 01/2025',
    descricao: 'Seleção de tutores para cursos de Educação a Distância (EaD)',
    status: "Encerrado",
    obs: "",
  },
  {
    id: 101,
    edital: 'EDITAL N.° 12/2024',
    descricao: 'Seleção para Mestrado em Produção Vegetal no Semiárido',
    status: "Encerrado",
    obs: "",
  },
];

function MeusProcessos() {
  return (
    <section className='mx-auto px-2 md:px-6 mt-10 py-12 bg-white rounded-2xl shadow-[-1px_0px_2px_0px_rgba(0,0,0,0.25),1px_1px_2px_0px_rgba(0,0,0,0.25)]'>
      <form className='max-w-5xl mx-auto' onSubmit={() => {}}>
        <header className="flex flex-col md:flex-row items-center md:justify-between mb-12 mx-2 space-y-4 md:space-y-0">
          <h1 className="text-3xl text-center sm:text-4xl text-gray-800 font-normal">Meus Processos Seletivos</h1>
          <div className='flex flex-col sm:flex-row gap-2 items-center sm:items-baseline'>
            <div className="relative max-w-[250px] md:max-w-[350px] w-full mx-0 md:mx-2">
              <div className="absolute top-3 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar..."
                className="h-[40px] w-full md:w-[350px] p-2 pl-10 text-sm text-gray-900 border-solid border-[rgba(0,0,0,0.50)] border-[0.4px] rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
              <button className='absolute top-0 right-0 flex items-center bg-[#095ec5] hover:bg-[#0751ac] text-white h-[40px] p-[10px_12px] justify-center rounded-r-lg'>
                Buscar
              </button>
            </div>
            <button className='h-[40px] max-w-30 hover:cursor-pointer inline-flex justify-center items-center gap-3 justify-items-end sm:justify-items-normal bg-[white] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)] pt-[11px] pb-2.5 px-[15px] rounded-[10px]'>
              <IoIosFunnel/>
              Filtros
            </button>
          </div>
        </header>
          <ul className='grid grid-cols-1 gap-6'>
          {/* <ul className='space-y-5 row'> */}
            {
              processosData.map((processo) => 
                  <ProcessoPessoalCard 
                    key={processo.id} 
                    processo={processo}
                    />
              )
            }
          </ul>
      </form>
    </section>
  );
}

export default MeusProcessos;