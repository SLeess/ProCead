import PerfilDeleteModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilDeleteModal";
import PerfilEditModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilEditModal";
import PerfilShowModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilShowModal";
import PerfilAlterarPermissoesModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilAlterarPermissoesModal";
import { Eye, Pencil, Trash, List } from "lucide-react";

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
      accessorKey: "escopo",
      header:"Escopo",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      id: "actions",
      header: "Ações",
      alignText: true,
      cell: () => (
        <div className="flex items-center space-x-2 justify-center">
          <button onClick={() => {}} className="p-1 hover:bg-gray-200 rounded-full">
              <List className="h-5 w-5 text-green-500" />
          </button>
          <button onClick={() => {}} className="p-1 hover:bg-gray-200 rounded-full">
              <Eye className="h-5 w-5 text-blue-500" />
          </button>
          <button onClick={() => {}} className="p-1 hover:bg-gray-200 rounded-full">
              <Pencil className="h-5 w-5 text-yellow-500" />
          </button>
          <button onClick={() => {}} className="p-1 hover:bg-gray-200 rounded-full">
              <Trash className="h-5 w-5 text-red-500" />
          </button>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;