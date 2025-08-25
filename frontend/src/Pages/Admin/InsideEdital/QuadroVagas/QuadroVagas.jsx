import MainTable from '../../../../Components/Global/Tables/MainTable/MainTable'
import React, { use, useContext, useEffect, useState } from 'react'
import { AppContext } from '@/Contexts/AppContext';
import AccessDenied from '../../../../Components/Global/AccessDenied/AccessDenied';
import columns from './columns';
import { Clipboard, ContactRound, UserRoundPen } from 'lucide-react';
import { useParams } from 'react-router-dom';
import StatsCard from '@/Components/Global/Cards/StatsCard';
import QuadroVagasCreateModal from '@/Components/Admin/InsideEdital/Modais/QuadroVagas/QuadroVagasCreateModal';
import Loader from '@/Components/Global/Loader/Loader';
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';

const QuadroVagas = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin } = useContext(AppContext);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quadroVagas, setQuadroVagas] = useState(false);
  const { token, verifyStatusRequest } = useContext(AppContext);

  useEffect(() => {
    const fetchQuadroVagas = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/quadro-vagas/${editalId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (!res.ok) {
          verifyStatusRequest(res.status, result);
          throw new Error(`Erro ao buscar Quadro de Vagas: ${res.status} ${res.statusText}`);
        }

        setQuadroVagas(result.data);
      } catch (error) {

        setQuadroVagas([]);
        throw new Error(`Erro ao buscar cursos: ${error}`)
      } finally {
        setLoading(false);
      }
    };
    fetchQuadroVagas();
  }, [needUpdate]);

  useEffect(() => {
    console.log("quadroVagas: ", quadroVagas);
  }, [quadroVagas]);

  if (hasPermissionForEdital('visualizar-campi-cursos', editalId) || isSuperAdmin())
    return (
      <>
        {loading && <LoaderPages />}
        {!loading &&
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Quadro de Vagas</h1>
              <QuadroVagasCreateModal setNeedUpdate={setNeedUpdate} />
            </div>
            <div className="flex gap-4 mb-4">
              <StatsCard title={"Nº de Quadros"} quant={5}>
                <Clipboard className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
              </StatsCard>
              <StatsCard title={"Total de Vagas"} quant={120}>
                <ContactRound className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
              </StatsCard>
            </div>
            <MainTable data={quadroVagas} columns={columns} title={"Quadro de Vagas"} setNeedUpdate={setNeedUpdate} />
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

export default QuadroVagas