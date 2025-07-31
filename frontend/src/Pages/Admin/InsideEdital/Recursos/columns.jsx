import RecursoEditModal from "@/Components/Admin/InsideEdital/Modais/Recursos/RecursoEditModal";
import RecursoShowModal from "@/Components/Admin/InsideEdital/Modais/Recursos/RecursoShowModal";
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
      accessorKey: "inscricao",
      header:"Nº de Inscrição",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "nome",
      header:"Nome",
      cell: (props) => <span>{props.getValue()}</span>
    },
    
    {
      accessorKey: "cpf",
      header:"CPF",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "tipo_recurso",
      header:"Tipo de Recurso",
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
        <div className="flex items-center space-x-2">
          <RecursoShowModal/>
          <RecursoEditModal/>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;