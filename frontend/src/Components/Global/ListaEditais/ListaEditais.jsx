import './ListaEditais.css'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { CiInboxIn } from "react-icons/ci";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import ProcessoCard from '@/Components/Admin/ProcessoCard/ProcessoCard';
import { Plus, SlidersHorizontal } from 'lucide-react';
import NavLinkTables from '@/Components/Global/NavLinkTables/NavLinkTables';
import ProcessoPessoalCard from '@/Components/Candidatos/ProcessoPessoalCard/ProcessoPessoalCard';
import { NavigationContext } from '@/Contexts/NavigationContext';

function ListaEditais({ type, processos, loading }) {
  const { navigate } = useContext(NavigationContext);
  const [search, setSearch] = useState('');

  /** ------------------ Lidando com Filtros ------------------ **/
  const [filtro, setFiltro] = useState("Todos");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterDropdownRef = useRef(null);

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

  function handleChangeFilters(e) {
    setFiltro(e.target.value);
  }

  /** --------------------------------------------------------- **/

  /** ------------------ Lidando com Tabelação dos componentes cards para permitir paginação ------------------ **/
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });
  const data = useMemo(() => processos, [processos]);
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
      const searchTerm = filterValue.search ? filterValue.search.toLowerCase() : '';

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

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <header className='lista-editais-header'>
          <h1 className='header-title'>
            {
              (type === 'Admin') ? "Lista de Editais" : "Meus Processos"
            }
          </h1>

          <div className='search-filter-container'>
            <div className='search-input-wrapper'>
              <div className="search-icon-wrapper">
                <FaSearch className="search-icon" />
              </div>
              <input
                type="search"
                id="default-search"
                className="search-input"
                placeholder="Pesquisar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className='filter-button-wrapper' ref={filterDropdownRef}>
              <button
                className='filter-button'
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <SlidersHorizontal className='filter-icon' />
                Filtros
              </button>
              {filterOpen && (
                <div className="filters-modal">
                  <p className="filters-modal-title">Filtrar por Status</p>
                  {['Todos', 'Em andamento', 'Encerrado'].map(statusOption => (
                    <div key={statusOption} className="filter-option">
                      <input
                        type="radio"
                        id={`status-${statusOption}`}
                        name="statusFilter"
                        value={statusOption}
                        checked={filtro === statusOption}
                        onChange={handleChangeFilters}
                        className="filter-option-radio"
                      />
                      <label htmlFor={`status-${statusOption}`} className="filter-option-label">
                        {statusOption}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => navigate('/admin/edital/create')} 
              id='create-btn' className='flex text-nowrap'>
              <Plus className="inline" />
              <span className='ml-1'>Novo Edital</span>
            </button>

          </div>
        </header>
        {
          loading ?
            <LoaderPages /> :
            table.getRowModel().rows.length > 0 ?
              (
                <ul className='grid grid-cols-1 gap-6'>
                  {
                    table.getRowModel().rows.map((processo) => {

                      return (type === 'Admin') ?
                        <ProcessoCard
                          key={processo.original.id}
                          processo={processo.original}
                        /> :
                        <ProcessoPessoalCard
                          key={processo.original.id}
                          processo={processo.original}
                        />;
                    }
                    )
                  }
                </ul>
              )
              :
              <div className='info-not-found-itens'>
                <CiInboxIn className="ICON" />
                <p id='first'>Nenhum processo foi encontrado.</p>
                <p id='second'>
                  Não encontramos nenhum processo seletivo que corresponda aos seus critérios de busca ou filtros os quais você tenha participado.
                  Tente ajustar sua pesquisa ou limpar os filtros para ver mais opções.
                </p>
              </div>
        }
        {
          !loading && table.getRowModel().rows.length > 0 &&
          <NavLinkTables table={table} />
        }
      </form>
    </>
  );
}

export default ListaEditais;