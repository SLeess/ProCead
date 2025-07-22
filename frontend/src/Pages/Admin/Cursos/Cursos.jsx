import { AppContext } from '@/Contexts/AppContext';
import React, { useContext } from 'react'
import data from './data'
import columns from './columns';
import { GraduationCap, Plus } from 'lucide-react';
import MainTable from '@/Components/Table/MainTable';
import CursoCreateModal from '@/Components/Modals/Cursos/CursoCreateModal';

const Cursos = () => {
  const { can, isAdmin } = useContext(AppContext);
  if (can('visualizar-inscricoes') && isAdmin())
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Cursos</h1>
          <CursoCreateModal/>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-gray-600 mb-1">Nº de Cursos</p>
            <p className="text-2xl font-bold mb-1">3</p>
            <GraduationCap className="absolute top-4 right-4 text-gray-500" />
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

export default Cursos