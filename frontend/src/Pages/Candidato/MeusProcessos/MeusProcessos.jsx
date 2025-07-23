import React, { useEffect, useMemo, useRef, useState } from 'react';
import './MeusProcessos.css'
import { FaSearch } from 'react-icons/fa';
import { IoIosFunnel } from "react-icons/io";
import { CiInboxIn } from "react-icons/ci";
import ProcessoPessoalCard from '@/Components/Candidatos/ProcessoPessoalCard/ProcessoPessoalCard.tsx';
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useAppContext } from '@/Contexts/AppContext';
import { toast } from 'react-toastify';
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import NavLinkTables from '@/Components/Global/NavLinkTables/NavLinkTables';

function MeusProcessos() {
  const { token } = useAppContext();
  const [meusProcessos, setMeusProcessos] = useState([]);
  const [search, setSearch] = useState('');
  
  /** ------------------ Lidando com Filtros ------------------ **/
  const [filtro, setFiltro] = useState("Todos");
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const filterDropdownRef  = useRef(null);

  /** Buscar na API os processos seletivos que o usuário participa ou participou **/

  useEffect(() => {
    const fetchMeusProcessos = async () => {
      setLoading(true);
      setErrors([]);
      /** pra testar o loading com demora */
      // await new Promise(resolve => setTimeout(resolve, 5000));
      try {
          const res = await fetch('/api/user/meus-processos', { // Substitua pela URL real da sua API
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
          setMeusProcessos(result.data);
      } catch (err) {
          setErrors(e => [...e, "Não foi possível carregar seus processos seletivos. Tente novamente mais tarde.", err]);
          setMeusProcessos([]);
      } finally {
        setLoading(false);
        errors.forEach((error) => toast.error(error));
      }
    };
    fetchMeusProcessos();
  }, []);

  /**Atualizar e aparecer o dropdown de filtros */
  useEffect(() => {
      if (!filterOpen) return;

      const handleClickOutside = (event) => {
          if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
              setFilterOpen(false);
          }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [filterOpen]);

  function handleChangeFilters(e){
    setFiltro(e.target.value);
  }

  /** --------------------------------------------------------- **/

  /** ------------------ Lidando com Tabelação dos componentes cards para permitir paginação ------------------ **/
  const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 5,
  });
  const data = useMemo(() => meusProcessos, [meusProcessos]);
  const columns = useMemo(() => [
      { accessorKey: 'descricao', header: 'Descrição', cell: info => info.getValue() },
      { accessorKey: 'edital', header: 'Edital', cell: info => info.getValue() },
      { accessorKey: 'status', header: 'Status', cell: info => info.getValue() },
      { accessorKey: 'obs', header: 'Observação', cell: info => info.getValue() },
  ], []);
  
  /** */
  const memoizedGlobalFilter = useMemo(() => ({
    search,
    filtro,
  }), [search, filtro]);

  const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
          globalFilter: memoizedGlobalFilter,
          // globalFilter: search || filtro,
          pagination,
      },
      onPaginationChange: setPagination,
      //  filtro de coluna personalizado pelo status e pelo campo de Pesquisa
      globalFilterFn: (row, columnId, filterValue) => {
            const searchTerm = filterValue.search  ? filterValue.search.toLowerCase() : '';

            // Lógica para busca textual (se houver um termo de busca)
            let textMatches = true;
            if (searchTerm) {
                const rowValues = Object.values(row.original).join(' ').toLowerCase();
                textMatches = rowValues.includes(searchTerm);
            }

            // Lógica para filtro de status
            const statusMatches = (filterValue.filtro === 'Todos' || row.original.status === filterValue.filtro);

            return textMatches && statusMatches;
      },
  });

  /** --------------------------------------------------------------------------------------------------------- **/

  function handleFormSubmit(e){
    e.preventDefault();
  }

  return (
    <>
    <section id='MeusProcessos'>
      <form onSubmit={handleFormSubmit}>
        <header>
          <h1>Meus Processos Seletivos</h1>
          <div className='flex flex-col items-center sm:flex-row gap-2'>
            <div className="searchInputDiv">
              <div className="divFaSearchIcon">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>Buscar</button>
            </div>
            <div className='filterContent' ref={filterDropdownRef}>
              <button onClick={() => setFilterOpen(!filterOpen)}>
                <IoIosFunnel/>
                Filtros
              </button>
              {filterOpen && (
                    <div className="filtersModal">
                      <p>Filtrar por Status</p>
                      {['Todos', 'Em andamento', 'Encerrado'].map(statusOption => (
                          <div key={statusOption} className="flex items-center mb-1">
                              <input
                                  type="radio"
                                  id={`status-${statusOption}`}
                                  name="statusFilter"
                                  value={statusOption}
                                  checked={filtro === statusOption}
                                  onChange={handleChangeFilters}
                                  className="form-radio text-blue-600"
                              />
                              <label htmlFor={`status-${statusOption}`} className="ml-2 text-sm text-gray-700 dark:text-gray-200">
                                  {statusOption}
                              </label>
                          </div>
                      ))}
                  </div>
                )}
            </div>

          </div>
        </header>
        {
        loading ?
            <LoaderPages/> : 
            table.getRowModel().rows.length > 0 ?
              (           
                <ul className='grid grid-cols-1 gap-6'>
                  {
                    table.getRowModel().rows.map((processo) => 
                        <ProcessoPessoalCard 
                          key={processo.original.id} 
                          processo={processo.original}
                          />
                    )
                  }
                </ul>
              )
              :
              <div className='info-not-found-itens'>
                  <CiInboxIn className="ICON" />
                  <p id='first'>Ops! Nenhum processo foi encontrado.</p>
                  <p id='second'>
                      Não encontramos nenhum processo seletivo que corresponda aos seus critérios de busca ou filtros os quais você tenha participado.
                      Tente ajustar sua pesquisa ou limpar os filtros para ver mais opções.
                  </p>
              </div>
        }
        { 
          table.getRowModel().rows.length > 0 &&
          <NavLinkTables table={table}/>
        }
      </form>
    </section>
    </>
  );
}

export default MeusProcessos;