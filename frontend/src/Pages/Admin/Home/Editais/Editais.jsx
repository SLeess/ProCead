import './Editais.css'
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/Contexts/AppContext';
import { toast } from 'react-toastify';
import ListaEditais from '@/Components/Global/ListaEditais/ListaEditais';

function Editais() {
  const { token, verifyStatusRequest } = useAppContext();
  const [processos, setProcessos] = useState([]);
  
  /** ------------------ Lidando com Filtros ------------------ **/
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** Buscar na API os processos seletivos que o usuário participa ou participou **/

  useEffect(() => {
    const fetchProcessos = async () => {
      setLoading(true);
      // await new Promise(resolve => setTimeout(resolve, 5000));
      try {
          const res = await fetch('/api/admin/editais', { // Substitua pela URL real da sua API
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`, // Descomente se precisar de token
              },
          });

          const result = await res.json();

          if (!res.ok) {
              verifyStatusRequest(res.status, result);
              throw new Error(`Erro ao buscar processos: ${res.status} ${res.statusText}`);
          }

          setProcessos(result.data.data);
      } catch (err) {
            setError("Não foi possível carregar seus processos seletivos. " + (err.message ? ` (${err.message})` : ''));
            setProcessos([]);
        } finally {
          setLoading(false);
        }
      };
    fetchProcessos();
  }, []);

  useEffect(() => {
    toast.error(error);
  }, [error]);

  return (
    <>
    <section id='HomeAdmin'>
      <ListaEditais type={'Admin'} processos={processos} loading={loading}/>
    </section>
    </>
  );
}

export default Editais;