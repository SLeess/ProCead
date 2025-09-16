import "./GerenciarPerfisPermissoes.css";
import { useContext, useEffect, useState } from "react";
import { useAppContext } from "@/Contexts/AppContext";
import { useParams } from "react-router-dom";
import InformacoesGerais from "../../Components/InformacoesGerais";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";
import { toast } from "react-toastify";
import { NavigationContext } from "@/Contexts/NavigationContext";
import Swal from "sweetalert2";
import TableSetPermissionsToRole from "@/Components/Global/Tables/TableSetPermissionsToRole/TableSetPermissionsToRole";

export default function GerenciarPerfisPermissoes()
{
    const { perfilId } = useParams();
    const { token, verifyStatusRequest, apiAsyncFetch } = useAppContext();
    const { navigate } = useContext(NavigationContext);
    
    const [role, setRole] = useState({});
    
    const [allPermissions, setAllPermissions] = useState([]);
    const [initialSelectedPermissions, setInitialSelectedPermissions] = useState([]);
    
    const [tableData, setTableData] = useState([]);

    const [selectedPermissions, setSelectedPermissions] = useState({});
    
    const [loading, setLoading] = useState(true);

    const [hasBeenUpdated, setHasBeenUpdated] = useState(false);

    // =================================================================================
    // HOOK DE EFEITO Nº 1: REQUISIÇÕES PARA BUSCAR OS DADOS ESPECIFICOS DO CARGO E SUAS
    // Permissões atreladas, permitindo efetuar uma atualização posteriormente, só roda
    // caso mude o id do cargo
    // =================================================================================

    useEffect(() => {
        const fetchProcessos = async () => {
            setLoading(true);
            // await new Promise(resolve => setTimeout(resolve, 5000));
            try {
                const resRolePermissions = await fetch(`/api/super-admin/roles-with-permissions/${perfilId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (resRolePermissions.status === 404) {
                        Swal.fire({
                        title: 'Erro ao Buscar Usuário',
                        text: `Não foi possível encontrar o O perfil com ID ${perfilId} solicitado. Verifique o ID e tente novamente.`,
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
                    return true;
                }

                const resultRolePermissions = await resRolePermissions.json();
                
                if (!resRolePermissions.ok) {
                    verifyStatusRequest(resRolePermissions.status, resultRolePermissions);
                    throw new Error(`Erro ao buscar as permissões atreladas ao cargo: ${resRolePermissions.status} ${resRolePermissions.statusText}`);
                } else{
                    setRole((e) => ({...e, 
                        id: resultRolePermissions.data.id,
                        nome: resultRolePermissions.data.name,
                        escopo: resultRolePermissions.data.scope,
                        updated_at: resultRolePermissions.data.updated_at
                    }));

                    setInitialSelectedPermissions(resultRolePermissions.data.related_permissions_ids);

                }
                const resAllPermissions = await fetch(`/api/super-admin/permissions-scope/${resultRolePermissions.data.scope}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                
                const resultAllPermissions = await resAllPermissions.json();
                if ( !resAllPermissions.ok) {
                    verifyStatusRequest(resAllPermissions.status, resultAllPermissions);
                    throw new Error(`Erro ao buscar as permissões: ${resAllPermissions.status} ${resAllPermissions.statusText}`);
                } else {
                    setAllPermissions((a) => ({...a,
                        ...resultAllPermissions.data.permissions
                    }));
                }
            } catch (err) {
                toast.error("Não foi possível carregar seus processos seletivos. " + (err.message ? ` (${err.message})` : ''))
            } finally {
                setLoading(false);
            }
        };
        fetchProcessos();
    }, [perfilId, token, hasBeenUpdated]);
    
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!role || !role.id) {
            toast.error("Não foi possível identificar o perfil. Tente recarregar a página.");
            setLoading(false);
            return; // Interrompe a execução
        }

        try {

            const result = await apiAsyncFetch({
                url: `/api/super-admin/roles-with-permissions/${role.id}`,
                method: "POST",
                body: {
                    role_id: role.id,
                    permissions: selectedPermissions.permissions,
                    _method: 'PUT',
                }
            });
            
            toast.success(`${result.data.message || "Os dados e permissões do cargo foram atualizados."}`);
            setHasBeenUpdated((h) => !h);
        } catch (err) {
            toast.error("Não foi atualizar os dados do cargo. " + (err.message ? ` (${err.message})` : ''))
        } finally {
            setLoading(false);
        }
        
    };

    if (loading) return <LoaderPages />;

    return (
        <section id="gerenciar_perfis_permissoes">
            <header>
                <h1>Gerenciar Perfis - Permissões</h1>
            </header>
            <div id="content">
                <div id="informacoes_gerais" className="">
                    <InformacoesGerais role={role} setRole={setRole} readOnly={true}/>
                </div>
                <TableSetPermissionsToRole 
                    tableData={tableData}
                    setTableData={setTableData}
                    allPermissions={allPermissions} 
                    initialSelectedPermissions={initialSelectedPermissions}
                    hasBeenUpdated={hasBeenUpdated}
                    setSelectedPermissions={setSelectedPermissions}
                />
                <form onSubmit={handleOnSubmit}>
                    <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer focus:outline-none">Cancelar</button>
                    <button type="submit" className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)] focus:outline-none cursor-pointer">Salvar</button>
                </form>
            </div>
        </section>
    );
}