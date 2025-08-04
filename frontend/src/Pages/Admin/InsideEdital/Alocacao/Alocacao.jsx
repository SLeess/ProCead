import { AppContext } from '@/Contexts/AppContext';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import data from './data';
import columns from './columns';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';

const Alocacao = () => {
  
  
  const { editalId } = useParams();
  const { hasPermissionForEdital , isSuperAdmin} = useContext(AppContext);

  if (hasPermissionForEdital('alocar-inscricoes-para-avaliacao', editalId) || isSuperAdmin())
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Alocação para Avaliação</h1>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-gray-600 mb-1">Total de Inscrições</p>
            <p className="text-2xl font-bold mb-1">250</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-gray-600 mb-1">Total de Cotas</p>
            <p className="text-2xl font-bold mb-1">125</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-gray-600 mb-1">Total de Recursos</p>
            <p className="text-2xl font-bold mb-1">72</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-gray-600 mb-1">Total de Matrículas</p>
            <p className="text-2xl font-bold mb-1">128</p>
          </div>
        </div>
        <MainTable data = {data} columns = {columns} title={"Lista de Administradores"}/>
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Alocacao