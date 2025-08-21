import { useParams } from "react-router-dom";
import "./GerenciarUsuariosPerfisPermissoesPorEdital.css";
import { useAppContext } from "@/Contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { NavigationContext } from "@/Contexts/NavigationContext";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";
import InformacoesGeraisComEditall from "../../Components/InformacoesGeraisComEditall";
import Swal from "sweetalert2";
import TableSetPermissionsToRole from "@/Components/Global/Tables/TableSetPermissionsToRole/TableSetPermissionsToRole";
import TabelaCargos from "@/Components/Global/Tables/TableCargos/TabelaCargos";

export default function GerenciarUsuariosPerfisPermissoesPorEdital()
{
    const { apiAsyncFetch } = useAppContext();
    const { userId, editalId } = useParams();
    const { navigate } = useContext(NavigationContext);
    const [user, setUser] = useState({});
    const [allLocalPermissions, setAllLocalPermissions] = useState([]);
    const [allLocalRoles, setAllLocalRoles] = useState([]);
    const [tablePermissionsData, setTablePermissionsData] = useState([]);
    const [initialSelectedPermissions, setInitialSelectedPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState({});
    const [edital, setEdital] = useState([]);

    const [hasBeenUpdated, setHasBeenUpdated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cantShow, setCantShow] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                
                const result = await apiAsyncFetch({
                    url: `/api/super-admin/users/${userId}/permissions`, 
                    enableToast: false,
                });

                const resRoles = await apiAsyncFetch({
                    url: `/api/super-admin/roles-scope/local`, 
                });
                const resPerms = await apiAsyncFetch({
                    url: `/api/super-admin/permissions-scope/local`, 
                });
                const resEditais = await apiAsyncFetch({
                    url: `/api/admin/editais/${editalId}`,
                    enableToast: false,
                });

                setAllLocalRoles(resRoles.data.roles);
                setAllLocalPermissions(resPerms.data.permissions);
                setUser(result.data.user);
                setInitialSelectedPermissions(result.data.admin_access.editals_access[editalId]);
                setEdital(resEditais.data);
                setCantShow(false);
            } catch (err) {
                if (!err.handled) {
                    Swal.fire({
                        title: 'Erro ao Buscar Usuário',
                        text: (err.message ? ` ${err.message}` : 'Não foi possível carregar os dados do solicitados.'),
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
            } finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [userId, editalId, hasBeenUpdated]);

    const handleOnSubmit = async () => {

    }
    return(<>
         <section id="gerenciar_usuarios_perfis_permissoes_por_id">
                    <header>
                        <h1>Gerenciar Usuários - Atribuir Perfis e Permissões por Edital</h1>
                    </header>
                    {
                        loading && <LoaderPages/>
                    }
                    {
                        !loading && !cantShow &&
                        <div id="content">
                            <div id="informacoes_gerais" className="">
                                <InformacoesGeraisComEditall user={user} edital={edital}/>
                            </div>
                            <div id="relacoes_globais">
                                <div id="atribuir_cargos_globais" className="col-span-12 sm:col-span-1 md:col-span-6">
                                    <TabelaCargos perfis={allLocalRoles} escopo={"Locais"}/>
                                </div>
                            </div>
                            <div id="tables">
                                <TableSetPermissionsToRole
                                    tableData={tablePermissionsData}
                                    setTableData={setTablePermissionsData}
                                    allPermissions={allLocalPermissions}
                                    initialSelectedPermissions={initialSelectedPermissions}
                                    hasBeenUpdated={hasBeenUpdated}
                                    setSelectedPermissions={setSelectedPermissions}
                                />
                            </div>
                            <form onSubmit={handleOnSubmit}>
                                <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer focus:outline-none">Cancelar</button>
                                <button type="submit" className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)] focus:outline-none cursor-pointer">Salvar</button>
                            </form>
                        </div>
                    }
                </section>
    </>);
}