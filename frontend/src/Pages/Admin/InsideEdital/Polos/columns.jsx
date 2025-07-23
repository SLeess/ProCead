import PoloDeleteModal from "@/Components/Admin/InsideEdital/Modais/Polos/PoloDeleteModal";
import PoloEditModal from "@/Components/Admin/InsideEdital/Modais/Polos/PoloEditModal";
import { ArrowUpDown } from "lucide-react";

const columns = [
    
    {
      accessorKey: "id",
      header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "nome",
      header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome do Polo
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      id: "actions",
      header: "Ações",
      cell: () => (
        <div className="flex items-center space-x-2">
          <PoloEditModal/>
          <PoloDeleteModal/>
        </div>
      ),
    },
  ];

export default columns;