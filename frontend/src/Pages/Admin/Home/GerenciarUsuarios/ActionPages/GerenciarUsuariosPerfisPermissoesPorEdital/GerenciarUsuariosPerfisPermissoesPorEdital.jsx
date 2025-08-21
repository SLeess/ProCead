import { useParams } from "react-router-dom";
import "./GerenciarUsuariosPerfisPermissoesPorEdital.css";
import { useAppContext } from "@/Contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { NavigationContext } from "@/Contexts/NavigationContext";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";
import InformacoesGeraisComEditall from "../../Components/InformacoesGeraisComEditall";
import Swal from "sweetalert2";

export default function GerenciarUsuariosPerfisPermissoesPorEdital()
{
    const { apiAsyncFetch } = useAppContext();
    const { userId, editalId } = useParams();
    const { navigate } = useContext(NavigationContext);
    const [user, setUser] = useState({});
    const [localPermissions, setLocalPermissions] = useState([]);
    const [localRoles, setLocalRoles] = useState([]);
    const [edital, setEdital] = useState([]);

    // const columns = useMemo(() => columnsGerenciarUsuariosPerfisPermissoes(navigate, userId), [navigate, userId]);

    const [loading, setLoading] = useState(true);
    const [cantShow, setCantShow] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const result = await apiAsyncFetch(
                    'GET', 
                    `/api/super-admin/users/${userId}/permissions`, 
                    null,
                    true,
                    false,
                );

                const resRoles = await apiAsyncFetch(
                    'GET', 
                    `/api/super-admin/roles-scope/local`, 
                );
                const resPerms = await apiAsyncFetch(
                    'GET', 
                    `/api/super-admin/permissions-scope/local`, 
                );

                const resEditais = await apiAsyncFetch(
                    'GET',
                    `/api/admin/editais/${editalId}`,
                    null,
                    true,
                    false,
                );
                setLocalRoles(resRoles.data.roles);
                setLocalPermissions(Object.values(resPerms.data.permissions).flat());
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
    }, [userId, editalId]);

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
                                    {/* <TabelaCargosGlobais perfisGlobais={globalRoles}/> */}
                                </div>
                                <div id="atribuir_permissoes_globais" className="col-span-12 sm:col-span-1 md:col-span-6">
                                    {/* <TabelaPermissoesGlobais permissoesGlobais={localPermissions}/> */}
                                </div>
                            </div>
                            {/* <MainTable 
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
                            /> */}
                            <form onSubmit={handleOnSubmit}>
                                <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer focus:outline-none">Cancelar</button>
                                <button type="submit" className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)] focus:outline-none cursor-pointer">Salvar</button>
                            </form>
                        </div>
                    }
                </section>
    </>);
}