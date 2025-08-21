import { AppContext } from '@/Contexts/AppContext';
import React, { useContext, useEffect, useState } from 'react'
import columns from './columns';
import { BookOpen, Plus } from 'lucide-react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import CursoCreateModal from '@/Components/Admin/InsideEdital/Modais/Cursos/CursoCreateModal';
import { useParams } from 'react-router-dom';
import AccessDenied from '@/Components/Global/AccessDenied/AccessDenied';
import StatsCard from '@/Components/Global/Cards/StatsCard';
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';

const Cursos = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin, token, verifyStatusRequest } = useContext(AppContext);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [needUpdate, setNeedUpdate] = useState(false);

  useEffect(() => {
    const fetchProcessos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/cursos/${editalId}`, {
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

        console.log(result);
        setCursos(result.data);
      } catch (error) {
        console.log(error);
        setCursos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProcessos();
  }, [needUpdate]);

  if (hasPermissionForEdital('visualizar-cursos', editalId) || isSuperAdmin())
    return (
      <>
        {
          loading && <LoaderPages />
        }
        {!loading &&
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Cursos</h1>
              <CursoCreateModal setNeedUpdate={setNeedUpdate}/>
            </div>
            <div className="flex gap-4 mb-4">
              <StatsCard title={"Nº de Cursos"} quant={3}>
                <BookOpen className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
              </StatsCard>
            </div>
            <MainTable data={cursos} columns={columns} title={"Cursos"} setNeedUpdate={setNeedUpdate}/>
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

export default Cursos