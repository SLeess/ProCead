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
        {/* Chamada Edit Modal */}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export default columns;