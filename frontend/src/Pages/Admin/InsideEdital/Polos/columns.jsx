import PoloDeleteModal from "@/Components/Admin/InsideEdital/Modais/Polos/PoloDeleteModal";
import PoloEditModal from "@/Components/Admin/InsideEdital/Modais/Polos/PoloEditModal";
import { ArrowUpDown } from "lucide-react";

const columns = [
  
    {
      accessorKey: "id",
      header:"Id",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "nome",
      header:"Nome",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row, table }) => (
        <div className="flex items-center space-x-2 justify-center">
          <PoloEditModal polo={row.original} setNeedUpdate={table.options.meta.setNeedUpdate}/>
          <PoloDeleteModal polo={row.original} setNeedUpdate={table.options.meta.setNeedUpdate}/>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;