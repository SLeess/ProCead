import { Checkbox } from "@/Components/Global/ui/modals";
import { X } from "lucide-react";

const createActionColumn = (actionKey, label, updatePermission) => ({
    accessorKey: actionKey,
    header: () => <Checkbox label={label} />,
    cell: ({ row, column }) => {
        const permissionValue  = row.original[actionKey];

        if (permissionValue === null) {
            // return null;
            return <X width={16} height={16}/>;
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
});


const getColumns = (updatePermission, toggleAllRowPermissions, toggleAllPermissions, getAreAllChecked) => {
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
        createActionColumn("visualizar", "Visualizar", updatePermission),
        createActionColumn("criar", "Criar", updatePermission),
        createActionColumn("atualizar", "Atualizar", updatePermission),
        createActionColumn("deletar", "Deletar", updatePermission),
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
