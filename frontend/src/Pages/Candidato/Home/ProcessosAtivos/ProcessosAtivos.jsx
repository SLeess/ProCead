import ProcessoCard from "@/Components/Candidatos/ProcessoCard/ProcessoCard";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";
import { useAppContext } from "@/Contexts/AppContext";
import { useEffect, useState } from "react";
import { CiInboxIn } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./ProcessosAtivos.css"

// const processosData = [
//   {
//     id: 2,
//     edital: 'Edital 08/2025',
//     descricao: 'Processo Seletivo para contratação de Professor Substituto de Direito',
//     inscrito: true,
//   },
//   {
//     id: 4,
//     edital: 'Edital 11/2024',
//     descricao: 'Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes Modalidade Educação a DistânciaSeleção para o Programa de Pós-Graduação em Biotecnologia (PPGBiotec)',
//     inscrito: true,
//   },
//   {
//     id: 6,
//     edital: 'Edital 01/2025',
//     descricao: 'Seleção de tutores para cursos de Educação a Distância (EaD)',
//     inscrito: true,
//   },
//   {
//     id: 1,
//     edital: 'Edital 12/2024',
//     descricao: 'Seleção para Mestrado em Produção Vegetal no Semiárido',
//     inscrito: false,
//   },
//   {
//     id: 3,
//     edital: 'Edital 02/2025',
//     descricao: 'Vagas remanescentes para o curso de Especialização em Gestão Pública',
//     inscrito: false,
//   },
//   {
//     id: 5,
//     edital: 'Edital 09/2025',
//     descricao: 'Processo de Seleção de Discentes para o curso de Odontologia',
//     inscrito: false,
//   },
// ];



export default function ProcessosAtivos() {

  const { token, user } = useAppContext();
  const [processosData, setProcessosData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/inscricao/${user?.uuid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          // Handle HTTP errors like 404, 500, etc.
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setProcessosData(data.data);
        } else {
          toast.error('Dados dos processos não encontrados.');
        }
      } catch (error) {
        toast.error(error.message || 'Falha na comunicação com a API.');
        console.error("Erro ", error);
      } finally {
        setLoading(false);
      }
    }
    if (user?.uuid) {
      fetchData();
    }
  }, [token, user?.uuid])



  return (<div>

    {
      loading && <LoaderPages/>
    }
    <section>
      <div className="text-center mb-12">
        <h1 id="processosAtivos-title">
          Bem-vindo(a) ao <span className="text-[var(--welcome-text-color)]">PROCEAD</span>!
        </h1>
        <p id="processosAtivos-subtitle">
          Confira aqui todos os Processos Seletivos em andamento atualmente.
        </p>
      </div>
      {processosData != null && processosData.length > 0 ?
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
        !loading ?
        <div className='info-not-found-itens'>
          <CiInboxIn className="ICON" />
          <p id="first">Ops! Nenhum processo em andamento foi encontrado.</p>
          <p id="second">
            Não encontramos nenhum processo seletivo que esteja em andamento hoje.
            Aguarde o início de novos processos.
          </p>
        </div>
        :''
      }
    </section>
  </div>
  );
};
