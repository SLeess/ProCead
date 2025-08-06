import { AppContext } from '@/Contexts/AppContext';
import { ShieldUser, UsersRound } from 'lucide-react';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import data from './data';
import columns from './columns';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import AdminCreateModal from '@/Components/Admin/InsideEdital/Modais/Usuario/AdminCreateModal';

const Usuarios = () => {
  
  const { editalId } = useParams();
  const { hasPermissionForEdital , isSuperAdmin} = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-usuarios', editalId) || isSuperAdmin())
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Usuários</h1>
        <div className="flex gap-4 mb-4">
          <div className="bg-[var(--stats-card)] shadow-sm rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-white mb-1">Nº de Candidatos</p>
            <p className="text-white text-2xl font-bold mb-1">1.123</p>
            <UsersRound className="absolute top-4 right-4 text-white" />
          </div>
          <div className="bg-[var(--stats-card)] shadow-sm rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-white mb-1">Nº de Administradores</p>
            <p className="text-white text-2xl font-bold mb-1">20</p>
            <ShieldUser className="absolute top-4 right-4 text-white" />
          </div>
        </div>
        <MainTable data = {data} columns = {columns} title={"Usuarios"}/>
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Usuarios