import { AppContext } from '@/Contexts/AppContext';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import data from './data';
import columns from './columns';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import { AlertTriangle, FileText, GraduationCap, ShieldCheck } from 'lucide-react';
import StatsCard from '@/Components/Global/Cards/StatsCard';

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
          <StatsCard title={"Total de Inscrições"} quant={400}>
            <FileText className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>

          <StatsCard title={"Total de Cotas"} quant={300}>
            <ShieldCheck className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>

          <StatsCard title={"Total de Recursos"} quant={200}>
            <AlertTriangle className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>

          <StatsCard title={"Total de Matrículas"} quant={100}>
            <GraduationCap className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
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