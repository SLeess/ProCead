import StatusEditalPill from "@/Components/Global/Tables/MainTable/Components/Pills/StatusEditalPill";
import { SquareArrowOutUpRight } from "lucide-react";
import React from "react";

export const columnsGerenciarUsuariosPerfisPermissoes = (navigate, userId) => [
  
    {
      accessorKey: "edital",
      header:"Edital",
      cell: ({row}) => <span>{row.original.edital}</span>,
    },
    
    {
      accessorKey: "status",
      header:"Status",
      cell: ({row}) => <StatusEditalPill>{row.original.status}</StatusEditalPill>,
    },
    {
      id: "actions",
      header: "Ação",
      alignText: true,
      cell: ({row}) => {
        return (
        <div className="flex items-center space-x-2 justify-center">
          <button 
            onClick={() => navigate(`admin/usuarios/${userId}/cargos-e-permissoes/${row.original.id}`)} 
            id="acoes-icons">
              <SquareArrowOutUpRight className="h-5 w-5 text-[#1A72DA]" />
          </button>
          {/* <button onClick={() => {}} id="acoes-icons">
              <Eye className="h-5 w-5 text-blue-500" />
          </button> */}
          {/* <PerfilShowModal perfil={{name: row.original.nome, scope: row.original.escopo}}/>
          <PerfilEditModal perfil={{name: row.original.nome, scope: row.original.escopo, id: row.original.id}}/>
          <PerfilDeleteModal perfil={{id: row.original.id}}/> */}
        </div>
      )},
      enableSorting: false,
    },
  ];

export default columnsGerenciarUsuariosPerfisPermissoes;