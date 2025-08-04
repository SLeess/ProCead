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

    const [formData, setFormData] = useState({

    });

    const columns = useMemo(() => getColumns(updatePermission, toggleAllRowPermissions), []);

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
                    {/* <h2>Permissões</h2> */}
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