import { AppContext } from '@/Contexts/AppContext';
import React, { useContext } from 'react'
import data from './data'
import columns from './columns';
import { BookOpen, Plus } from 'lucide-react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import CursoCreateModal from '@/Components/Admin/InsideEdital/Modais/Cursos/CursoCreateModal';
import { useParams } from 'react-router-dom';
import AccessDenied from '@/Components/Global/AccessDenied/AccessDenied';
import StatsCard from '@/Components/Global/Cards/StatsCard';

const Cursos = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-cursos', editalId) || isSuperAdmin())
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Cursos</h1>
          <CursoCreateModal/>
        </div>
        <div className="flex gap-4 mb-4">
          <StatsCard title={"Nº de Cursos"} quant={3}>
            <BookOpen className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
        </div>
        <MainTable data={data} columns={columns} title={"Cursos"} />
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Cursos