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
      accessorKey: "n_inscricao",
      header: "Nº de Inscrição",
      // visibleInitially: false,
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "nome_completo",
      header:"Nome do Candidato",
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
      accessorKey: "status",
      header:"Status",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row, table}) => (
        <div className="flex items-center space-x-2 justify-center">
          <InscricaoShowModal  inscricao={row.original} setNeedUpdate={table.options.meta.setNeedUpdate} />
          <InscricaoEditModal  inscricao={row.original} setNeedUpdate={table.options.meta.setNeedUpdate} />
          <InscricaoAvaliarModal  inscricao={row.original} setNeedUpdate={table.options.meta.setNeedUpdate} />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;