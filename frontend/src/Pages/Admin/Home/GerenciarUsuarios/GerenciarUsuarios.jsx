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
import Swal from "sweetalert2";
import UserCreateModal from "@/Components/Admin/InsideEdital/Modais/Usuario/UserCreateModal";

export default function GerenciarUsuarios(){
    const { apiAsyncFetch } = useAppContext();
    const { navigate } = useContext(NavigationContext);

    const columns = useMemo(() => GerenciarUsuariosColumns(navigate), [navigate]);

    const [totalUsuarios, setTotalUsuarios] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    
    /** ------------------ Lidando com Filtros ------------------ **/
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cantShow, setCantShow] = useState(true);
    useEffect(() => {
        const fetchProcessos = async () => {
            setLoading(true);
            try{
                const result = await apiAsyncFetch({
                    url: `/api/super-admin/users`, 
                });
                setTotalUsuarios(result?.data?.meta?.total);
                setUsuarios(result?.data?.users);
                setCantShow(false);
            } catch (err) {
                console.error(err);
                if (!err.handled) {
                    Swal.fire({
                        title: 'Erro ao Buscar Usuário',
                        text: "Não foi possível atualizar os dados do usuário. " + (err.message ? ` (${err.message})` : ''),
                        icon: 'error',
                        confirmButtonText: 'Voltar',
                        confirmButtonColor: '#3085d6',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate(-1);
                        }
                    });
                }
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
                {
                    loading && <LoaderPages/>
                }
                {
                    !loading && !cantShow &&
                    <>
                        <div className="sm:flex items-center justify-between  mb-4">
                            <div className="bg-white shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
                                <p className="text-gray-600 mb-1">Nº de Usuários</p>
                                <p className="text-2xl font-bold mb-1">{totalUsuarios}</p>
                                <UserRoundPen className="absolute top-4 right-4 text-gray-500" />
                            </div>
                            <UserCreateModal/>
                        </div>
                        
                        <MainTable 
                            data={usuarios} 
                            columns={columns} 
                            title={"Usuários"}
                        />
                    </>
                }
                </div>
            </div>
        </section>
    );
}