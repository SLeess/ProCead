import { AppContext } from '@/Contexts/AppContext';
import React, { useContext, useEffect, useState } from 'react'
import columns from './columns';
import { List } from 'lucide-react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import { useParams } from 'react-router-dom';
import AccessDenied from '@/Components/Global/AccessDenied/AccessDenied';
import DisciplinaCreateModal from '@/Components/Admin/InsideEdital/Modais/Disciplinas/DisciplinaCreateModal';
import StatsCard from '@/Components/Global/Cards/StatsCard';
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';

const Disciplinas = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);
  const { token, verifyStatusRequest } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [disciplinas, setDisciplinas] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  useEffect(() => {
    const fetchCursos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/disciplinas/${editalId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (!res.ok) {
          verifyStatusRequest(res.status, result);
          throw new Error(`Erro ao buscar processos: ${res.status} ${res.statusText}`);
        }

        setDisciplinas(result.data);
      } catch (error) {

        setDisciplinas([]);
        throw new Error(`Erro ao buscar cursos: ${error}`)
      } finally {
        setLoading(false);
      }
    };
    fetchCursos();
  }, [needUpdate]);

  if (hasPermissionForEdital('visualizar-disciplinas', editalId) || isSuperAdmin())
    return (
      <>
        {loading && <LoaderPages />}
        {!loading &&
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Disciplinas</h1>
              <DisciplinaCreateModal setNeedUpdate={setNeedUpdate} />
            </div>
            <div className="flex gap-4 mb-4">
              <StatsCard title={"Nº de Disciplinas"} quant={disciplinas.length}>
                <List className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
              </StatsCard>
            </div>
            <MainTable data={disciplinas} columns={columns} title={"Disciplinas"} setNeedUpdate={setNeedUpdate} />
          </div>
        }
      </>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Disciplinas