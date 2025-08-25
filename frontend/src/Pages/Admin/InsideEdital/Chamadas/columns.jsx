import ChamadaEditModal from "@/Components/Admin/InsideEdital/Modais/Chamadas/ChamadaEditModal";
import ChamadaShowModal from "@/Components/Admin/InsideEdital/Modais/Chamadas/ChamadaShowModal";
import { ArrowUpDown } from "lucide-react";

const columns = [
  

  {
    accessorKey: "n_chamada",
    header: "Nº da Chamada",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "inicio_matricula",
    header: "Início da Matrícula",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "fim_matricula",
    header: "Fim da Matrícula",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    accessorKey: "resultado_final",
    header: "Resultado Final",
    cell: (props) => <span>{props.getValue()}</span>
  },
  {
    id: "actions",
    header: "Ações",
    cell: () => (
      <div className="flex items-center space-x-2 justify-center">
        {/* Chamada Show Modal */}
        <ChamadaShowModal />
        {/* Chamada Edit Modal */}
        <ChamadaEditModal />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export default columns;