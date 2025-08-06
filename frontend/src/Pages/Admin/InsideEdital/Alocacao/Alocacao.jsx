import { AppContext } from '@/Contexts/AppContext';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import data from './data';
import columns from './columns';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import { AlertTriangle, FileText, GraduationCap, ShieldCheck } from 'lucide-react';

const Alocacao = () => {


  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('alocar-inscricoes-para-avaliacao', editalId) || isSuperAdmin())
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Alocação para Avaliação</h1>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="bg-[var(--stats-card)] shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-white mb-1">Total de Inscrições</p>
            <p className="text-white text-2xl font-bold mb-1">250</p>
            <FileText className="absolute top-4 right-4 text-white" />

          </div>
          <div className="bg-[var(--stats-card)] shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-white mb-1">Total de Cotas</p>
            <p className="text-white text-2xl font-bold mb-1">125</p>
            <ShieldCheck className="absolute top-4 right-4 text-white" />

          </div>
          <div className="bg-[var(--stats-card)] shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-white mb-1">Total de Recursos</p>
            <p className="text-white text-2xl font-bold mb-1">72</p>
            <AlertTriangle className="absolute top-4 right-4 text-white" />

          </div>
          <div className="bg-[var(--stats-card)] shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
            <p className="text-white mb-1">Total de Matrículas</p>
            <p className="text-white text-2xl font-bold mb-1">128</p>
            <GraduationCap className="absolute top-4 right-4 text-white" />

          </div>
        </div>
        <MainTable data={data} columns={columns} title={"Lista de Administradores"} />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Alocacao