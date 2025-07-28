import './Home.css'
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/Contexts/AppContext';
import { toast } from 'react-toastify';
import ListaEditais from '@/Components/Global/ListaEditais/ListaEditais';

function Home() {
  const { token } = useAppContext();
  const [processos, setProcessos] = useState([]);
  
  /** ------------------ Lidando com Filtros ------------------ **/
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** Buscar na API os processos seletivos que o usuário participa ou participou **/

  useEffect(() => {
    const fetchProcessos = async () => {
      setLoading(true);
      try {
          const res = await fetch('/api/admin/editais', { // Substitua pela URL real da sua API
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`, // Descomente se precisar de token
              },
          });

          if (!res.ok) {
              throw new Error(`Erro ao buscar processos: ${res.status} ${res.statusText}`);
          }

          const result = await res.json();
          setProcessos(result.data.editais);
          
          toast.success("Todos os processos seletivos existentes no sistema foram encaminhados com sucesso.", {
            autoClose: 1800,
          });

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

export default Home;