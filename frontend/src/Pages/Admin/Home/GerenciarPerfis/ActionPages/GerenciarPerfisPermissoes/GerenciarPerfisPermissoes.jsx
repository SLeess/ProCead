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

export default function GerenciarPerfisPermissoes()
{
    const { perfilId } = useParams();
    const { token } = useAppContext();
    const [role, setRole] = useState({});
    const [allPermissions, setAllPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState(data);
    const [formData, setFormData] = useState({});
    
    const updatePermission = (rowIndex, columnId, value) => {
        setSelectedPermissions(old =>
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
        setSelectedPermissions(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...row,
                        ler: newValue,
                        criar: newValue,
                        atualizar: newValue,
                        deletar: newValue,
                    };
                }
                return row;
            })
        );
    };

    const toggleAllPermissions = (currentState) => {
        const newValue = !currentState;
        setSelectedPermissions((old) => old.map((row) => {
            return {
                ...row, 
                ler: newValue,
                criar: newValue,
                atualizar: newValue,
                deletar: newValue,
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
      
    /** ------------------ Lidando com Filtros ------------------ **/
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

            console.log(data);
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
                ...resultAllPermissions
            }))
            
            if ( !resAllPermissions.ok) {
                throw new Error(`Erro ao buscar as permissões: ${resAllPermissions.status} ${resAllPermissions.statusText}`);
            }
            console.log(allPermissions);
            // console.log(resultRolePermissions);

            
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
    }, []);

    // console.log(permissoes);

    return (
        <section id="gerenciar_perfis_permissoes">
            <header>
                <h1>Gerenciar Perfis - Permissões</h1>
            </header>
            <div id="content">
                <div id="informacoes_gerais" className="">
                    <InformacoesGerais role={role} setRole={setRole}/>
                </div>
                <form onSubmit={handleOnSubmit}>
                    <MainTable 
                        data={selectedPermissions} 
                        columns={columns} 
                        title={"Permissões"}
                        hasShadowBorderStyle={false}
                        hasPaddingStyle={false}
                        canExport={false}
                        canHiddenColumns={false}
                        hasSelectForRows={false}
                    />
                    <button>Enviar</button>
                </form>
            </div>
        </section>
    );
}