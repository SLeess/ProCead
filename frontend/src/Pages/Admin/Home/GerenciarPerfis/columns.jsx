import PerfilDeleteModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilDeleteModal";
import PerfilEditModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilEditModal";
import PerfilShowModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilShowModal";
import { Eye, Pencil, Trash, List, TriangleAlert } from "lucide-react";
import React from "react";

export const getColumns = (navigate) => [
  
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
      accessorKey: "escopo",
      header:"Escopo",
      cell: ({row}) => <span>{row.original.escopo}</span>
    },
    {
      id: "actions",
      header: "Ações",
      alignText: true,
      cell: ({row}) => {
        return (
        <div className="flex items-center space-x-2 justify-center">
          <button onClick={() => navigate(`admin/perfis/${row.original.id}/permissoes`)} className="p-1 hover:bg-gray-200 rounded-full">
              <List className="h-5 w-5 text-green-500" />
          </button>
          {/* <button onClick={() => {}} className="p-1 hover:bg-gray-200 rounded-full">
              <Eye className="h-5 w-5 text-blue-500" />
          </button> */}
          <PerfilShowModal perfil={{name: row.original.nome, scope: row.original.escopo}}/>
          <PerfilEditModal perfil={{name: row.original.nome, scope: row.original.escopo, id: row.original.id}}/>
          <PerfilDeleteModal perfil={{id: row.original.id}}/>
        </div>
      )},
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default getColumns;