import PerfilDeleteModal from "@/Components/Modals/Perfis/PerfilDeleteModal";
import PerfilEditModal from "@/Components/Modals/Perfis/PerfilEditModal";
import PerfilShowModal from "@/Components/Modals/Perfis/PerfilShowModal";
import PerfilAlterarPermissoesModal from "@/Components/Modals/Perfis/PerfilAlterarPermissoesModal";
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
          Descrição
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "tipo",
      header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
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
          <PerfilAlterarPermissoesModal />
          <PerfilShowModal />
          <PerfilEditModal />
          <PerfilDeleteModal />
        </div>
      ),
    },
  ];

export default columns;