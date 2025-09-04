import { List } from "lucide-react";
import React from "react";

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
      cell: ({row}) => {
        return (
        <div className="flex items-center space-x-2 justify-center">
          {/* <button onClick={() => navigate(`admin/perfis/${row.original.id}/permissoes`)} id="acoes-icons">
              <List id='avaliate-btn' />
          </button> */}
        </div>
      )},
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default columns;