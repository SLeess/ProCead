import MainTable from '../../../../Components/Global/Tables/MainTable/MainTable'
import React, { useContext } from 'react'
import { AppContext } from '@/Contexts/AppContext';
import AccessDenied from '../../../../Components/Global/AccessDenied/AccessDenied';
import data from './data'
import columns from './columns';
import { Grid2x2Plus, UserRoundPen } from 'lucide-react';
import { useParams } from 'react-router-dom';

const QuadroVagas = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital , isSuperAdmin} = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-campi-cursos', editalId) || isSuperAdmin())
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Quadro de Vagas</h1>
        <div className="flex gap-4 mb-4">
          <div className="bg-[var(--stats-card)] shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-white mb-1">Nº de Quadros</p>
            <p className="text-white text-2xl font-bold mb-1">123</p>
            <Grid2x2Plus className="absolute top-4 right-4 text-white" />
          </div>
          <div className="bg-[var(--stats-card)] shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-white mb-1">Total de Vagas</p>
            <p className="text-white text-2xl font-bold mb-1">123</p>
            <UserRoundPen className="absolute top-4 right-4 text-white" />
          </div>
        </div>
        <MainTable data={data} columns={columns} title={"Quadro de Vagas"}/>
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default QuadroVagas