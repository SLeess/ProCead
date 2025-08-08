import "./GerenciarPerfisPermissoes.css";
import MainTable from "@/Components/Global/Tables/MainTable/MainTable";
import data from "./data";
import getColumns from "./columns";
// import { TextInput } from "flowbite-react";
import { FormField, SelectInput, TextInput } from "@/Components/Global/ui/modals";
import { useMemo, useState } from "react";

export default function GerenciarPerfisPermissoes()
{
    const [permissionsData, setPermissionsData] = useState(data);
    const updatePermission = (rowIndex, columnId, value) => {
        setPermissionsData(old =>
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
        setPermissionsData(old =>
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
        setPermissionsData((old) => old.map((row) => {
            return {
                ...row, 
                ler: newValue,
                criar: newValue,
                atualizar: newValue,
                deletar: newValue,
            }
        }));
    }

    const [formData, setFormData] = useState({

    });

    const getAreAllChecked = () => {
        const res = 
            permissionsData.some((rowPermission) => {
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

        // console.log(columns, permissionsData);
        // debugger;
        // console.log(`Tem algum desmarcado? ${res === true ? 'Sim': 'Não'}`);
        return res;
    }

    const columns = useMemo(() => getColumns(updatePermission, toggleAllRowPermissions, toggleAllPermissions, getAreAllChecked), []);
    
    const handleOnSubmit = async () => {

    };

    return (
        <section id="gerenciar_perfis_permissoes">
            <header>
                <h1>Gerenciar Perfis - Permissões</h1>
            </header>
            <div id="content">
                <div id="informacoes_gerais" className="">
                    <h2>Informações Gerais</h2>
                    <div className="grid grid-cols-12 sm:mt-3">
                        <FormField label="Nome do Perfil" className="mt-3 sm:mt-0 sm:mr-4">
                            <TextInput value="Controle Acadêmico" readOnly={false}/>
                        </FormField>
                        <FormField label="Escopo do Perfil" className="mt-3 sm:mt-0">
                            <SelectInput value="Perfil Local" readOnly={false} options={['Perfil Local', 'Perfil Global']} />
                        </FormField>
                    </div>
                    <hr className="my-7"/>
                </div>
                <form onSubmit={handleOnSubmit}>
                    <MainTable 
                        data={permissionsData} 
                        columns={columns} 
                        title={"Permissões"}
                        hasShadowBorderStyle={false}
                        hasPaddingStyle={false}
                        canExport={false}
                        canHiddenColumns={false}
                        hasSelectForRows={false}
                    />
                </form>
            </div>
        </section>
    );
}