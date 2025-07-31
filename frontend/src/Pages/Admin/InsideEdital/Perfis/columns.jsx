import PerfilDeleteModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilDeleteModal";
import PerfilEditModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilEditModal";
import PerfilShowModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilShowModal";
import PerfilAlterarPermissoesModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilAlterarPermissoesModal";
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
      accessorKey: "tipo",
      header:"Tipo",
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
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;