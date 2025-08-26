import DisciplinaDeleteModal from "@/Components/Admin/InsideEdital/Modais/Disciplinas/DisciplinaDeleteModal";
import DisciplinaEditModal from "@/Components/Admin/InsideEdital/Modais/Disciplinas/DisciplinaEditModal";
import { ArrowUpDown } from "lucide-react";

const columns = [
    
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
      accessorKey: "curso_nome",
      header: "Curso",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row, table }) => {
        const disciplina = row.original;
        const { setNeedUpdate } = table.options.meta;
        return (
          <div className="flex items-center space-x-2 justify-center">
            <DisciplinaEditModal disciplina={disciplina} setNeedUpdate={setNeedUpdate} />
            <DisciplinaDeleteModal disciplina={disciplina} setNeedUpdate={setNeedUpdate} />
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;