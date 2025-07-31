import CotaEditModal from "@/Components/Admin/InsideEdital/Modais/Cotas/CotaEditModal";
import CotaShowModal from "@/Components/Admin/InsideEdital/Modais/Cotas/CotaShowModal";
import { ArrowUpDown } from "lucide-react";

const columns = [
    
    {
      accessorKey: "id",
      header: "Id",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "inscricao",
      // header: "Nº de Inscricao",
      header: "Inscrição",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "nome",
      header: "Nome",
      cell: (props) => <span>{props.getValue()}</span>
    },
    
    {
      accessorKey: "cpf",
      header: "CPF",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "tipo_avaliacao",
      header: "Tipo de Avaliação",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      id: "actions",
      header: "Ações",
      cell: () => (
        <div className="flex items-center space-x-2">
          <CotaShowModal/>
          <CotaEditModal/>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;