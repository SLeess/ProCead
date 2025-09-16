import MainTable from "@/Components/Global/Tables/MainTable/MainTable";
import { useEffect, useMemo } from "react";
import getColumns from "./columns";

export default function TableSetPermissionsToRole({tableData, setTableData, allPermissions, initialSelectedPermissions, setSelectedPermissions = () => {}, hasBeenUpdated})
{
    useEffect(() => {
        if (Object.keys(allPermissions).length === 0) {
            setTableData([]);
            return;
        }

        const selectedIdsSet = new Set(initialSelectedPermissions);

        const formattedData = Object.entries(allPermissions)
        .filter(([groupName, _]) => 
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

        setTableData(
            /**
            //  * Opcional -- é uma função pra ordenar os grupos de permissões para exibir em ordem alfabética
            */
            formattedData.sort((a,b) => String(a.name_permission).toLowerCase().localeCompare(String(b.name_permission)))
        );

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

    const columns = useMemo(() => getColumns(setTableData), [hasBeenUpdated]);
    return(
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
    );
}