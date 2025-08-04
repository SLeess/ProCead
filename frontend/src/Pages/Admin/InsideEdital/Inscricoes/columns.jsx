import InscricaoAvaliarModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoAvaliarModal";
import InscricaoEditModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoEditModal";
import InscricaoShowModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoShowModal";
import CpfPill from "@/Components/Global/Tables/TestTable/CpfPill";
import { ArrowUpDown } from "lucide-react";

const columns = [

    {
      accessorKey: "id",
      header:"Id",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "inscricao",
      header: "Inscrição",
      // visibleInitially: false,
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "nome",
      header:"Nome",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "curso",
      header:"Curso",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "polo",
      header:"Polo",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "email",
      header:"E-Mail",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "cpf",
      header:"CPF",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "modalidade",
      header:"Modalidade",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "status",
      header:"Status",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      id: "actions",
      header: "Ações",
      cell: () => (
        <div className="flex items-center space-x-2 justify-center">
          <InscricaoShowModal/>
          <InscricaoEditModal/>
          <InscricaoAvaliarModal/>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;