import { NavigationContext } from "@/Contexts/NavigationContext";
import "./GerenciarUsuariosPerfisPermissoes.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { useAppContext } from "@/Contexts/AppContext";
import { useParams } from "react-router-dom";
import MainTable from "@/Components/Global/Tables/MainTable/MainTable";
import { toast } from "react-toastify";
import InformacoesGerais from "../../Components/InformacoesGerais";
import Swal from "sweetalert2";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";
import columnsGerenciarUsuariosPerfisPermissoes from "./columns";
import TabelaCargos from "@/Components/Global/Tables/TableCargos/TabelaCargos";
import TabelaPermissoesGlobais from "@/Components/Global/Tables/TablePermissoesGlobais/TabelaPermissoesGlobais";

export default function GerenciarUsuariosPerfisPermissoes()
{
    const { userId } = useParams();
    const { apiAsyncFetch } = useAppContext();
    const { navigate } = useContext(NavigationContext);
    const [user, setUser] = useState({});

    const [globalPermissions, setGlobalPermissions] = useState([]);
    const [globalRoles, setGlobalRoles] = useState([]);
    
    const [initialSelectedRoles, setInitialSelectedRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [disabledInheritPermissions, setDisabledInheritPermissions] = useState([]);

    const [initialSelectedPermissions, setInitialSelectedPerms] = useState([]);
    const [selectedPerms, setSelectedPerms] = useState([]);


    const [editais, setEditais] = useState([]);

    const columns = useMemo(() => columnsGerenciarUsuariosPerfisPermissoes(navigate, userId), [navigate, userId]);

    const [loading, setLoading] = useState(true);
    const [cantShow, setCantShow] = useState(true);
    const [hasBeenUpdated, setHasBeenUpdated] = useState(false);

    useEffect(
        () => {
            const fetchData = async () => {
                setLoading(true);

                try {
                    const result = await apiAsyncFetch({
                        url: `/api/super-admin/users/${userId}/permissions`, 
                    });

                    const resRoles = await apiAsyncFetch({
                        url: `/api/super-admin/roles-scope/global`, 
                    });
                    const resPerms = await apiAsyncFetch({
                        url: `/api/super-admin/permissions-scope/global`, 
                    });

                    const resEditais = await apiAsyncFetch({
                        url: `/api/admin/editais/`,
                    });
                    setGlobalRoles(resRoles.data.roles);
                    setGlobalPermissions(Object.values(resPerms.data.permissions).flat());
                    
                    setUser({...result.data.user, ['admin_access']: {...result.data?.admin_access}});
                    setEditais(resEditais.data.data);
                    setCantShow(false);
                } catch (err) {
                    console.error(err);
                    if (!err.handled) {
                        Swal.fire({
                            title: 'Erro ao Buscar Usuário',
                            text: "Não foi possível carregar os dados do usuário. " + (err.message ? ` (${err.message})` : ''),
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
        }, 
        [userId, hasBeenUpdated]
    );

    useEffect(() => {
        /**
         *  Pegar a lista de nomes de perfis que o usuário tem (ex: ['super-Admin']) e encontrar os IDs 
         *  correspondentes na lista de todos os perfis disponíveis (resRoles.data.roles).
         */
            const userRoleNames = new Set(user?.admin_access?.global_roles || []);
            const userPermsNames = new Set(user?.admin_access?.global_permissions || []);

            const initialRolesIds = globalRoles
                .filter(role => userRoleNames.has(role.nome)).map((role) => role.id);

            const initialPermsIds = globalPermissions
                .filter(perm => userPermsNames.has(perm.name)).map((perm) => perm.id);

            setInitialSelectedRoles(initialRolesIds);
            setInitialSelectedPerms(initialPermsIds);
        /**                                                                                                 **\
         * ------------------------------------------------------------------------------------------------ *
         */
    }, [globalPermissions, globalRoles, user?.admin_access?.global_permissions, user?.admin_access?.global_roles]);

    
    useEffect(() => {
        /**
         *  Pegar a lista de nomes de perfis que o usuário tem (ex: ['super-Admin']) e encontrar os IDs 
         *  correspondentes às permissões que possuem a relação com o perfil especificado, de modo a desabilidá-las 
         *  de seleção na tabela de seleção de permissões globais
         */
        const rolesSelecionados = globalRoles.filter(role => selectedRoles.includes(role.id));
        const permissoesHerdadas = rolesSelecionados.flatMap(role => role.related_permissions_ids || []);
        
        setDisabledInheritPermissions([...new Set(permissoesHerdadas)]);
        setInitialSelectedPerms([...(selectedPerms).filter(i => !permissoesHerdadas.includes(i))]);
        /**                                                                                                 **\
         * ------------------------------------------------------------------------------------------------ *
         */
    }, [selectedRoles]);

    const preventSubmit = async (evt) => {
        evt.preventDefault();
        Swal.fire({
            icon: "question",
            title: "Alteração em andamento.",
            text: `Atenção! Você confirma as alterações de cargos e de permissões do usuário '${user.nome}' ?`,
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
                url: `/api/super-admin/users/${user.uuid}/set-roles-and-permissions/global`,
                method: "PATCH",
                body: {
                    "roles": selectedRoles,
                    "permissions": selectedPerms
                }
            });
            toast.success("Alterações realizadas com sucesso!");
            
        } catch (error) {
            console.error(error);
            if (!error.handled) {
                Swal.fire({
                    title: 'Erro ao Buscar Usuário',
                    text: "Não foi possível atualizar os dados do usuário. " + (error.message ? ` (${error.message})` : ''),
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
    

    return (<>
        <section id="gerenciar_usuarios_perfis_permissoes">
            <header>
                <h1>Gerenciar Usuários - Atribuir Perfis e Permissões</h1>
            </header>
            {
                loading && <LoaderPages/>
            }
            {
                !loading && !cantShow &&
                <div id="content">
                    <div id="informacoes_gerais" className="">
                        <InformacoesGerais user={user}/>
                    </div>
                    <div id="relacoes_globais">
                        <div id="atribuir_cargos_globais" className="col-span-12 sm:col-span-1 md:col-span-6">
                            <TabelaCargos 
                                perfis={globalRoles} 
                                escopo={"Globais"}
                                setSelectedRoles={setSelectedRoles}
                                initialSelectedRoles={initialSelectedRoles}
                            />
                        </div>
                        <div id="atribuir_permissoes_globais" className="col-span-12 sm:col-span-1 md:col-span-6 lg:col-span-5 lg:col-end-13">
                            <TabelaPermissoesGlobais 
                                permissoesGlobais={globalPermissions}
                                setSelectedPerms={setSelectedPerms}
                                initialSelectedPermissions={initialSelectedPermissions}
                                disabledInheritPermissions={disabledInheritPermissions}
                            />
                        </div>
                    </div>
                    <MainTable 
                        data={editais} 
                        columns={columns} 
                        title={"Atribuir Perfis por Edital"}
                        subtitle={"As permissões relacionadas aos perfis por edital são locais, ou seja, somente são conferidas ao respectivo usuário dentro do edital escolhido abaixo."}
                        hasShadowBorderStyle={false}
                        hasPaddingStyle={false}
                        canExport={false}
                        canHiddenColumns={false}
                        hasSelectForRows={false}
                        hasCountSelectedLines={false}
                        pageSize={5}
                    />
                    <form onSubmit={preventSubmit}>
                        <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer focus:outline-none">Cancelar</button>
                        <button type="submit" className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)] focus:outline-none cursor-pointer">Salvar</button>
                    </form>
                </div>
            }
        </section>
    </>);
}