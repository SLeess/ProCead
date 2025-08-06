import { AppContext } from '@/Contexts/AppContext';
import React, { useContext } from 'react'
import data from './data'
import columns from './columns';
import { GraduationCap, Plus } from 'lucide-react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import CursoCreateModal from '@/Components/Admin/InsideEdital/Modais/Cursos/CursoCreateModal';
import { useParams } from 'react-router-dom';
import AccessDenied from '@/Components/Global/AccessDenied/AccessDenied';

const Cursos = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-cursos', editalId) || isSuperAdmin())
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Cursos</h1>
          <CursoCreateModal/>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="bg-[var(--stats-card)] shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-white mb-1">Nº de Cursos</p>
            <p className="text-white text-2xl font-bold mb-1">3</p>
            <GraduationCap className="absolute top-4 right-4 text-white" />
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