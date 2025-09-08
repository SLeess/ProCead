import PerfilDeleteModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilDeleteModal";
import PerfilEditModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilEditModal";
import PerfilShowModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilShowModal";
import CPFPill from "@/Components/Global/Tables/MainTable/Components/Pills/CPFPill";
import NivelDeAcessoPill from "@/Components/Global/Tables/MainTable/Components/Pills/NivelDeAcessoPill";
import { Eye, Pencil, Trash, List, TriangleAlert } from "lucide-react";
import React from "react";

export const GerenciarUsuariosColumns = (navigate) => [
  
    {
      accessorKey: "uuid",
      header:"Uuid",
      cell: ({row}) => <span>{row.original.uuid}</span>,
      columnVisibility: false,
    },
    
    {
      accessorKey: "nome",
      header:"Nome Completo",
      cell: ({row}) => <span>{row.original.nome}</span>,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header:"E-mail",
      cell: ({row}) => <span>{row.original.email}</span>
    },
    {
      accessorKey: "level_access",
      header:"Nível de Acesso",
      cell: ({row}) => <NivelDeAcessoPill>{row.original.level_access}</NivelDeAcessoPill>
    },
    {
      accessorKey: "cpf",
      header:"CPF",
      cell: ({row}) => <CPFPill>{row.original.cpf}</CPFPill>,
      enableSorting: false,
    },
    {
      id: "actions",
      header: "Ações",
      alignText: true,
      cell: ({row}) => {
        return (
        <div className="flex items-center space-x-2 justify-center">
          <button onClick={() => navigate(`admin/usuarios/${row.original.uuid}/cargos-e-permissoes`)} id="acoes-icons">
              <List className="h-5 w-5 text-green-500" />
          </button>
          {/* <button onClick={() => {}} id="acoes-icons">
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

export default GerenciarUsuariosColumns;