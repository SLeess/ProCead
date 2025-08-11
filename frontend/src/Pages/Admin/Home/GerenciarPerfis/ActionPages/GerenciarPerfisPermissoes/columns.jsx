import { Checkbox } from "@/Components/Global/ui/modals";
import { Minus } from "lucide-react";

const createActionColumn = (actionKey, label, updatePermission, toggleAllColPermissions) => {
  return {
    accessorKey: actionKey,
    header: ({table}) => {
        const tableData = table.getCoreRowModel().rows.map(row => row.original);

        const visibleRowsWithPermission = tableData.filter(row => row[actionKey] !== null);
        const checkedCount = visibleRowsWithPermission.filter(row => row[actionKey] === true).length;
        const isAllChecked = visibleRowsWithPermission.length > 0 && checkedCount === visibleRowsWithPermission.length;
        const isIndeterminate = checkedCount > 0 && checkedCount < visibleRowsWithPermission.length;
        return (<Checkbox 
          label={label} 
          checked={isAllChecked} 
          ref={el => el && (el.indeterminate = isIndeterminate)} 
          onChange={() => toggleAllColPermissions(actionKey, isAllChecked)}
        />);
    },
    cell: ({ row, column }) => {
        const permissionValue  = row.original[actionKey];

        if (permissionValue === null) {
            return <Minus width={16} height={16}/>;
        }

        return (
            <div className="flex">
                <Checkbox
                    checked={!!row.original[actionKey]}
                    className={`${permissionValue ? "" : "bg-amber-300"}`}
                    onChange={(e) => {
                      updatePermission(row.index, column.id, e.target.checked);
                    }}
                />
            </div>
        );
    },
    enableSorting: false,
    enableHiding: false,
  }
};


const getColumns = (updatePermission, toggleAllRowPermissions, toggleAllPermissions, toggleAllColPermissions) => {
    return [
        {
            accessorKey: "name_permission",
            header: () => <Checkbox label={"Permissões"} onChange={(e) => toggleAllPermissions(!e.target.checked)}/>,
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
        createActionColumn("visualizar", "Visualizar", updatePermission, toggleAllColPermissions),
        createActionColumn("criar", "Criar", updatePermission, toggleAllColPermissions),
        createActionColumn("atualizar", "Atualizar", updatePermission, toggleAllColPermissions),
        createActionColumn("deletar", "Deletar", updatePermission, toggleAllColPermissions),
    ];
};

export default getColumns;






//   return [
//     {
//       accessorKey: "name_permission",
//       header: () => {
//         return (<>
//           <Checkbox 
//             label={"Permissões"} 
//             // checked={getAreAllChecked}
//             // checked={getAreAllChecked}
//             checked={getAreAllChecked() === false ? true : false}
//             onChange={(e) => toggleAllPermissions(!e.target.checked)}
//           />
//         </>);
//       },
//       cell: ({row}) => {
//         const { visualizar, criar, atualizar, deletar } = row.original;
//         const areAllInRowChecked = visualizar && criar && atualizar && deletar;
        
//         return (
//           <Checkbox
//             label={row.original.name_permission}
//             checked={areAllInRowChecked}
//             onChange={() => toggleAllRowPermissions(row.index, areAllInRowChecked)}
//           />
//         );
//       },
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//       accessorKey: "visualizar",
//       header: () => <>
//         <Checkbox label={"Ler"}/>
//       </>,
//       cell: ({ row, column }) => (
//         <Checkbox
//           checked={row.original.visualizar}
//           onChange={(e) => updatePermission(row.index, column.id, e.target.checked)}
//         />
//       ),
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//       accessorKey: "criar",
//       header: () => <>
//         <Checkbox label={"Criar"}/>
//       </>,
//       cell: ({ row, column }) => (
//         <Checkbox
//           checked={row.original.criar}
//           onChange={(e) => updatePermission(row.index, column.id, e.target.checked)}
//         />
//       ),
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//       accessorKey: "atualizar",
//       header: () => <>
//         <Checkbox label={"Atualizar"}/>
//       </>,
//       cell: ({ row, column }) => (
//         <Checkbox
//           checked={row.original.atualizar}
//           onChange={(e) => updatePermission(row.index, column.id, e.target.checked)}
//         />
//       ),
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//       accessorKey: "deletar",
//       header: () => <>
//         <Checkbox label={"Deletar"}/>
//       </>,
//       cell: ({ row, column }) => (
//         <Checkbox
//           checked={row.original.deletar}
//           onChange={(e) => updatePermission(row.index, column.id, e.target.checked)}
//         />
//       ),
//       enableSorting: false,
//       enableHiding: false,
//     },
//   ];
// }
