import MainTable from '../../../Components/Table/MainTable'
import React, { useContext } from 'react'
import { AppContext } from '@/Contexts/AppContext';
import AccessDenied from '../../../Components/AccessDenied';

const QuadroVagas = () => {
  const { can, isAdmin } = useContext(AppContext);
  if (can('visualizar-inscricoes') && isAdmin())
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Quadro de Vagas</h1>
        <div className="flex gap-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-4 w-xs">
            <p className="text-gray-600">Nº de Quadros</p>
            <p className="text-2xl font-bold">123</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 w-xs">
            <p className="text-gray-600">Total de Vagas</p>
            <p className="text-2xl font-bold">123</p>
          </div>
        </div>
        <MainTable />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default QuadroVagas