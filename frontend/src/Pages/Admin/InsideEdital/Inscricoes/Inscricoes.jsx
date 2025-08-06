import MainTable from '../../../../Components/Global/Tables/MainTable/MainTable'
import React, { useContext } from 'react'
import { AppContext } from '@/Contexts/AppContext';
import AccessDenied from '../../../../Components/Global/AccessDenied/AccessDenied';
import data from './data'
import columns from './columns';
import { UserRoundPen } from 'lucide-react';
import { useParams } from 'react-router-dom';

const Inscricoes = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-inscricoes', editalId) || isSuperAdmin())
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Gerenciamento de Inscrições</h1>
        <div className="flex gap-4 mb-4">
          <div className="bg-[var(--stats-card)] shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-white mb-1">Nº de Inscrições</p>
            <p className="text-white text-2xl font-bold mb-1">1223</p>
            <UserRoundPen className="text-white absolute top-4 right-4" />
          </div>
        </div>
        <MainTable data = {data} columns = {columns} title={"Inscrições"}/>
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Inscricoes