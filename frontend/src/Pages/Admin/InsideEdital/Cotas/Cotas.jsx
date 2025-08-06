import { AppContext } from '@/Contexts/AppContext';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import data from './data';
import columns from './columns';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import { UserRoundPen } from 'lucide-react';
import StatsCard from '@/Components/Global/Cards/StatsCard';

const Cotas = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-situacoes', editalId) || isSuperAdmin())
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Gerenciamento de Cotas</h1>
        <div className="flex gap-4 mb-4">
          <StatsCard title={"Nº de Cotistas"} quant={30}>
            <UserRoundPen className="text-[var(--stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
        </div>
        <MainTable data={data} columns={columns} title={"Cotas"} />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Cotas