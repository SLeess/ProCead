import { AppContext } from '@/Contexts/AppContext';
import React, { useContext } from 'react'
import data from './data';
import columns from './columns';
import PerfilCreateModal from '@/Components/Admin/InsideEdital/Modais/Perfis/PerfilCreateModal';
import { Component } from 'lucide-react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import { useParams } from 'react-router-dom';
import StatsCard from '@/Components/Global/Cards/StatsCard';

const Perfis = () => {
  
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-perfis', editalId) || isSuperAdmin())
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Perfis</h1>
        <div className="flex gap-4 mb-4">
          <StatsCard title={"Nº de Pefis"} quant={10}>
            <Component className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
        </div>
        <MainTable data={data} columns={columns} title={"Perfis"} />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Perfis