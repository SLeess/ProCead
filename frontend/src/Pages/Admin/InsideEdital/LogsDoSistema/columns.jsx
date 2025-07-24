import InscricaoAvaliarModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoAvaliarModal";
import InscricaoEditModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoEditModal";
import InscricaoShowModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoShowModal";
import LogsShowModal from "@/Components/Admin/InsideEdital/Modais/LogsDoSistema/LogsShowModal";
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
      accessorKey: "descricao",
      // header: "Nº de Inscricao",
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
      accessorKey: "tipo_objeto",
      header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo do Objeto
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "tipo_usuario",
      header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo de Usuário
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "responsavel",
      header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome do Responsável
          <ArrowUpDown className={`ml-2 h-4 w-4 ${column.getIsSorted() ? 'text-blue-500' : ''}`} />
        </div>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "data_registro",
      header: ({ column }) => {
      return (
        <div className="flex cursor-pointer items-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de Registro
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
          <LogsShowModal />
        </div>
      ),
    },
  ];

export default columns;