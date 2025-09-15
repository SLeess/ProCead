import { Checkbox } from "@/Components/Global/ui/modals";
import { X } from "lucide-react";

const createActionColumn = (actionKey, label, updatePermission, setTableData) => ({
    accessorKey: actionKey,
    header: ({ table }) => {
        const tableRows = table.getRowModel().rows;
        const visibleRowIds = new Set(tableRows.map(row => row.original.name_permission));

        // Filtra apenas as permissões que existem E NÃO ESTÃO DESABILITADAS
        const availableRows = tableRows
            .map(r => r.original)
            .filter(row => row[actionKey] !== null && !row[actionKey].disabled);

        const checkedCount = availableRows.filter(row => row[actionKey]?.checked === true).length;
        
        // Agora o "todos marcados" só considera os que podem ser marcados
        const isAllChecked = availableRows.length > 0 && checkedCount === availableRows.length;
        const isIndeterminate = checkedCount > 0 && checkedCount < availableRows.length;

        const handleToggleColumn = () => {
            const newValue = !isAllChecked;
            setTableData(oldData =>
                oldData.map(row => {
                    // CONDIÇÃO ADICIONADA: Só altera se a permissão existir E NÃO estiver desabilitada
                    if (visibleRowIds.has(row.name_permission) && row[actionKey] !== null && !row[actionKey].disabled) {
                        return { ...row, [actionKey]: { ...row[actionKey], checked: newValue } };
                    }
                    return row;
                })
            );
        };

        return (
            <Checkbox
                label={label}
                checked={isAllChecked}
                ref={el => { if (el) { el.indeterminate = isIndeterminate; } }}
                onChange={handleToggleColumn}
            />
        );
    },
    cell: ({ row, column }) => {
        const permissionState = row.original[actionKey];

        if (permissionState === null) {
            return <X width={16} height={16} className="text-gray-400" />;
        }

        return (
            <Checkbox
                checked={!!permissionState.checked}
                readOnly={permissionState.disabled}
                onChange={(e) => updatePermission(row.index, column.id, e.target.checked)}
            />
        );
    },
    enableSorting: false,
    enableHiding: false,
});

const getColumns = (setTableData) => {
    const updatePermission = (rowIndex, columnId, value) => {
        setTableData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...row,
                        // Atualize a propriedade aninhada, mantendo o 'disabled'
                        [columnId]: { ...row[columnId], checked: value },
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
                    const newRow = { ...row };
                    ['visualizar', 'criar', 'atualizar', 'deletar'].forEach(actionKey => {
                        if (newRow[actionKey] !== null && !newRow[actionKey].disabled) {
                            newRow[actionKey] = { ...newRow[actionKey], checked: newValue };
                        }
                    });
                    return newRow;
                }
                return row;
            })
        );
    };
    return [
        {
            accessorKey: "name_permission",
            header: ({ table }) => {
                const tableRows = table.getRowModel().rows;
                const visibleRowIds = new Set(tableRows.map(row => row.original.name_permission));

                const allAvailablePermissions = tableRows.flatMap(row => 
                    ['visualizar', 'criar', 'atualizar', 'deletar']
                        .map(key => row.original[key])
                        .filter(p => p !== null && !p.disabled)
                );
                
                const areAllAvailableChecked = allAvailablePermissions.length > 0 && allAvailablePermissions.every(p => p.checked === true);
                
                const handleToggleAll = () => {
                    const newValue = !areAllAvailableChecked;
                    setTableData(oldData =>
                        oldData.map(row => {
                            if (visibleRowIds.has(row.name_permission)) {
                                const newRow = { ...row };
                                ['visualizar', 'criar', 'atualizar', 'deletar'].forEach(actionKey => {
                                    if (newRow[actionKey] !== null && !newRow[actionKey].disabled) {
                                        newRow[actionKey] = { ...newRow[actionKey], checked: newValue };
                                    }
                                });
                                return newRow;
                            }
                            return row;
                        })
                    );
                };
                
                return <Checkbox label={"PERMISSÕES"} onChange={handleToggleAll} checked={areAllAvailableChecked}/>;
            },
            cell: ({ row }) => {
                const { visualizar, criar, atualizar, deletar } = row.original;
                const availablePermissions = [visualizar, criar, atualizar, deletar].filter(p => p !== null && !p.disabled);
                const areAllAvailableInRowChecked = availablePermissions.length > 0 && availablePermissions.every(p => p.checked === true);

                return (
                    <Checkbox
                        label={row.original.name_permission}
                        checked={areAllAvailableInRowChecked}
                        onChange={() => toggleAllRowPermissions(row.index, areAllAvailableInRowChecked)}
                    />
                );
            },
            enableSorting: false,
            enableHiding: false,
        },
        createActionColumn("visualizar", "VISUALIZAR", updatePermission, setTableData),
        createActionColumn("criar", "CRIAR", updatePermission, setTableData),
        createActionColumn("atualizar", "ATUALIZAR", updatePermission, setTableData),
        createActionColumn("deletar", "DELETAR", updatePermission, setTableData),
    ];
};

export default getColumns;