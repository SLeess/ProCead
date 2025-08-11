import MainTable from '../../../../Components/Global/Tables/MainTable/MainTable'
import React, { useContext } from 'react'
import { AppContext } from '@/Contexts/AppContext';
import AccessDenied from '../../../../Components/Global/AccessDenied/AccessDenied';
import data from './data'
import columns from './columns';
import { FileText } from 'lucide-react';
import { useParams } from 'react-router-dom';
import StatsCard from '@/Components/Global/Cards/StatsCard';

const Inscricoes = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-inscricoes', editalId) || isSuperAdmin())
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Gerenciamento de Inscrições</h1>
        <div className="flex gap-4 mb-4">
          <StatsCard title={"Nº de Inscrições"} quant={1000}>
            <FileText className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
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