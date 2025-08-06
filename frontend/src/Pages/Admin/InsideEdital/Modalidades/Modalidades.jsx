import { AppContext } from '@/Contexts/AppContext';
import React, { useContext } from 'react'
import data from './data'
import columns from './columns';
import { Component, GraduationCap, Plus } from 'lucide-react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import ModalidadeCreateModal from '@/Components/Admin/InsideEdital/Modais/Modalidades/ModalidadeCreateModal';
import { useParams } from 'react-router-dom';

const Modalidades = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-modalidades', editalId) || isSuperAdmin())
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Modalidades</h1>
          <ModalidadeCreateModal/>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="bg-[var(--stats-card)] shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-white mb-1">Nº de Modalidades</p>
            <p className="text-white text-2xl font-bold mb-1">3</p>
            <Component className="absolute top-4 right-4 text-white" />
          </div>
        </div>
        <MainTable data={data} columns={columns} title={"Modalidades"} />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Modalidades