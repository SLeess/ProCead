import MainTable from '../../../../Components/Global/Tables/MainTable/MainTable'
import React, { useContext } from 'react'
import { AppContext } from '@/Contexts/AppContext';
import AccessDenied from '../../../../Components/Global/AccessDenied/AccessDenied';
import data from './data'
import columns from './columns';
import { Clipboard, ContactRound, UserRoundPen } from 'lucide-react';
import { useParams } from 'react-router-dom';
import StatsCard from '@/Components/Global/Cards/StatsCard';

const QuadroVagas = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital , isSuperAdmin} = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-campi-cursos', editalId) || isSuperAdmin())
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Quadro de Vagas</h1>
        <div className="flex gap-4 mb-4">
          <StatsCard title={"Nº de Quadros"} quant={5}>
            <Clipboard className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
          <StatsCard title={"Total de Vagas"} quant={120}>
            <ContactRound className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
        </div>
        <MainTable data={data} columns={columns} title={"Quadro de Vagas"}/>
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default QuadroVagas