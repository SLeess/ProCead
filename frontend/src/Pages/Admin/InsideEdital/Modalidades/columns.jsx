import CursoDeleteModal from "@/Components/Admin/InsideEdital/Modais/Cursos/CursoDeleteModal";
import CursoEditModal from "@/Components/Admin/InsideEdital/Modais/Cursos/CursoEditModal";
import ModalidadeDeleteModal from "@/Components/Admin/InsideEdital/Modais/Modalidades/ModalidadeDeleteModal";
import ModalidadeEditModal from "@/Components/Admin/InsideEdital/Modais/Modalidades/ModalidadeEditModal";
import ModalidadeShowModal from "@/Components/Admin/InsideEdital/Modais/Modalidades/ModalidadeShowModal";
import { ArrowUpDown } from "lucide-react";

const columns = [
    {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
        <div className="flex items-center space-x-2">
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