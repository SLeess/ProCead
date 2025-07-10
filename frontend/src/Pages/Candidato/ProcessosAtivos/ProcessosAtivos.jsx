import ProcessoCard from "@/Components/Candidatos/ProcessoCard/ProcessoCard";
import { CiInboxIn } from "react-icons/ci";

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

export default function ProcessosAtivos(){
  return (
    <section className="min-h-[75vh] px-6 mt-10 py-12 bg-white rounded-2xl" style={{boxShadow: "-1px 0px 2px 0px rgba(0, 0, 0, 0.25), 1px 1px 2px 0px rgba(0, 0, 0, 0.25)",}}>
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl text-gray-800 font-normal">Processos em Andamento</h1>
          <p className="text-gray-600 mt-2">Confira aqui todos os processo em andamento atualmente.</p>
        </div>

        {/* Grade Responsiva: 
            - 1 coluna em telas pequenas (padrão)
            - 2 colunas em telas médias (md)
            - 3 colunas em telas grandes (lg)
        */}
          {processosData.length > 0 ?
          (           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:mx-20">
              {
                processosData.map((processo) => (
                  <ProcessoCard key={processo.id} processo={processo} />
                ))
              }
            </div>
          )
          :
            <div className='flex flex-col items-center justify-center pb-25 text-gray-500 dark:text-gray-400'>
                <CiInboxIn className="w-24 h-24 mb-4 text-gray-400 dark:text-gray-500" />
                <p className="text-xl font-semibold mb-2">Ops! Nenhum processo em andamento foi encontrado.</p>
                <p className="text-base text-center max-w-md">
                    Não encontramos nenhum processo seletivo que esteja em andamento hoje.
                    Aguarde o início de novos processos.
                </p>
            </div>
          }
    </section>
  );
};
