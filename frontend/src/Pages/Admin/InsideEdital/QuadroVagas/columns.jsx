import InscricaoAvaliarModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoAvaliarModal";
import InscricaoEditModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoEditModal";
import InscricaoShowModal from "@/Components/Admin/InsideEdital/Modais/Inscricoes/InscricaoShowModal";
import QuadroVagasEditModal from "@/Components/Admin/InsideEdital/Modais/QuadroVagas/QuadroVagasEditModal";
import QuadroVagasShowModal from "@/Components/Admin/InsideEdital/Modais/QuadroVagas/QuadroVagasShowModal";
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
    enableSorting: false,
    enableHiding: false,
  },
    {
      accessorKey: "id",
      header:"Id",
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
      cell: (props) => <span>{props.getValue()}</span>
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
      cell: () => (
        <div className="flex items-center space-x-2">
          <QuadroVagasShowModal/>
          <QuadroVagasEditModal/>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;