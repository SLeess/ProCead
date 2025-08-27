import { AppContext } from '@/Contexts/AppContext';
import { Bell } from 'lucide-react';
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import data from './data';
import columns from './columns';
import AccessDenied from '@/Components/Global/AccessDenied/AccessDenied';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import StatsCard from '@/Components/Global/Cards/StatsCard';
import ChamadaCreateModal from '@/Components/Admin/InsideEdital/Modais/Chamadas/ChamadaCreateModal';

const Chamadas = () => {
  const navigate = useNavigate();
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);

  function irParaPreview(editalId) {
    navigate(`/admin/edital/${editalId}/preview-chamada`);
  }

  if (hasPermissionForEdital('visualizar-cursos', editalId) || isSuperAdmin())
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Chamadas para Matrícula</h1>
          <div className='flex gap-2'>
            <button className='bg-white hover:bg-[var(--admin-button-hover-2)] px-4 py-2 rounded-md shadow-sm font-semibold cursor-pointer' onClick={() => { irParaPreview(editalId)}}>Pré-Visualização</button>
            <ChamadaCreateModal />
          </div>
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