import { AppContext } from '@/Contexts/AppContext';
import React, { useContext } from 'react'
import data from './data'
import columns from './columns';
import { Component, GraduationCap, Plus } from 'lucide-react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import ModalidadeCreateModal from '@/Components/Admin/InsideEdital/Modais/Modalidades/ModalidadeCreateModal';
import { useParams } from 'react-router-dom';
import StatsCard from '@/Components/Global/Cards/StatsCard';

const Modalidades = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-modalidades', editalId) || isSuperAdmin())
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Modalidades</h1>
          <ModalidadeCreateModal/>
        </div>
        <div className="flex gap-4 mb-4">
          <StatsCard title={"Nº de Modalidades"} quant={3}>
            <Component className="text-[var(--stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
        </div>
        <MainTable data={data} columns={columns} title={"Modalidades"} />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Modalidades