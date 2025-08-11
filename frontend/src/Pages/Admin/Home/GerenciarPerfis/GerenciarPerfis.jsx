import MainTable from "@/Components/Global/Tables/MainTable/MainTable";
import "./GerenciarPerfis.css";
import { UserRoundPen } from "lucide-react";
import data from "./data";
import getColumns from "./columns";
import PerfilCreateModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilCreateModal";
import { NavigationContext } from "@/Contexts/NavigationContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "@/Contexts/AppContext";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";

export default function GerenciarPerfis()
{
    const { token } = useAppContext();
    const { navigate } = useContext(NavigationContext);

    const columns = useMemo(() => getColumns(navigate), [navigate]);

    const [perfis, setPerfis] = useState([]);
  
    /** ------------------ Lidando com Filtros ------------------ **/
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
    const fetchProcessos = async () => {
      setLoading(true);
      // await new Promise(resolve => setTimeout(resolve, 5000));
      try {
          const res = await fetch('/api/super-admin/roles', { // Substitua pela URL real da sua API
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`, // Descomente se precisar de token
              },
          });

          if (!res.ok) {
              throw new Error(`Erro ao buscar processos: ${res.status} ${res.statusText}`);
          }

          const result = await res.json();
          setPerfis(result.data.roles);
          console.log(perfis);
          
          toast.success("Todos os processos seletivos existentes no sistema foram encaminhados com sucesso.", {
            autoClose: 1800,
          });

      } catch (err) {
            setError("Não foi possível carregar seus processos seletivos. " + (err.message ? ` (${err.message})` : ''));
            setPerfis([]);
        } finally {
          setLoading(false);
        }
      };
    fetchProcessos();
  }, []);

    return (
        <section id="gerenciar_perfis">
            <header>
                <h1>Gerenciar Perfis</h1>
            </header>
            <div id="content">
                <div className="lg:px-4">
                    <div className="flex items-center justify-between  mb-4">
                        <div className="bg-white shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
                            <p className="text-gray-600 mb-1">Nº de Perfis</p>
                            <p className="text-2xl font-bold mb-1">{ perfis.length }</p>
                            <UserRoundPen className="absolute top-4 right-4 text-gray-500" />
                        </div>
                            <PerfilCreateModal/>
                    </div>
                    {
                        loading && <LoaderPages/>
                    }
                    <MainTable 
                        data={perfis} 
                        columns={columns} 
                        title={"Perfis"}
                        canExport={true}
                        canHiddenColumns={false}
                        hasSelectForRows={false}
                    />
                </div>
            </div>
        </section>
    );
}