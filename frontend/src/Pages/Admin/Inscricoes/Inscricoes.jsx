import MainTable from '../../../Components/Table/MainTable'
import React, { useContext } from 'react'
import { AppContext } from '@/Contexts/AppContext';
import AccessDenied from '../../../Components/AccessDenied';
import data from './data'
import columns from './columns';

const Inscricoes = () => {
  const { can, isAdmin } = useContext(AppContext);
  if(can('visualizar-inscricoes') && isAdmin())
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Gerenciamento de Inscrições</h1>
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-xs">
          <p className="text-gray-600">nº de inscrições</p>
          <p className="text-2xl font-bold">123</p>
        </div>
        <MainTable data = {data} columns = {columns}/>
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Inscricoes