import { AppContext } from '@/Contexts/AppContext';
import React, { useContext, useEffect, useState } from 'react'
import columns from './columns';
import { MapPin, GraduationCap, Plus } from 'lucide-react';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import PoloCreateModal from '@/Components/Admin/InsideEdital/Modais/Polos/PoloCreateModal';
import { useParams } from 'react-router-dom';
import StatsCard from '@/Components/Global/Cards/StatsCard';
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';

const Polos = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin, verifyStatusRequest, token } = useContext(AppContext);
  const [polos, setPolos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [needUpdate, setNeedUpdate] = useState(false);

  useEffect(() => {
    const fetchProcessos = async () => {
      setLoading(true);
      // await new Promise(resolve => setTimeout(resolve, 5000));
      try {
        const res = await fetch(`/api/admin/polos/${editalId}`, { // Substitua pela URL real da sua API
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Descomente se precisar de token
          },
        });

        if (!res.ok) {
          verifyStatusRequest(res);
          throw new Error(`Erro ao buscar processos: ${res.status} ${res.statusText}`);
        }

        const result = await res.json();
        console.log(result);
        setPolos(result.data);
      } catch (error) {
        console.log(error);
        setPolos([]);
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
            <MainTable data={polos} columns={columns} title={"Polos"} />
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