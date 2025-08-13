import { Checkbox } from "@/Components/Global/ui/modals";
import { X } from "lucide-react";

const createActionColumn = (actionKey, label, updatePermission, setTableData) => ({
    accessorKey: actionKey,
    header: ({ table }) => {
        const tableRows = table.getRowModel().rows;
        const visibleRowIds = new Set(tableRows.map(row => row.original.name_permission));
        const visibleRowsWithPermission = tableRows.map(r => r.original).filter(row => row[actionKey] !== null);
        const checkedCount = visibleRowsWithPermission.filter(row => row[actionKey] === true).length;

        const isAllChecked = visibleRowsWithPermission.length > 0 && checkedCount === visibleRowsWithPermission.length;
        const isIndeterminate = checkedCount > 0 && checkedCount < visibleRowsWithPermission.length;

        const handleToggleColumn = () => {
            const newValue = !isAllChecked;
            setTableData(oldData =>
                oldData.map(row => {
                    if (visibleRowIds.has(row.name_permission) && row[actionKey] !== null) {
                        return { ...row, [actionKey]: newValue };
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
        const permissionValue = row.original[actionKey];
        if (permissionValue === null) {
            return <X width={16} height={16} className="text-gray-400" />;
        }
        return (
          <Checkbox
              checked={!!permissionValue}
              onChange={(e) => updatePermission(row.index, column.id, e.target.checked)}
          />
        );
    },
    enableSorting: false,
    enableHiding: false,
});

const getColumns = (updatePermission, toggleAllRowPermissions, setTableData) => {
    return [
        {
            accessorKey: "name_permission",
            header: ({ table }) => {
                const tableRows = table.getRowModel().rows;

                const allVisibleRows = tableRows.map(row => row.original);
                let allPermissionsInVisibleRows = [];
                allVisibleRows.forEach(row => {
                    const existingPermissions = [row.visualizar, row.criar, row.atualizar, row.deletar].filter(p => p !== null);
                    allPermissionsInVisibleRows.push(...existingPermissions);
                });
                
                const areAllVisibleChecked = allPermissionsInVisibleRows.length > 0 && allPermissionsInVisibleRows.every(p => p === true);

                const handleToggleAll = () => {
                    const newValue = !areAllVisibleChecked;
                    const visibleRowIds = new Set(tableRows.map(row => row.original.name_permission));
                    
                    setTableData(oldData => 
                        oldData.map(row => {
                            if(visibleRowIds.has(row.name_permission)) {
                                return {
                                    ...row,
                                    visualizar: row.visualizar !== null ? newValue : null,
                                    criar: row.criar !== null ? newValue : null,
                                    atualizar: row.atualizar !== null ? newValue : null,
                                    deletar: row.deletar !== null ? newValue : null,
                                }
                            }
                            return row;
                        })
                    );
                };
                return <Checkbox label={"PERMISSÕES"} onChange={handleToggleAll} checked={areAllVisibleChecked}/>;
            },
            cell: ({ row }) => {
                const { visualizar, criar, atualizar, deletar } = row.original;
                const existingPermissions = [visualizar, criar, atualizar, deletar].filter(p => p !== null);
                const areAllInRowChecked = existingPermissions.length > 0 && existingPermissions.every(p => p === true);
                return (
                    <Checkbox
                        label={row.original.name_permission}
                        checked={areAllInRowChecked}
                        onChange={() => toggleAllRowPermissions(row.index, areAllInRowChecked)}
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