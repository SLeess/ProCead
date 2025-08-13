import "./GerenciarPerfisPermissoes.css";
import MainTable from "@/Components/Global/Tables/MainTable/MainTable";
import getColumns from "./columns";
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "@/Contexts/AppContext";
import { useParams } from "react-router-dom";
import InformacoesGerais from "./Components/InformacoesGerais";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";
import { toast } from "react-toastify";

export default function GerenciarPerfisPermissoes()
{
    const { perfilId } = useParams();
    const { token, verifyStatusRequest } = useAppContext();
    
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
                const resRolePermissions = await fetch(`/api/super-admin/roles/${perfilId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const resultRolePermissions = await resRolePermissions.json();
                if (!resRolePermissions.ok) {
                    verifyStatusRequest(resRolePermissions);
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
                    verifyStatusRequest(resAllPermissions);
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

    // =================================================================================
    // HOOK DE EFEITO Nº 2: APENAS PARA TRANSFORMAR OS DADOS PARA A TABELA
    // Roda somente depois que os dados da API (allPermissions) forem carregados.
    // =================================================================================

    /**
     * Opcional -- é uma função pra ordenar os grupos de permissões para exibir primeiro as linhas
     * com mais permissões e por ultimo as que tem menos
     * @param {*} a 
     * @param {*} b 
     * @returns 
     */
    const sortDataByQtdOfInputs = (a, b) => {
        const qtdInputsA = Object.values(a).filter((e) => e=== true || e=== false).length;
        const qtdInputsB = Object.values(b).filter((e) => e=== true || e=== false).length;
        return qtdInputsB - qtdInputsA;
    };
    
    useEffect(() => {
        if (Object.keys(allPermissions).length === 0) {
            setTableData([]);
            return;
        }

        const selectedIdsSet = new Set(initialSelectedPermissions);

        const formattedData = Object.entries(allPermissions)
        .filter(([groupName, permissions]) => 
            !groupName.includes('avaliar')
        )
        .map(([groupName, groupPerm]) => {
            const permissionsMap = new Map(groupPerm.map(perm => [perm.name, perm]));

            const visualizarPerm = permissionsMap.get(`visualizar-${groupName}`);
            const criarPerm = permissionsMap.get(`cadastrar-${groupName}`);
            const atualizarPerm = permissionsMap.get(`editar-${groupName}`);
            const deletarPerm = permissionsMap.get(`deletar-${groupName}`);

            return {
                name_permission: String(groupName).toUpperCase().replace(/[-_]/g, ' '),
                visualizar: visualizarPerm ? selectedIdsSet.has(visualizarPerm.id.toString()) : null,
                criar: criarPerm ? selectedIdsSet.has(criarPerm.id.toString()) : null,
                atualizar: atualizarPerm ? selectedIdsSet.has(atualizarPerm.id.toString()) : null,
                deletar: deletarPerm ? selectedIdsSet.has(deletarPerm.id.toString()) : null,
            };
        });

        setTableData(formattedData.sort((a, b) => sortDataByQtdOfInputs(a, b)));

    }, [allPermissions, initialSelectedPermissions, hasBeenUpdated]); // Depende dos dados brutos

    // =================================================================================
    // HOOK DE EFEITO Nº 3: PARA SINCRONIZAR A TABELA COM A LISTA DE IDs
    // Roda sempre que o usuário marca ou desmarca um checkbox (alterando tableData).
    // =================================================================================
    useEffect(() => {
        if (Object.keys(allPermissions).length === 0) return;

        const permissionNameToIdMap = new Map(
            Object.values(allPermissions)
                .flat()
                .map(perm => [perm.name, perm.id.toString()])
        );

        const newSelectedIds = [];

        tableData.forEach(row => {
            const groupName = row.name_permission.toLowerCase().replace(/ /g, '-');

            if (row.visualizar === true) {
                const id = permissionNameToIdMap.get(`visualizar-${groupName}`);
                if (id) newSelectedIds.push(id);
            }
            if (row.criar === true) {
                const id = permissionNameToIdMap.get(`cadastrar-${groupName}`);
                if (id) newSelectedIds.push(id);
            }
            if (row.atualizar === true) {
                const id = permissionNameToIdMap.get(`editar-${groupName}`);
                if (id) newSelectedIds.push(id);
            }
            if (row.deletar === true) {
                const id = permissionNameToIdMap.get(`deletar-${groupName}`);
                if (id) newSelectedIds.push(id);
            }
        });

        setSelectedPermissions((f) => ({...f, permissions: newSelectedIds}));

    }, [tableData]); // Depende de tableData e allPermissions

    const updatePermission = (rowIndex, columnId, value) => {
        setTableData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    };
                }
                return row;
            })
        );
    };

    const toggleAllRowPermissions = (rowIndex, currentState) => {
        const newValue = !currentState;
        setTableData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...row,
                        visualizar: row["visualizar"] !== null ? newValue: null,
                        criar: row["criar"] !== null ? newValue: null,
                        atualizar: row["atualizar"] !== null ? newValue: null,
                        deletar: row["deletar"] !== null ? newValue: null,
                    };
                }
                return row;
            })
        );
    };
    const columns = useMemo(() => getColumns(updatePermission, toggleAllRowPermissions, setTableData), [hasBeenUpdated]);
    
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!role || !role.id) {
            toast.error("Não foi possível identificar o perfil. Tente recarregar a página.");
            setLoading(false);
            return; // Interrompe a execução
        }

        try {
            
            const formData = {
                role_id: role.id,
                permissions: selectedPermissions.permissions,
                role_data: {
                    name: role.nome,
                    scope: role.escopo,
                },
                _method: 'PUT',
            };
            console.log(formData);

            const res = await fetch(`/api/super-admin/roles/${role.id}`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            const result = await res.json();

            if (!result.success || !res.ok) {
                if (result.errors) {
                    console.log(result);
                    Object.values(result.errors).forEach(errorArray => {
                        errorArray.forEach((errorMessage) => toast.error(errorMessage));
                    });
                } else {
                    verifyStatusRequest(res);
                    throw new Error(`Erro ao atualizar o cargo e suas permissões: ${res.status} ${res.statusText}`);
                }
            } else {
                toast.success(`${result.data.message || "Os dados e permissões do cargo foram atualizados."}`);
                setHasBeenUpdated((h) => !h);
            }
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
                    <InformacoesGerais role={role} setRole={setRole}/>
                </div>
                <MainTable 
                    data={tableData} 
                    columns={columns} 
                    title={"Permissões"}
                    hasShadowBorderStyle={false}
                    hasPaddingStyle={false}
                    canExport={false}
                    canHiddenColumns={false}
                    hasSelectForRows={false}
                    hasCountSelectedLines={false}
                />
                <form onSubmit={handleOnSubmit}>
                    <button className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)] focus:outline-none cursor-pointer">Enviar</button>
                </form>
            </div>
        </section>
    );
}