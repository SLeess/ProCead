import ProcessoCard from "@/Components/Candidatos/ProcessoCard/ProcessoCard";
import { CiInboxIn } from "react-icons/ci";

const processosData = [
  {
    id: 2,
    edital: 'Edital 08/2025',
    descricao: 'Processo Seletivo para contratação de Professor Substituto de Direito',
    inscrito: true,
  },
  {
    id: 4,
    edital: 'Edital 11/2024',
    descricao: 'Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes Modalidade Educação a DistânciaSeleção para o Programa de Pós-Graduação em Biotecnologia (PPGBiotec)',
    inscrito: true,
  },
  {
    id: 6,
    edital: 'Edital 01/2025',
    descricao: 'Seleção de tutores para cursos de Educação a Distância (EaD)',
    inscrito: true,
  },
  {
    id: 1,
    edital: 'Edital 12/2024',
    descricao: 'Seleção para Mestrado em Produção Vegetal no Semiárido',
    inscrito: false,
  },
  {
    id: 3,
    edital: 'Edital 02/2025',
    descricao: 'Vagas remanescentes para o curso de Especialização em Gestão Pública',
    inscrito: false,
  },
  {
    id: 5,
    edital: 'Edital 09/2025',
    descricao: 'Processo de Seleção de Discentes para o curso de Odontologia',
    inscrito: false,
  },
];

export default function ProcessosAtivos(){
  return (
    <section>
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl text-gray-800 dark:text-white font-normal">Processos em Andamento</h1>
          <p className="text-gray-600 mt-2">Confira aqui todos os processo em andamento atualmente.</p>
        </div>
          {processosData.length > 0 ?
          (           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 lg:mx-20 mx-2">
              {
                processosData.map((processo) => (
                  <ProcessoCard key={processo.id} processo={processo} />
                ))
              }
            </div>
          )
          :
            <div className='info-not-found-itens'>
                <CiInboxIn className="ICON"/>
                <p id="first">Ops! Nenhum processo em andamento foi encontrado.</p>
                <p id="second">
                    Não encontramos nenhum processo seletivo que esteja em andamento hoje.
                    Aguarde o início de novos processos.
                </p>
            </div>
          }
    </section>
  );
};
