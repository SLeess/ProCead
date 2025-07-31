import DisciplinaDeleteModal from "@/Components/Admin/InsideEdital/Modais/Disciplinas/DisciplinaDeleteModal";
import DisciplinaEditModal from "@/Components/Admin/InsideEdital/Modais/Disciplinas/DisciplinaEditModal";
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
      header: "Id",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "nome",
      header: "Nome",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "curso",
      header: "Curso",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      id: "actions",
      header: "Ações",
      cell: () => (
        <div className="flex items-center space-x-2">
          <DisciplinaEditModal/>
          <DisciplinaDeleteModal/>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;