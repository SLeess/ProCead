import { AppContext } from '@/Contexts/AppContext';
import React, { useContext, useEffect, useState } from 'react'
import columns from './columns';
import { MapPin, GraduationCap, Plus } from 'lucide-react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import PoloCreateModal from '@/Components/Admin/InsideEdital/Modais/Polos/PoloCreateModal';
import { useParams } from 'react-router-dom';
import StatsCard from '@/Components/Global/Cards/StatsCard';
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import AccessDenied from '@/Components/Global/AccessDenied/AccessDenied';

const Polos = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin, verifyStatusRequest, token } = useContext(AppContext);
  const [polos, setPolos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [needUpdate, setNeedUpdate] = useState(false);

  useEffect(() => {
    const fetchProcessos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/polos/${editalId}`, { 
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

        setPolos(result.data);
      } catch (error) {
        setPolos([]);
        throw new Error(`Erro : ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProcessos();
  }, [needUpdate]);


  if (hasPermissionForEdital('visualizar-campus', editalId) || isSuperAdmin())
    return (
      <>
        {
          loading && <LoaderPages />
        }
        {!loading &&
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Polos</h1>
              <PoloCreateModal setNeedUpdate={setNeedUpdate}/>
            </div>
            <div className="flex gap-4 mb-4">
              <StatsCard title={"Nº de Polos"} quant={polos.length}>
                <MapPin className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
              </StatsCard>
            </div>
            <MainTable data={polos} columns={columns} title={"Polos"} setNeedUpdate={setNeedUpdate} />
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

export default Polos