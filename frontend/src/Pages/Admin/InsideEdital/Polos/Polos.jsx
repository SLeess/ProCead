import { AppContext } from '@/Contexts/AppContext';
import React, { useContext } from 'react'
import data from './data'
import columns from './columns';
import { Building2, GraduationCap, Plus } from 'lucide-react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import PoloCreateModal from '@/Components/Admin/InsideEdital/Modais/Polos/PoloCreateModal';
import { useParams } from 'react-router-dom';
import StatsCard from '@/Components/Global/Cards/StatsCard';

const Polos = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-campus', editalId) || isSuperAdmin())
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Polos</h1>
          <PoloCreateModal/>
        </div>
        <div className="flex gap-4 mb-4">
          <StatsCard title={"Nº de Polos"} quant={3}>
            <Building2 className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
        </div>
        <MainTable data={data} columns={columns} title={"Polos"} />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Polos