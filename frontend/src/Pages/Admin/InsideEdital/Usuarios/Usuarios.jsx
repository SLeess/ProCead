import { AppContext } from '@/Contexts/AppContext';
import { ShieldUser, UsersRound } from 'lucide-react';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import data from './data';
import columns from './columns';
import MainTable from '@/Components/Table/MainTable';
import AdminCreateModal from '@/Components/Admin/InsideEdital/Modais/Usuario/AdminCreateModal';

const Usuarios = () => {
  
  const { editalId } = useParams();
  const { hasPermissionForEdital , isSuperAdmin} = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-usuarios', editalId) || isSuperAdmin())
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Usuários</h1>
          <AdminCreateModal/>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-gray-600 mb-1">Nº de Candidatos</p>
            <p className="text-2xl font-bold mb-1">1.123</p>
            <UsersRound className="absolute top-4 right-4 text-gray-500" />
          </div>
          <div className="bg-white shadow-md rounded-lg p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-gray-600 mb-1">Nº de Administradores</p>
            <p className="text-2xl font-bold mb-1">20</p>
            <ShieldUser className="absolute top-4 right-4 text-gray-500" />
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