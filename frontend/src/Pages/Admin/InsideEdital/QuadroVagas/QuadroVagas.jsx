import MainTable from '../../../../Components/Global/Tables/MainTable/MainTable'
import React, { useContext, useState } from 'react'
import { AppContext } from '@/Contexts/AppContext';
import AccessDenied from '../../../../Components/Global/AccessDenied/AccessDenied';
import data from './data'
import columns from './columns';
import { Clipboard, ContactRound, UserRoundPen } from 'lucide-react';
import { useParams } from 'react-router-dom';
import StatsCard from '@/Components/Global/Cards/StatsCard';
import QuadroVagasCreateModal from '@/Components/Admin/InsideEdital/Modais/QuadroVagas/QuadroVagasCreateModal';

const QuadroVagas = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital , isSuperAdmin} = useContext(AppContext);
  const [needUpdate, setNeedUpdate] = useState(false);

  if (hasPermissionForEdital('visualizar-campi-cursos', editalId) || isSuperAdmin())
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Quadro de Vagas</h1>
          <QuadroVagasCreateModal setNeedUpdate={setNeedUpdate}/>
        </div>
        <div className="flex gap-4 mb-4">
          <StatsCard title={"Nº de Quadros"} quant={5}>
            <Clipboard className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
          <StatsCard title={"Total de Vagas"} quant={120}>
            <ContactRound className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
        </div>
        <MainTable data={data} columns={columns} title={"Quadro de Vagas"} setNeedUpdate={setNeedUpdate}/>
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default QuadroVagas