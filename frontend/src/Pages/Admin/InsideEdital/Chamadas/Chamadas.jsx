import { AppContext } from '@/Contexts/AppContext';
import { Bell } from 'lucide-react';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import data from './data';
import columns from './columns';
import AccessDenied from '@/Components/Global/AccessDenied/AccessDenied';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import StatsCard from '@/Components/Global/Cards/StatsCard';

const Chamadas = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-cursos', editalId) || isSuperAdmin())
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Chamadas para Matrícula</h1>
          {/* TODO: Chamada Create Modal */}
        </div>
        <div className="flex gap-4 mb-4">
          <StatsCard title={"Nº de Chamadas Feitas"} quant={3}>
            <Bell className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
        </div>
        <MainTable data={data} columns={columns} title={"Chamadas"} />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Chamadas