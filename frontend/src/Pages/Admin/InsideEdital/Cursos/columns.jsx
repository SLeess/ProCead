import CursoDeleteModal from "@/Components/Admin/InsideEdital/Modais/Cursos/CursoDeleteModal";
import CursoEditModal from "@/Components/Admin/InsideEdital/Modais/Cursos/CursoEditModal";
import { ArrowUpDown } from "lucide-react";

const columns = [
    
    {
      accessorKey: "id",
      header: "Id",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "nome",
      header: "Nome",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      id: "actions",
      header: "Ações",
      cell: () => (
        <div className="flex items-center space-x-2 justify-center">
          <CursoEditModal/>
          <CursoDeleteModal/>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;