import { AppContext } from '@/Contexts/AppContext';
import React, { useContext, useEffect, useState } from 'react'
import columns from './columns';
import { Layers, GraduationCap, Plus } from 'lucide-react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import ModalidadeCreateModal from '@/Components/Admin/InsideEdital/Modais/Modalidades/ModalidadeCreateModal';
import { useParams } from 'react-router-dom';
import StatsCard from '@/Components/Global/Cards/StatsCard';
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';

const Modalidades = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin, token, verifyStatusRequest } = useContext(AppContext);
  const [modalidades, setModalidades] = useState([]);
  const [loading, setLoading] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  useEffect(() => {
    const fetchProcessos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/modalidades/${editalId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          verifyStatusRequest(res);
          throw new Error(`Erro ao buscar processos: ${res.status} ${res.statusText}`);
        }

        const result = await res.json();
        console.log(result.data);
        setModalidades(result.data);
      } catch (error) {
        console.log(error);
        setModalidades([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProcessos();
  }, [needUpdate]);

  useEffect(() => {
    console.log("Modalidades: ");
    console.log(modalidades);
  }, [modalidades]);

  if (hasPermissionForEdital('visualizar-modalidades', editalId) || isSuperAdmin())
    return (
      <>
        {loading && <LoaderPages />}
        {!loading &&
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Modalidades</h1>
              <ModalidadeCreateModal setNeedUpdate={setNeedUpdate} />
            </div>
            <div className="flex gap-4 mb-4">
              <StatsCard title={"Nº de Modalidades"} quant={modalidades.length}>
                <Layers className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
              </StatsCard>
            </div>
            <MainTable data={modalidades} columns={columns} title={"Modalidades"} setNeedUpdate={setNeedUpdate} />
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

export default Modalidades