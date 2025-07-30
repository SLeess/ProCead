import AlocarModal from "@/Components/Admin/InsideEdital/Modais/Alocacao/AlocarModal";
import UserEditModal from "@/Components/Admin/InsideEdital/Modais/Usuario/UserEditModal";
import UserShowModal from "@/Components/Admin/InsideEdital/Modais/Usuario/UserShowModal";
import { ArrowUpDown, List } from "lucide-react";

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
          Nome
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "perfil",
    header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Perfil
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "n_inscricoes",
    header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nº Inscrições
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "n_cotas",
    header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nº Cotas
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "n_recursos",
    header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nº Recursos
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "n_matriculas",
    header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nº Matriculas
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
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