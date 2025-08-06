import { AppContext } from '@/Contexts/AppContext';
import React, { useContext } from 'react'
import data from './data';
import columns from './columns';
import PerfilCreateModal from '@/Components/Admin/InsideEdital/Modais/Perfis/PerfilCreateModal';
import { Component } from 'lucide-react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import { useParams } from 'react-router-dom';

const Perfis = () => {
  
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-perfis', editalId) || isSuperAdmin())
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Perfis</h1>
        <div className="flex gap-4 mb-4">
          <div className="bg-[var(--stats-card)] shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-white mb-1">Nº de Pefis</p>
            <p className="text-white text-2xl font-bold mb-1">3</p>
            <Component className="absolute top-4 right-4 text-white" />
          </div>
        </div>
        <MainTable data={data} columns={columns} title={"Perfis"} />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Perfis