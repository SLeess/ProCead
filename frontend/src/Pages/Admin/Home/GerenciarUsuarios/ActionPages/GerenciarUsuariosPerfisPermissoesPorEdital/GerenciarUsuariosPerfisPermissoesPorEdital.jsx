import { useParams } from "react-router-dom";
import "./GerenciarUsuariosPerfisPermissoesPorEdital.css";
import { useAppContext } from "@/Contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { NavigationContext } from "@/Contexts/NavigationContext";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";
import InformacoesGeraisComEditall from "../../Components/InformacoesGeraisComEditall";
import Swal from "sweetalert2";
import TabelaCargos from "@/Components/Global/Tables/TableCargos/TabelaCargos";
import TableSetPermissoesLocais from "@/Components/Global/Tables/TableSetPermissoesLocais/TableSetPermissoesLocais";

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
    const [initialSelectedRoles, setInitialSelectedRoles] = useState([]);
    const [disabledPermissions, setDisabledPermissions] = useState([]);

    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);

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
                const resRolesWPerms = await apiAsyncFetch({
                    url: `/api/super-admin/roles-with-permissions-scope-local`,
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

                /**
                 *  Pegar a lista de nomes de perfis que o usuário tem (ex: ['super-Admin']) e encontrar os IDs 
                 *  correspondentes na lista de todos os perfis disponíveis (resRoles.data.roles).
                 */
                    const userRoleNames = new Set(result.data.admin_access.editals_access[editalId]?.roles);

                    const allRoles = resRoles.data.roles;
                    const allPerms = Object.values(resPerms.data.permissions).flat();

                    const initialRolesIds = allRoles
                        .filter(role => userRoleNames.has(role.nome)).map((role) => role.id); 
                        
                    setInitialSelectedRoles(initialRolesIds);
                /**                                                                                                 **\
                 * ------------------------------------------------------------------------------------------------ *
                 */
                    const directPermsByEdital = new Set(result.data.admin_access.editals_access[editalId]?.direct_permissions);
                    const inheritedPermsByEdital = new Set(result.data.admin_access.editals_access[editalId]?.inherited_permissions);
                    const initialPermsIdS = allPerms
                            .filter(perm => directPermsByEdital.has(perm.name)).map((perm) => perm.id);

                    const disabledPermsIdS = allPerms
                            .filter(perm => inheritedPermsByEdital.has(perm.name)).map((perm) => perm.id);

                    
                    setInitialSelectedPermissions([...initialPermsIdS]);
                    setDisabledPermissions(disabledPermsIdS);
                /**                                                                                                 **\
                 * ------------------------------------------------------------------------------------------------ *
                 */
                setAllLocalRoles(resRolesWPerms.data.roles);
                setAllLocalPermissions(resPerms.data.permissions);
                
                setUser(result.data.user);
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

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log("IDs dos perfis locais selecionados:", selectedRoles);
        console.log("IDs das perms locais selecionados:", Object.values(selectedPermissions));
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
                            <form onSubmit={handleOnSubmit}>
                                <div id="relacoes_globais">
                                    <div id="atribuir_cargos_globais" className="col-span-12 sm:col-span-1 md:col-span-6">
                                        <TabelaCargos 
                                            perfis={allLocalRoles} 
                                            escopo={"Locais"} 
                                            setSelectedRoles={setSelectedRoles}
                                            initialSelectedRoles={initialSelectedRoles}
                                            setDisabledPermissions={setDisabledPermissions}
                                        />
                                    </div>
                                </div>
                                <div id="tables">
                                    <TableSetPermissoesLocais
                                        tableData={tablePermissionsData}
                                        setTableData={setTablePermissionsData}
                                        allPermissions={allLocalPermissions}
                                        initialSelectedPermissions={initialSelectedPermissions}
                                        disabledInheritPermissions={disabledPermissions}
                                        hasBeenUpdated={hasBeenUpdated}
                                        setSelectedPermissions={setSelectedPermissions}
                                        selectedPermissions={selectedPermissions}
                                    />
                                </div>
                                <div className="btnActions">
                                    <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer focus:outline-none">Cancelar</button>
                                    <button type="submit" className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)] focus:outline-none cursor-pointer">Salvar</button>
                                </div>
                            </form>
                        </div>
                    }
                </section>
    </>);
}