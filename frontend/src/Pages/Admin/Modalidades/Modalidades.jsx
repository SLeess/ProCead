import { AppContext } from '@/Contexts/AppContext';
import React, { useContext } from 'react'
import data from './data'
import columns from './columns';
import { Component, GraduationCap, Plus } from 'lucide-react';
import MainTable from '@/Components/Table/MainTable';
import ModalidadeCreateModal from '@/Components/Modals/Modalidades/ModalidadeCreateModal';
import { useParams } from 'react-router-dom';

const Modalidades = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-inscricoes', editalId))
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Modalidades</h1>
          <ModalidadeCreateModal/>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-gray-600 mb-1">Nº de Modalidades</p>
            <p className="text-2xl font-bold mb-1">3</p>
            <Component className="absolute top-4 right-4 text-gray-500" />
          </div>
        </div>
        <MainTable data={data} columns={columns} title={"Cursos"} />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Modalidades