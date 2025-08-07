import { AppContext } from '@/Contexts/AppContext';
import React, { useContext } from 'react'
import data from './data'
import columns from './columns';
import { List } from 'lucide-react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import { useParams } from 'react-router-dom';
import AccessDenied from '@/Components/Global/AccessDenied/AccessDenied';
import DisciplinaCreateModal from '@/Components/Admin/InsideEdital/Modais/Disciplinas/DisciplinaCreateModal';
import StatsCard from '@/Components/Global/Cards/StatsCard';

const Disciplinas = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-disciplinas', editalId) || isSuperAdmin())
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Disciplinas</h1>
          <DisciplinaCreateModal />
        </div>
        <div className="flex gap-4 mb-4">
          <StatsCard title={"Nº de Disciplinas"} quant={3}>
            <List className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
        </div>
        <MainTable data={data} columns={columns} title={"Disciplinas"} />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Disciplinas