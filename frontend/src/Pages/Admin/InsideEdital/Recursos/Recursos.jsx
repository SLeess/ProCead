import AccessDenied from '@/Components/Global/AccessDenied/AccessDenied';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import { AppContext } from '@/Contexts/AppContext';
import { UserRoundPen } from 'lucide-react';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import data from './data';
import columns from './columns';

const Recursos = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-recursos', editalId) || isSuperAdmin())
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Recursos Gerais</h1>
        <div className="flex gap-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-gray-600 mb-1">Nº de Recursos</p>
            <p className="text-2xl font-bold mb-1">36</p>
            <UserRoundPen className="absolute top-4 right-4 text-gray-500" />
          </div>
        </div>
        <MainTable data={data} columns={columns} title={"Recursos"} />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Recursos