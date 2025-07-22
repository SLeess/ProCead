import MainTable from '../../../Components/Table/MainTable'
import React, { useContext } from 'react'
import { AppContext } from '@/Contexts/AppContext';
import AccessDenied from '../../../Components/AccessDenied';
import data from './data'
import columns from './columns';
import { Grid2x2Plus, UserRoundPen } from 'lucide-react';

const QuadroVagas = () => {
  const { can, isAdmin } = useContext(AppContext);
  if (can('visualizar-inscricoes') && isAdmin())
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Quadro de Vagas</h1>
        <div className="flex gap-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-gray-600 mb-1">Nº de Quadros</p>
            <p className="text-2xl font-bold mb-1">123</p>
            <Grid2x2Plus className="absolute top-4 right-4 text-gray-500" />
          </div>
          <div className="bg-white shadow-md rounded-lg p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-gray-600 mb-1">Total de Vagas</p>
            <p className="text-2xl font-bold mb-1">123</p>
            <UserRoundPen className="absolute top-4 right-4 text-gray-500" />
          </div>
        </div>
        <MainTable data={data} columns={columns} />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default QuadroVagas