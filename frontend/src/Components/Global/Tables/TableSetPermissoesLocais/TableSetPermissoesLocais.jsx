import MainTable from "@/Components/Global/Tables/MainTable/MainTable";
import { useEffect, useMemo } from "react";
import getColumns from "./columns";

export default function TableSetPermissoesLocais({
    tableData, 
    setTableData, 
    allPermissions, 
    initialSelectedPermissions, 
    selectedPermissions = [], 
    setSelectedPermissions = () => {}, 
    hasBeenUpdated, 
    disabledInheritPermissions = []
})
{   
    useEffect(() => {
        if (Object.keys(allPermissions).length === 0) {
            setTableData([]);
            return;
        }

        const selectedIdsSet = new Set(initialSelectedPermissions);
        const disabledIdsSet = new Set(disabledInheritPermissions);

        /**
         * Função auxiliar para criar o objeto de cada permissão.
         * @param {object|null} perm - O objeto de permissão original.
         * @returns {{checked: boolean, disabled: boolean}|null}
         */
        const createPermissionState = (perm) => {
            if (!perm) {
                return null;
            }
            
            const permId = String(perm.id);
            const isDisabled = disabledIdsSet.has(permId);
            return {
                checked: isDisabled || selectedIdsSet.has(permId),
                disabled: isDisabled
            };
        };

         const formattedData = Object.entries(allPermissions)
            .filter(([groupName, _]) => !groupName.includes('avaliar'))
            .map(([groupName, groupPerm]) => {
                const permissionsMap = new Map(groupPerm.map(p => [p.name, p]));

            return {
                name_permission: String(groupName).toUpperCase().replace(/[-_]/g, ' '),
                visualizar: createPermissionState(permissionsMap.get(`visualizar-${groupName}`)),
                criar: createPermissionState(permissionsMap.get(`cadastrar-${groupName}`)),
                atualizar: createPermissionState(permissionsMap.get(`editar-${groupName}`)),
                deletar: createPermissionState(permissionsMap.get(`deletar-${groupName}`)),
            };
        });

        setTableData(
            /**
            //  * Opcional -- é uma função pra ordenar os grupos de permissões para exibir em ordem alfabética
            */
            formattedData.sort((a,b) => String(a.name_permission).toLowerCase().localeCompare(String(b.name_permission)))
        );

    }, [allPermissions, initialSelectedPermissions, disabledInheritPermissions, hasBeenUpdated]);

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
            
            if (row.visualizar?.checked === true && row.visualizar?.disabled === false) {
                const id = permissionNameToIdMap.get(`visualizar-${groupName}`);
                if (id) newSelectedIds.push(id);
            }
            if (row.criar?.checked === true && row.criar?.disabled === false) {
                const id = permissionNameToIdMap.get(`cadastrar-${groupName}`);
                if (id) newSelectedIds.push(id);
            }
            if (row.atualizar?.checked === true && row.atualizar?.disabled === false) {
                const id = permissionNameToIdMap.get(`editar-${groupName}`);
                if (id) newSelectedIds.push(id);
            }
            if (row.deletar?.checked === true && row.deletar?.disabled === false) {
                const id = permissionNameToIdMap.get(`deletar-${groupName}`);
                if (id) newSelectedIds.push(id);
            }
        });

        setSelectedPermissions((f) => ({...f, permissions: newSelectedIds}));

    }, [tableData, allPermissions, setSelectedPermissions]); // Depende de tableData e allPermissions

    const columns = useMemo(() => getColumns(setTableData), [setTableData]);
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