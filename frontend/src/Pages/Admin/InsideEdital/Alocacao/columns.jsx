import AlocarModal from "@/Components/Admin/InsideEdital/Modais/Alocacao/AlocarModal";
import UserEditModal from "@/Components/Admin/InsideEdital/Modais/Usuario/UserEditModal";
import UserShowModal from "@/Components/Admin/InsideEdital/Modais/Usuario/UserShowModal";
import { ArrowUpDown, List } from "lucide-react";

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
    accessorKey: "nome",
    header: "Nome",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "perfil",
    header: "Perfil",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "n_inscricoes",
    header: "Número de Inscrições",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "n_cotas",
    header: "Nº de Cotas",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "n_recursos",
    header: "Nº de Recursos",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "n_matriculas",
    header: "Nº de Matrículas",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <AlocarModal row={row} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export default columns;