import InscricaoAvaliarModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoAvaliarModal";
import InscricaoEditModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoEditModal";
import InscricaoShowModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoShowModal";
import UserEditModal from "@/Components/Admin/InsideEdital/Modais/Usuario/UserEditModal";
import UserShowModal from "@/Components/Admin/InsideEdital/Modais/Usuario/UserShowModal";
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
      accessorKey: "email",
      header:"Email",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "cpf",
      header:"CPF",
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
          <UserShowModal />
          <UserEditModal />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;