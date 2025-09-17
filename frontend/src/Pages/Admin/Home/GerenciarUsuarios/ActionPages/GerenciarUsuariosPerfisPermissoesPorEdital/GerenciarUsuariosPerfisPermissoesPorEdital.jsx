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
import { toast } from "react-toastify";

export default function GerenciarUsuariosPerfisPermissoesPorEdital()
{
    const { apiAsyncFetch } = useAppContext();
    const { userId, editalId } = useParams();
    const { navigate } = useContext(NavigationContext);
    const [user, setUser] = useState({});

    const [localPermissions, setLocalPermissions] = useState([]);
    const [localRoles, setLocalRoles] = useState([]);
    
    const [tablePermissionsData, setTablePermissionsData] = useState([]);

    const [initialSelectedPermissions, setInitialSelectedPermissions] = useState([]);
    const [initialSelectedRoles, setInitialSelectedRoles] = useState([]);
    const [disabledPermissions, setDisabledInheritPermissions] = useState([]);

    const [selectedRoles, setSelectedRoles] = useState(null);
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
                // const resRoles = await apiAsyncFetch({
                //     url: `/api/super-admin/roles-scope/local`, 
                // });
                const resPerms = await apiAsyncFetch({
                    url: `/api/super-admin/permissions-scope/local`, 
                });
                const resEditais = await apiAsyncFetch({
                    url: `/api/admin/editais/${editalId}/show`,
                    enableToast: false,
                });

                setLocalRoles(resRolesWPerms.data.roles);
                setLocalPermissions(resPerms.data.permissions);
                
                setUser({...result.data.user, ['admin_access']: {...result.data?.admin_access}});
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

    /**
     *  Pegar a lista de nomes de perfis que o usuário tem (ex: ['Analista de Matrículas']) e encontrar os IDs 
     *  correspondentes na lista de todos os perfis disponíveis (resRoles.data.roles).
     */
    function getInitialRolesId(){
        const userRoleNames = new Set(user?.admin_access?.editals_access?.[editalId]?.roles || []);
        
        return localRoles
            .filter(role => userRoleNames.has(role.name)).map((role) => role.id);
    }
    /**
     *  Pegar a lista de nomes de permissões que o usuário tem (ex: ['visualizar-inscricoes']) e encontrar os IDs 
     *  correspondentes na lista de todos os perfis disponíveis (resPerms.data.permissions).
     *  Como as permissões listadas ao todo estão agrupadas por nomes, é preciso dar um flat() na coleção.
     */
    function getInitialPermsId(){
        const userPermsNames = new Set(user?.admin_access?.editals_access?.[editalId]?.direct_permissions || []);

        const allUngroupedPermissions = Object.values(localPermissions).flat();
        
        return allUngroupedPermissions
            .filter(perm => userPermsNames.has(perm.name)).map((perm) => perm.id);
    }

    useEffect(() => {
        setInitialSelectedRoles(getInitialRolesId());
        setInitialSelectedPermissions(getInitialPermsId());
    }, [localPermissions, localRoles, editalId, user?.admin_access?.editals_access]);
    
        
    useEffect(() => {
        /**
         *  A cada cargo que for selecionado a tabela de permissões é rendeerizada, de modo que as permissões
         *  atreladas ao cargo são marcadas e desabilitadas, independente de elas estarem antes marcadas ou não,
         *  pra impedir redundâncias, se a pessoa tem um cargo que tem a permissão X, pra que ela também precisa ter
         *  essa permissão X diretamente atrelada? Dito isso, as permissões previamente marcadas para o pós render serão
         *  as permissões anteriormente marcadas, que não estão relacionadas com o cargo selecionado.
         */

        if (selectedRoles === null) {
            return;
        }
        const rolesSelecionados = localRoles.filter(role => selectedRoles.includes(role.id));
        const permissoesHerdadas = rolesSelecionados.flatMap(role => role.related_permissions_ids || []);

        setDisabledInheritPermissions([...new Set(permissoesHerdadas)]);
        setInitialSelectedPermissions(
            [...(selectedPermissions["permissions"] || []).filter(i => !permissoesHerdadas.includes(i))]
        );
    }, [selectedRoles, localRoles]);


    const preventSubmit = async (evt) => {
            evt.preventDefault();
            Swal.fire({
                icon: "question",
                title: "Alteração em andamento.",
                text: `Atenção! Você confirma as alterações de cargos e de permissões do usuário '${user.nome}' para o '${edital.descricao}' ?`,
                // text: "Essa ação não poderá ser reversível!",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirma',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    handleOnSubmit();
                }
            });
        }
    
        const handleOnSubmit = async () => {
            try {
                const result = await apiAsyncFetch({
                    url: `/api/super-admin/users/${user.uuid}/set-roles-and-permissions/local`,
                    method: "PATCH",
                    body: {
                        "roles": selectedRoles,
                        "permissions" : selectedPermissions?.permissions || [],
                        "edital_id": editalId
                    }
                });
                toast.success("Alterações realizadas com sucesso!");
                
            } catch (error) {
                console.error(error);
                if (!error.handled) {
                    Swal.fire({
                        title: 'Erro ao Atualizar as permissões e cargos do Usuário.',
                        text: `Não foi possível atualizar as permissões do usuário no edital '${editalId}'. ` + (error.message ? ` (${error.message})` : ''),
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
                setHasBeenUpdated((h) => !h);
            }
        };
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
                                    <TabelaCargos 
                                        perfis={localRoles} 
                                        escopo={"Locais"} 
                                        setSelectedRoles={setSelectedRoles}
                                        initialSelectedRoles={initialSelectedRoles}
                                        setDisabledInheritPermissions={setDisabledInheritPermissions}
                                    />
                                </div>
                            </div>
                            <div id="tables">
                                <TableSetPermissoesLocais
                                    tableData={tablePermissionsData}
                                    setTableData={setTablePermissionsData}
                                    allPermissions={localPermissions}
                                    initialSelectedPermissions={initialSelectedPermissions}
                                    disabledInheritPermissions={disabledPermissions}
                                    hasBeenUpdated={hasBeenUpdated}
                                    setSelectedPermissions={setSelectedPermissions}
                                    selectedPermissions={selectedPermissions}
                                />
                            </div>
                            <form onSubmit={preventSubmit}>
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