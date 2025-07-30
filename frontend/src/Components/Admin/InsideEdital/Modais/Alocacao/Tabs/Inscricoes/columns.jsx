import InscricaoAvaliarModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoAvaliarModal";
import InscricaoEditModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoEditModal";
import InscricaoShowModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoShowModal";
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
    },
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
      accessorKey: "inscricao",
      // header: "Nº de Inscricao",
      header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Inscricao
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
      accessorKey: "email",
      header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          E-mail
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "cpf",
      header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CPF
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "modalidade",
      header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modalidade
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
    
  ];

export default columns;