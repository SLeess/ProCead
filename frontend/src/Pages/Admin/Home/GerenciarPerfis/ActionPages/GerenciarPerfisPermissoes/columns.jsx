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
                const handleToggleAll = () => {
                };
                return <Checkbox label={"PERMISSÕES"} onChange={handleToggleAll} />;
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