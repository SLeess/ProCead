import PoloDeleteModal from "@/Components/Admin/InsideEdital/Modais/Polos/PoloDeleteModal";
import PoloEditModal from "@/Components/Admin/InsideEdital/Modais/Polos/PoloEditModal";
import { ArrowUpDown } from "lucide-react";



export const columnsPolos = (hasPermissionForEdital, editalId) => {
  const columns = [
    {
        accessorKey: "id",
        header: "Id",
        cell: (props) => <span>{props.getValue()}</span>
    },
    {
        accessorKey: "nome",
        header: "Nome",
        cell: (props) => <span>{props.getValue()}</span>,
    },
  ];

  if((hasPermissionForEdital('editar-campus', editalId) || hasPermissionForEdital('deletar-campus', editalId)))
    columns.push({
        id: "actions",
        header: "Ações",
        cell: ({ row, table }) => (
          <div className="flex items-center space-x-2 justify-center">
            {
              hasPermissionForEdital('editar-campus', editalId) &&
              <PoloEditModal polo={row.original} setNeedUpdate={table.options.meta.setNeedUpdate}/>
            }
            {
              hasPermissionForEdital('deletar-campus', editalId) &&
              <PoloDeleteModal polo={row.original} setNeedUpdate={table.options.meta.setNeedUpdate}/>
            }
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
    });

  return columns;
};