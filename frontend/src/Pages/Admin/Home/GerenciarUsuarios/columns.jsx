import PerfilDeleteModal from "@/Components/Admin/InsideEdital/Modais/Perfis/PerfilDeleteModal";
import UserEditProfileModal from "@/Components/Admin/InsideEdital/Modais/Usuario/UserEditProfileModal";
import UserShowProfileModal from "@/Components/Admin/InsideEdital/Modais/Usuario/UserShowProfileModal";
import CPFPill from "@/Components/Global/Tables/Components/Pills/CPFPill";
import NivelDeAcessoPill from "@/Components/Global/Tables/Components/Pills/NivelDeAcessoPill";
import { SelectInput, TextInput } from "@/Components/Global/ui/modals";
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
      aditionalSearchInput: ({advancedSearchTerm, updateAttr}) => (
        <TextInput 
          name={"nome"} 
          className="" 
          value={advancedSearchTerm["nome"]}
          onChange={updateAttr}
        />
      ),
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header:"E-mail",
      cell: ({row}) => <span>{row.original.email}</span>,
      aditionalSearchInput: ({advancedSearchTerm, updateAttr}) => (
        <TextInput 
          name={"email"} 
          className="" 
          value={advancedSearchTerm["email"]}
          onChange={updateAttr}
        />
      ),
    },
    {
      accessorKey: "level_access",
      header:"Nível de Acesso",
      cell: ({row}) => <NivelDeAcessoPill>{row.original.level_access}</NivelDeAcessoPill>,
      aditionalSearchInput: ({advancedSearchTerm, updateAttr}) => (
        <SelectInput 
          name={"level_access"} 
          value={advancedSearchTerm.level_access} 
          onChange={updateAttr} 
          options={['', 'Administrador', 'Moderador', 'Usuário']} 
        />
      ),
    },
    {
      accessorKey: "cpf",
      header:"CPF",
      cell: ({row}) => <CPFPill>{row.original.cpf}</CPFPill>,
      aditionalSearchInput: ({advancedSearchTerm, updateAttr}) => (
        <TextInput 
          name={"cpf"} 
          className="" 
          // className="md:col-span-4" 
          value={advancedSearchTerm["cpf"]}
          onChange={updateAttr}
        />
      ),
    },
    {
      id: "actions",
      header: "Ações",
      alignText: true,
      cell: ({row}) => (
        <div className="flex items-center space-x-2 justify-center">
          <button onClick={() => navigate(`admin/usuarios/${row.original.uuid}/cargos-e-permissoes`)} id="acoes-icons">
              <List className="h-5 w-5 text-green-500" />
          </button>
          <UserShowProfileModal user={row.original}></UserShowProfileModal>
          <UserEditProfileModal user={row.original}></UserEditProfileModal>
          <PerfilDeleteModal perfil={{id: row.original.id}}/>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

export default GerenciarUsuariosColumns;