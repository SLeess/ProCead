import InscricaoAvaliarModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoAvaliarModal";
import InscricaoEditModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoEditModal";
import InscricaoShowModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoShowModal";
import QuadroVagasEditModal from "@/Components/Admin/InsideEdital/Modais/QuadroVagas/QuadroVagasEditModal";
import QuadroVagasShowModal from "@/Components/Admin/InsideEdital/Modais/QuadroVagas/QuadroVagasShowModal";
import { ArrowUpDown } from "lucide-react";

const columns = [
  
    {
      accessorKey: "id",
      header:"Id",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "codigo",
      header:"Código",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "campus",
      header:"Campus",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "vaga",
      header:"Vaga",
      cell: (props) => <span>{props.getValue()?.vagable?.nome}</span>
    },
    {
      accessorKey: "habilitacao",
      header:"Habilitação",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "n_vagas",
    header:"Nº de Vagas",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row, table }) => (
        <div className="flex items-center space-x-2 justify-center">
          <QuadroVagasShowModal quadroVaga={row.original} setNeedUpdate={table.options.meta.setNeedUpdate}/>
          <QuadroVagasEditModal quadroVaga={row.original} setNeedUpdate={table.options.meta.setNeedUpdate}/>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;