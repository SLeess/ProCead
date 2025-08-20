import { TextInput } from "flowbite-react";
import "./GerenciarUsuarios.css";
import { FormField, SelectInput } from "@/Components/Global/ui/modals";
import { useContext, useEffect, useMemo, useState } from "react";
import MainTable from "@/Components/Global/Tables/MainTable/MainTable";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";
import PerfilCreateModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilCreateModal";
import { UserRoundPen } from "lucide-react";
import { useAppContext } from "@/Contexts/AppContext";
import { NavigationContext } from "@/Contexts/NavigationContext";
import GerenciarUsuariosColumns from "./columns";

export default function GerenciarUsuarios(){
    const { apiAsyncFetch } = useAppContext();
    const { navigate } = useContext(NavigationContext);

    const columns = useMemo(() => GerenciarUsuariosColumns(navigate), [navigate]);

    const [usuarios, setUsuarios] = useState([]);
    
    /** ------------------ Lidando com Filtros ------------------ **/
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProcessos = async () => {
            setLoading(true);
            try{
                const result = await apiAsyncFetch(
                    'GET', 
                    `/api/super-admin/users`, 
                );
                setUsuarios(result.data.users);
            } catch (err) {
                    setError("Não foi possível carregar seus processos seletivos. " + (err.message ? ` (${err.message})` : ''));
                    setUsuarios([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProcessos();
    }, []);

    return(
        <section id="gerenciar_usuarios_global">
            <header>
                <h1>Gerenciar Usuários</h1>
            </header>
            <div id="content">
                <div className="lg:px-4">
                    <div className="sm:flex items-center justify-between  mb-4">
                        <div className="bg-white shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
                            <p className="text-gray-600 mb-1">Nº de Usuários</p>
                            <p className="text-2xl font-bold mb-1">4</p>
                            <UserRoundPen className="absolute top-4 right-4 text-gray-500" />
                        </div>
                        <PerfilCreateModal/>
                    </div>
                    {
                        loading && <LoaderPages/>
                    }
                    <MainTable 
                        data={usuarios} 
                        columns={columns} 
                        title={"Usuários"}
                    />
                </div>
            </div>
        </section>
    );
}