import { AppContext } from '@/Contexts/AppContext';
import { Phone } from 'lucide-react';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import data from './data';
import columns from './columns';
import AccessDenied from '@/Components/Global/AccessDenied/AccessDenied';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';

const Chamadas = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-cursos', editalId) || isSuperAdmin())
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Chamadas para Matrícula</h1>
          {/* TODO: Chamada Create Modal */}
        </div>
        <div className="flex gap-4 mb-4">
          <div className="bg-[var(--stats-card)] shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-white mb-1">Nº de Chamadas Feitas</p>
            <p className="text-white text-2xl font-bold mb-1">2</p>
            <Phone className="absolute top-4 right-4 text-white" />
          </div>
        </div>
        <MainTable data={data} columns={columns} title={"Chamadas"} />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Chamadas