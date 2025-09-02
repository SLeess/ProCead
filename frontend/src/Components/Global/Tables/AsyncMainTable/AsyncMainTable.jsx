import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table } from "@/Components/Global/ui/table"
import React, { useEffect, useState } from 'react'
import './AsyncMainTable.css';
import AsyncMainTableHeader from "./Components/AsyncMainTableHeader";
import AsyncMainTableBody from "./Components/AsyncMainTableBody";
import CustomPagination from "./Components/CustomPagination";
import HideColumnsDropdown from "./Components/HideColumnsDropdown";
import ExportModuleTable from "./Components/ExportModuleTable";
import SearchRowsTable from "./Components/SearchRowsTable";
import Loader from "../../Loader/Loader";
import { useAppContext } from "@/Contexts/AppContext";
import Swal from "sweetalert2";
import AdvancedSearchRowsTable from "./Components/AdvancedSearchRowsTable";

const AsyncMainTable = ({ 
    // ================== Props Essenciais ==================
      columns,
      title,
    /**
     * (MODO BACKEND) URL base para buscar os dados. Ativa a paginação e busca no servidor.
     * Ex: "/api/super-admin/users"
     */
      serverSideDataUrl = null,
    // ================== Props de Configuração Opcionais ==================
      pageSize = 15,
      subtitle = null,
      hasShadowBorderStyle = true,
      hasPaddingStyle = true,
      canExport = true,
      canHiddenColumns = true,
      hasSelectForRows = true,
      hasCountSelectedLines = true,
      enableDataFooter = true,
      className = ``,

      // ================== Props para Controle Externo de Seleção ==================
      rowSelection: controlledRowSelection,
      setRowSelection: setControlledRowSelection,
      setMetaData = null, // Callback para enviar metadados para o pai
  }) => {
  const { apiAsyncFetch } = useAppContext();
  // ================== Estados Internos ==================
  const [data, setData] = useState([]);
  const [pagesCache, setPagesCache] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Estados da TanStack Table
  const [columnFilters, setColumnFilters] = useState([]);
  const [serverSearchTerm, setServerSearchTerm] = useState('');       // Para a busca no backend
  const [advancedSearchTerm, setAdvancedSearchTerm] = useState({});   // Para a buscas avançadas no backend
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // Termo "atrasado" para evitar muitas requisições
  
  const [columnVisibility, setColumnVisibility] = useState(() => {
    //Função para verificar se alguma coluna veio previamente desabilitada para visualização no arquivo de columns.jsx
    const initialVisibility = columns.reduce((acc, column) => {
      if (column.accessorKey && column.columnVisibility !== undefined) {
        acc[column.accessorKey] = column.columnVisibility;
      } else{
        acc[column.accessorKey] = true;
      }
      return acc;
    }, {});

    return initialVisibility;
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });

  // Estado da seleção de linhas (controlado ou interno)
  const [internalRowSelection, setInternalRowSelection] = useState({});
  const isSelectionControlled = controlledRowSelection !== undefined;
  const rowSelection = isSelectionControlled ? controlledRowSelection : internalRowSelection;
  const [selectedRowsDataCache, setSelectedRowsDataCache] = useState({});
  const setRowSelection = isSelectionControlled ? setControlledRowSelection : setInternalRowSelection;
  
  // ✅ NOVO ESTADO PARA ORDENAÇÃO
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    
    getRowId: (row) => row?.uuid || row?.id,
    enableRowSelection: true,        
    enableMultiRowSelection: true,

    manualPagination: true,
    manualFiltering: true,
    
    // ATIVANDO A ORDENAÇÃO MANUAL
    manualSorting: true,
    onSortingChange: setSorting,

    pageCount: pageCount,
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
          setPagination(updater);
      } else {
          setPagination(updater);
      }
    },
    onGlobalFilterChange: setServerSearchTerm,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
        pagination,
        globalFilter: serverSearchTerm,
        rowSelection,
        columnFilters,
        columnVisibility,
        sorting,
    },
    autoResetPageIndex: false,
  });

  // Efeito para ATUALIZAR o cache de seleção
  // Roda quando a seleção ou os dados da página mudam
  useEffect(() => {
      // Pega as linhas da PÁGINA ATUAL que estão selecionadas
      const newlySelectedRows = table.getRowModel().rows.filter(row => row.getIsSelected());

      // Cria um objeto com os novos dados selecionados { uuid: userData }
      const newSelectedData = Object.fromEntries(
          newlySelectedRows.map(row => [row.original.uuid, row.original])
      );

      // Atualiza o cache, mantendo os antigos e adicionando/sobrescrevendo os novos
      setSelectedRowsDataCache(prevCache => ({
          ...prevCache,
          ...newSelectedData
      }));

  }, [rowSelection, table.getRowModel().rows]);

  // Efeito para debounce da busca (atraso na digitação e na ordenação)
  useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearchTerm((d) => ({...d, ...advancedSearchTerm, ["search"]: serverSearchTerm}));

        // Reseta para a primeira página ao fazer uma nova busca
        setPagination(p => ({ ...p, pageIndex: 0 })); 
        setPagesCache({}); // Limpa o cache ao fazer uma nova busca
    }, 500); // Espera 500ms após o usuário parar de digitar
    return () => clearTimeout(timer);
  }, [serverSearchTerm, advancedSearchTerm, pagination.pageSize, sorting]);

  // EFEITO PARA BUSCAR DADOS DO BACKEND
  useEffect(() => {
    if (sorting[0]?.id === "actions") return;

    const fetchPageData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
            page: pagination.pageIndex + 1,
            per_page: pagination.pageSize,
        });

        if (debouncedSearchTerm && typeof debouncedSearchTerm === 'object' && Object.keys(debouncedSearchTerm).length > 0) {
            const { search } = debouncedSearchTerm;
            Object.entries(debouncedSearchTerm).filter(([key]) => key !== 'search').forEach(([key, value]) => {
                if (value) {
                    params.append(`query[${key}]`, value);
                }
            });
            params.append('search', search);
        }
        if (sorting.length > 0) {
            params.append('sort_by', sorting[0].id);
            params.append('sort_dir', sorting[0].desc ? 'desc' : 'asc');
        }
        
        const url = `${serverSideDataUrl}?${params.toString()}`;
        const result = await apiAsyncFetch({ url });

        setData(result.data.users);
        setPageCount(result.data.meta.last_page);
        if (typeof setMetaData === 'function') {
            setMetaData(result.data.meta);
        }

      } catch (error) {
        if(error.toString() === "Error: O campo de itens por página não pode ser superior a 999."){
          Swal.fire({
              title: 'Erro ao Buscar os dados',
              text: `Não foi possível buscar mais que o limite por requisição, que é 999 itens por vez. Definindo a busca para 15 itens.`,
              icon: 'error',
              confirmButtonText: 'Confirmar',
              // confirmButtonColor: '#3085d6',
              allowOutsideClick: false,
              allowEscapeKey: false,   
          }).then((result) => {
              if (result.isConfirmed) {
                  table.setPageSize(15);
              }
          });
        }
        console.error("Falha ao buscar dados paginados:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPageData();
  // O useEffect agora depende de todas as variáveis que disparam uma nova busca
  }, [pagination, debouncedSearchTerm, apiAsyncFetch, serverSideDataUrl, setMetaData]);

  return (
      <div className={`async-main-table ${hasShadowBorderStyle ? "rounded-md border border-gray-200 shadow-md" : ""} ${hasPaddingStyle ? "px-5 sm:px-7.5" : ""} bg-white pt-6 pb-2.5 xl:pb-1 ${className}`}>
        <h4 className="table-title">{title}</h4>
        {subtitle && <h5 className="table-subtitle">{subtitle}</h5>}
        
        <div id="table-tools">
          <div id="table-search-container">
            {/* O componente de busca agora usa o state correto dependendo do modo */}
            <SearchRowsTable 
                globalFilter={serverSearchTerm} 
                setGlobalFilter={setServerSearchTerm}
            />
          </div>
          <div id="table-other-tools">
            {canHiddenColumns && <HideColumnsDropdown table={table} setColumnVisibility={setColumnVisibility} />}
            <ExportModuleTable table={table} 
              title={title} 
              canExport={canExport} 
              pagesCached={pagesCache} 
              rowSelection={selectedRowsDataCache}
              // setRowSelection={setSelectedRowsDataCache}
            />
          </div>
        </div>

        <AdvancedSearchRowsTable columns={columns} setAdvancedSearchTerm={setAdvancedSearchTerm} advancedSearchTerm={advancedSearchTerm}/>

        <div id="table-data-container" style={{ position: 'relative', minHeight: '300px' }}>
          {/* Loader sobrepõe a tabela no modo backend */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                <Loader />
            </div>
          )}
          <Table>
            <AsyncMainTableHeader table={table} hasSelectForRows={hasSelectForRows} />
            <AsyncMainTableBody table={table} hasSelectForRows={hasSelectForRows} columns={columns} />
          </Table>
        </div>

        {
          enableDataFooter && 
          <CustomPagination 
            table={table} 
            hasCountSelectedLines={hasCountSelectedLines} 
            rowSelection={selectedRowsDataCache} 
            setLoading={setLoading} 
            loading={loading}
          />}
      </div>
    );

};

export default AsyncMainTable