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
import TabelaCargosGlobais from "@/Components/Global/Tables/TableCargosGlobais/TabelaCargosGlobais";
import TabelaPermissoesGlobais from "@/Components/Global/Tables/TablePermissoesGlobais/TabelaPermissoesGlobais";

export default function GerenciarUsuariosPerfisPermissoes()
{
    const { userId } = useParams();
    const { apiAsyncFetch } = useAppContext();
    const { navigate } = useContext(NavigationContext);
    const [user, setUser] = useState({});
    const [globalPermissions, setGlobalPermissions] = useState([]);
    const [globalRoles, setGlobalRoles] = useState([]);
    const [editais, setEditais] = useState([]);

    const columns = useMemo(() => columnsGerenciarUsuariosPerfisPermissoes(navigate, userId), [navigate, userId]);

    const [loading, setLoading] = useState(true);
    const [cantShow, setCantShow] = useState(true);

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
                    setUser(result.data.user);
                    setEditais(resEditais.data.data);
                    setCantShow(false);
                } catch (err) {
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
        [userId]
    );

    const handleOnSubmit = async () => {};

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
                            <TabelaCargosGlobais perfisGlobais={globalRoles}/>
                        </div>
                        <div id="atribuir_permissoes_globais" className="col-span-12 sm:col-span-1 md:col-span-6">
                            <TabelaPermissoesGlobais permissoesGlobais={globalPermissions}/>
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
                    <form onSubmit={handleOnSubmit}>
                        <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer focus:outline-none">Cancelar</button>
                        <button type="submit" className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)] focus:outline-none cursor-pointer">Salvar</button>
                    </form>
                </div>
            }
        </section>
    </>);
}