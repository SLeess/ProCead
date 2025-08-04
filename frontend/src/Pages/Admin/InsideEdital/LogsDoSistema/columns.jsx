import InscricaoAvaliarModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoAvaliarModal";
import InscricaoEditModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoEditModal";
import InscricaoShowModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoShowModal";
import LogsShowModal from "@/Components/Admin/InsideEdital/Modais/LogsDoSistema/LogsShowModal";
import { ArrowUpDown } from "lucide-react";

const columns = [

  {
    accessorKey: "id",
    header: "Id",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "tipo_objeto",
    header: "Tipo do Objeto",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "tipo_usuario",
    header: "Tipo do Usuário",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "responsavel",
    header: "Responsável",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "data_registro",
    header: "Data de Registro",
    cell: (props) => <span>{props.getValue()}</span>
  },

  {
    id: "actions",
    header: "Ações",
    cell: () => (
      <div className="flex items-center space-x-2 justify-center">
        <LogsShowModal />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export default columns;