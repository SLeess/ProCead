import { List } from "lucide-react";
import React from "react";
import AnexoDeleteModal from "./Modais/AnexoDeleteModal";
import AnexoEditModal from "./Modais/AnexoEditModal";

const columns = [
  
    {
      accessorKey: "id",
      header:"Id",
      cell: ({row}) => <span>{row.original.id}</span>
    },
    {
      accessorKey: "nome",
      header:"Nome",
      cell: ({row}) => <span>{row.original.nome}</span>
    },
    {
      accessorKey: "formato",
      header:"Formato",
      cell: ({row}) => <span>{row.original.formato}</span>
    },
    {
      id: "actions",
      header: "Ações",
      alignText: true,
      cell: ({row, table}) => {
        return (
        <div className="flex items-center space-x-2 justify-center">
          <AnexoDeleteModal anexo={row.original} setNeedUpdate={table.options.meta.setNeedUpdate}/>
          <AnexoEditModal anexo={row.original} setNeedUpdate={table.options.meta.setNeedUpdate} />
        </div>
      )},
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;