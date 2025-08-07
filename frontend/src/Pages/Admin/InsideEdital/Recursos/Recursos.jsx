import AccessDenied from '@/Components/Global/AccessDenied/AccessDenied';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import { AppContext } from '@/Contexts/AppContext';
import { AlertTriangle } from 'lucide-react';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import data from './data';
import columns from './columns';
import StatsCard from '@/Components/Global/Cards/StatsCard';

const Recursos = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-recursos', editalId) || isSuperAdmin())
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Recursos Gerais</h1>
        <div className="flex gap-4 mb-4">
          <StatsCard title={"Nº de Recursos"} quant={30}>
            <AlertTriangle className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
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