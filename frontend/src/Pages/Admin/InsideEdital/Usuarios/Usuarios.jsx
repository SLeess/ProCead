import { AppContext } from '@/Contexts/AppContext';
import { ShieldUser, UsersRound } from 'lucide-react';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import data from './data';
import columns from './columns';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import AdminCreateModal from '@/Components/Admin/InsideEdital/Modais/Usuario/AdminCreateModal';
import StatsCard from '@/Components/Global/Cards/StatsCard';
import AccessDenied from '@/Components/Global/AccessDenied/AccessDenied';

const Usuarios = () => {
  
  const { editalId } = useParams();
  const { hasPermissionForEdital , isSuperAdmin} = useContext(AppContext);

  if (hasPermissionForEdital('visualizar-usuarios', editalId) || isSuperAdmin())
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Usuários</h1>
        <div className="flex gap-4 mb-4">
          <StatsCard title={"Nº de Candidatos"} quant={1000}>
            <UsersRound className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
          <StatsCard title={"Nº de Administradores"} quant={20}>
            <ShieldUser className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
        </div>
        <MainTable data = {data} columns = {columns} title={"Usuarios"}/>
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Usuarios