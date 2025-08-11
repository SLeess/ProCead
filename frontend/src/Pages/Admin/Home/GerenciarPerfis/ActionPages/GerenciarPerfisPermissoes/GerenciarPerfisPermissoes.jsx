import "./GerenciarPerfisPermissoes.css";
import MainTable from "@/Components/Global/Tables/MainTable/MainTable";
import data from "./data";
import getColumns from "./columns";
// import { TextInput } from "flowbite-react";
import { FormField, SelectInput, TextInput } from "@/Components/Global/ui/modals";
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "@/Contexts/AppContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InformacoesGerais from "./Components/InformacoesGerais";
import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";

export default function GerenciarPerfisPermissoes()
{
    const { perfilId } = useParams();
    const { token } = useAppContext();
    const [role, setRole] = useState({});
    const [allPermissions, setAllPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchProcessos = async () => {
            setLoading(true);
            setError(null);
            // await new Promise(resolve => setTimeout(resolve, 5000));
            try {
                const resRolePermissions = await fetch(`/api/super-admin/roles/${perfilId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!resRolePermissions.ok) {
                    throw new Error(`Erro ao buscar as permissões atreladas ao cargo: ${resRolePermissions.status} ${resRolePermissions.statusText}`);
                }

                const resultRolePermissions = await resRolePermissions.json();
                setRole((e) => ({...e, 
                    id: resultRolePermissions.data.id,
                    nome: resultRolePermissions.data.name,
                    escopo: resultRolePermissions.data.scope,
                    updated_at: resultRolePermissions.data.updated_at
                }));

                setSelectedPermissions(resultRolePermissions.data.related_permissions_ids);

                const resAllPermissions = await fetch(`/api/super-admin/permissions-scope/${resultRolePermissions.data.scope}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const resultAllPermissions = await resAllPermissions.json();
                setAllPermissions((a) => ({...a,
                    ...resultAllPermissions.data.permissions
                }));
                
                if ( !resAllPermissions.ok) {
                    throw new Error(`Erro ao buscar as permissões: ${resAllPermissions.status} ${resAllPermissions.statusText}`);
                }

                toast.success("Todos os processos seletivos existentes no sistema foram encaminhados com sucesso.", {
                    autoClose: 1800,
                });

            } catch (err) {
                setError("Não foi possível carregar seus processos seletivos. " + (err.message ? ` (${err.message})` : ''));
                // setPerfis([]);
            } finally {
                setLoading(false);
            }
        };
    fetchProcessos();
    }, [perfilId, token]);

    // =================================================================================
    // HOOK DE EFEITO Nº 2: APENAS PARA TRANSFORMAR OS DADOS PARA A TABELA
    // Roda somente depois que os dados da API (allPermissions) forem carregados.
    // =================================================================================
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

        const selectedIdsSet = new Set(selectedPermissions);

        const groupPermNames = Object.keys(allPermissions);

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
                name_permission: String(groupName).toUpperCase().replace(/-/g, ' '),
                visualizar: visualizarPerm ? selectedIdsSet.has(visualizarPerm.id.toString()) : null,
                criar: criarPerm ? selectedIdsSet.has(criarPerm.id.toString()) : null,
                atualizar: atualizarPerm ? selectedIdsSet.has(atualizarPerm.id.toString()) : null,
                deletar: deletarPerm ? selectedIdsSet.has(deletarPerm.id.toString()) : null,
            };
        });

        setTableData(formattedData.sort((a, b) => sortDataByQtdOfInputs(a, b)));

    }, [allPermissions, selectedPermissions]); // Depende dos dados brutos

    // console.log(allPermissions);
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

    const toggleAllPermissions = (currentState) => {
        const newValue = !currentState;
        setTableData((old) => old.map((row) => {
            return {
                ...row, 
                visualizar: row["visualizar"] !== null ? newValue: null,
                criar: row["criar"] !== null ? newValue: null,
                atualizar: row["atualizar"] !== null ? newValue: null,
                deletar: row["deletar"] !== null ? newValue: null,
            }
        }));
    }

    const getAreAllChecked = () => {
        const res = 
            selectedPermissions.some((rowPermission) => {
                const someInRow = 
                    Object.values(rowPermission).some(
                        (permission) => {
                            // console.log(permission);
                            return permission === false;
                        }
                    );

                // console.log(someInRow);
                // debugger;

                return someInRow === true
            }
        );

        // console.log(columns, selectedPermissions);
        // debugger;
        // console.log(`Tem algum desmarcado? ${res === true ? 'Sim': 'Não'}`);
        return res;
    }

    const columns = useMemo(() => getColumns(updatePermission, toggleAllRowPermissions, toggleAllPermissions, getAreAllChecked), []);
    
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log(role);
    };

    if (loading) return <LoaderPages />;
    if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

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
                />
                <form onSubmit={handleOnSubmit}>
                    <button className="px-4 py-2.5 text-sm font-semibold text-white bg-[var(--admin-button)] rounded-md hover:bg-[var(--admin-button-hover)] focus:outline-none cursor-pointer">Enviar</button>
                </form>
            </div>
        </section>
    );
}