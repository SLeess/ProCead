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

  const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
          globalFilter: search,
          pagination,
      },
      onGlobalFilterChange: setFiltro,
      onPaginationChange: setPagination,
      //  filtro de coluna personalizado pelo status e pelo campo de Pesquisa
      globalFilterFn: (row, columnId, filterValue) => {
            const searchTerm = filterValue ? filterValue.toLowerCase() : '';
            const currentFiltroStatus = filtro; // 'filtro' é o estado do radio button ('Todos', 'Em andamento', 'Encerrado')

            // Lógica para busca textual (se houver um termo de busca)
            let textMatches = true;
            if (searchTerm) {
                const rowValues = Object.values(row.original).join(' ').toLowerCase();
                textMatches = rowValues.includes(searchTerm);
            }

            // Lógica para filtro de status
            const statusMatches = (currentFiltroStatus === 'Todos' || row.original.status === currentFiltroStatus);

            return textMatches && statusMatches;
      },
  });

  const getFilteredAndPaginatedRows = () => {
      const rows = table.getRowModel().rows;

      if (filtro === 'Todos') {
          return rows;
      }
      return rows.filter(row => {
        return filtro === row.original.status;
      });
  };

  const paginatedAndFilteredRows = getFilteredAndPaginatedRows();


  const renderPageNumbers = () => {
    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex;
    const pageNumbers = [];
    const maxPagesToShow = 7; // Quantidade máxima de botões de página para exibir

    if (totalPages <= maxPagesToShow) {
        for (let i = 0; i < totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        // Lógica para mostrar ellipsis se houver muitas páginas
        let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPagesToShow / 2));

        if (endPage - startPage + 1 < maxPagesToShow) {
            if (currentPage < Math.floor(maxPagesToShow / 2)) {
                endPage = maxPagesToShow - 1;
            } else if (currentPage > totalPages - 1 - Math.floor(maxPagesToShow / 2)) {
                startPage = totalPages - maxPagesToShow;
            }
        }

        if (startPage > 0) {
            pageNumbers.push(0);
            if (startPage > 1) pageNumbers.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (endPage < totalPages - 1) {
            if (endPage < totalPages - 2) pageNumbers.push('...');
            pageNumbers.push(totalPages - 1);
        }
    }
    return pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
            {page === '...' ? (
                <span className="mx-3 my-1 text-gray-500">...</span>
            ) : (
                <button
                    onClick={() => table.setPageIndex(page)}
                    className={`px-3 py-2 mx-1 hover:cursor-pointer text-md not-italic font-bold leading-[18px] ${
                        table.getState().pagination.pageIndex === page
                            ? 'text-[#004DA9]' // página ativa
                            : 'text-black hover:bg-gray-200 ' // páginas inativas
                    }`}
                >
                    {page + 1}
                </button>
            )}
        </React.Fragment>
    ));
};
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
                      <p className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Filtrar por Status</p>
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
          paginatedAndFilteredRows.length > 0 ?
              (           
                <ul className='grid grid-cols-1 gap-6'>
                  {
                    paginatedAndFilteredRows.map((processo) => 
                        <ProcessoPessoalCard 
                          key={processo.original.id} 
                          processo={processo.original}
                          />
                    )
                  }
                </ul>
              )
            :
            <div className='flex flex-col items-center justify-center pb-25 text-gray-500 dark:text-gray-400'>
                <CiInboxIn className="w-24 h-24 mb-4 text-gray-400 dark:text-gray-500" />
                <p className="text-xl font-semibold mb-2">Ops! Nenhum processo foi encontrado.</p>
                <p className="text-base text-center max-w-md">
                    Não encontramos nenhum processo seletivo que corresponda aos seus critérios de busca ou filtros os quais você tenha participado.
                    Tente ajustar sua pesquisa ou limpar os filtros para ver mais opções.
                </p>
            </div>
        }
        {
          paginatedAndFilteredRows.length > 0 && 
            <div className="flex flex-col sm:flex-row justify-center items-center mt-8 px-2 md:px-0 text-sm">
              <div className="flex items-center space-x-2 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)] bg-white">
                  <button
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-[#F2F5F7] dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      &lt;
                  </button>

                  <div className="flex ">
                      {renderPageNumbers()}
                  </div>

                  <button
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-[#F2F5F7] dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      &gt;
                  </button>
              </div>
          </div>
        }
      </form>
    </section>
    </>
  );
}

export default MeusProcessos;