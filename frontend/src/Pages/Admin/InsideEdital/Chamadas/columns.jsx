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
      <div className="flex items-center space-x-2">
        {/* Chamada Show Modal */}
        {/* Chamada Edit Modal */}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export default columns;