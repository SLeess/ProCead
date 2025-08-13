import React, { useEffect, useState } from 'react';
import './MeusProcessos.css';
import { useAppContext } from '@/Contexts/AppContext';
import { toast } from 'react-toastify';
import ListaEditais from '@/Components/Global/ListaEditais/ListaEditais';

function MeusProcessos() {
  const { token, verifyStatusRequest } = useAppContext();
  const [meusProcessos, setMeusProcessos] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** Buscar na API os processos seletivos que o usuário participa ou participou **/
  useEffect(() => {
    const fetchMeusProcessos = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 5000));
      try {
          const res = await fetch('/api/candidato/meus-processos', { // Substitua pela URL real da sua API
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
          setMeusProcessos(result.data);
      } catch (err) {
          setError("Não foi possível carregar seus processos seletivos. " + (err.message ? ` (${err.message})` : ''));
          setMeusProcessos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMeusProcessos();
  }, []);

  useEffect(() => {
   toast.error(error);
  }, [error]);

  return (
    <>
    <section id='MeusProcessos'>
      <ListaEditais type={'Candidato'} processos={meusProcessos} loading={loading}/>
    </section>
    </>
  );
}

export default MeusProcessos;