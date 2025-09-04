import MainTable from '../../../../Components/Global/Tables/MainTable/MainTable'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '@/Contexts/AppContext';
import AccessDenied from '../../../../Components/Global/AccessDenied/AccessDenied';
import data from './data'
import columns from './columns';
import { FileText } from 'lucide-react';
import { useParams } from 'react-router-dom';
import StatsCard from '@/Components/Global/Cards/StatsCard';

const Inscricoes = () => {
  const { editalId } = useParams();
  const { hasPermissionForEdital, isSuperAdmin, token, verifyStatusRequest} = useContext(AppContext);
  const [inscricoes, setInscricoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [needUpdate, setNeedUpdate] = useState(false);

  useEffect(() => {
      const fetchCursos = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/admin/inscricoes/${editalId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
  
          const result = await res.json();
  
          if (!res.ok) {
            verifyStatusRequest(res.status, result);
            throw new Error(`Erro ao buscar inscrições: ${res.status} ${res.statusText}`);
          }
  
          setInscricoes(result.data);
        } catch (error) {
          
          setInscricoes([]);
          throw new Error(`Erro ao buscar inscrições: ${error}`)
        } finally {
          setLoading(false);
        }
      };
     fetchCursos();
    }, [needUpdate]);


  if (hasPermissionForEdital('visualizar-inscricoes', editalId) || isSuperAdmin())
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Gerenciamento de Inscrições</h1>
        <div className="flex gap-4 mb-4">
          <StatsCard title={"Nº de Inscrições"} quant={1000}>
            <FileText className="text-[var(--admin-stats-card-text)] absolute top-4 right-4" />
          </StatsCard>
        </div>
        <MainTable data = {inscricoes} columns = {columns} title={"Inscrições"}/>
      </div>
    )
  else {
    return (
      <AccessDenied />
    )
  }
}

export default Inscricoes