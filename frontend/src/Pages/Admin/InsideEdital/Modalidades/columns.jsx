import CursoDeleteModal from "@/Components/Admin/InsideEdital/Modais/Cursos/CursoDeleteModal";
import CursoEditModal from "@/Components/Admin/InsideEdital/Modais/Cursos/CursoEditModal";
import ModalidadeDeleteModal from "@/Components/Admin/InsideEdital/Modais/Modalidades/ModalidadeDeleteModal";
import ModalidadeEditModal from "@/Components/Admin/InsideEdital/Modais/Modalidades/ModalidadeEditModal";
import ModalidadeShowModal from "@/Components/Admin/InsideEdital/Modais/Modalidades/ModalidadeShowModal";
import { ArrowUpDown } from "lucide-react";

const columns = [
  
    {
      accessorKey: "id",
      header: "Id",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "sigla",
      header: "Sigla",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "nome",
      header: "Nome",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "avaliacao",
      header: "Avaliação",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      id: "actions",
      header: "Ações",
      cell: () => (
        <div className="flex items-center space-x-2 justify-center">
          <ModalidadeShowModal/>
          <ModalidadeEditModal/>
          <ModalidadeDeleteModal/>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;