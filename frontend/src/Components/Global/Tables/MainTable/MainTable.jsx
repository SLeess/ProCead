import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table } from "@/Components/Global/ui/table"
import React, { useEffect, useState } from 'react'
import './MainTable.css';
import MainTableHeader from "./Components/MainTableHeader";
import MainTableBody from "./Components/MainTableBody";
import CustomPagination from "./Components/CustomPagination";
import HideColumnsDropdown from "./Components/HideColumnsDropdown";
import ExportModuleTable from "./Components/ExportModuleTable";
import SearchRowsTable from "./Components/SearchRowsTable";
import Loader from "../../Loader/Loader";
import { useAppContext } from "@/Contexts/AppContext";

const MainTable = ({ 
    // ================== Props Essenciais ==================
      columns,
      title,
    /**
     * (MODO BACKEND) URL base para buscar os dados. Ativa a paginação e busca no servidor.
     * Ex: "/api/super-admin/users"
     */
      serverSideDataUrl = null,

    /**
     * (MODO FRONTEND) Array de dados para paginação e busca no cliente.
     */
      clientSideData = [],

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
    
  const isServerSide = !!serverSideDataUrl;

  // ================== Estados Internos ==================
  const [data, setData] = useState(isServerSide ? [] : clientSideData);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(isServerSide);
  
  // Estados da TanStack Table
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');               // Para a busca local
  const [serverSearchTerm, setServerSearchTerm] = useState('');       // Para a busca no backend
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
  const setRowSelection = isSelectionControlled ? setControlledRowSelection : setInternalRowSelection;
  
  // EFEITO PARA BUSCAR DADOS (só roda se 'serverSidePaginationUrl' for fornecido)
  useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearchTerm(serverSearchTerm);
        // Reseta para a primeira página ao fazer uma nova busca
        setPagination(p => ({ ...p, pageIndex: 0 })); 
    }, 500); // Espera 500ms após o usuário parar de digitar
    return () => clearTimeout(timer);
  }, [serverSearchTerm]);

  // EFEITO PARA BUSCAR DADOS DO BACKEND
  useEffect(() => {
    if (!isServerSide) return;

    const fetchPageData = async () => {
      setLoading(true);
      try {
          // Constrói a URL com paginação e busca
          const params = new URLSearchParams({
              page: pagination.pageIndex + 1,
              per_page: pagination.pageSize,
          });
          if (debouncedSearchTerm) {
              params.append('search', debouncedSearchTerm);
          }
          
          const url = `${serverSideDataUrl}?${params.toString()}`;
          const result = await apiAsyncFetch({ url });
          
          setData(result.data.users);
          setPageCount(result.data.meta.last_page);
          if(typeof setMetaData === 'function')
            setMetaData(result.data.meta);

      } catch (error) {
          console.error("Falha ao buscar dados paginados:", error);
          setData([]);
      } finally {
          setLoading(false);
      }
    };
    
    fetchPageData();
  }, [isServerSide, pagination, debouncedSearchTerm, serverSideDataUrl, apiAsyncFetch]);

  // Efeito para sincronizar dados no modo frontend
  useEffect(() => {
      if (!isServerSide) setData(clientSideData);
  }, [clientSideData, isServerSide]);

  const table = useReactTable({
    data,
    columns,
    
    getRowId: (row) => row.uuid,
    enableRowSelection: true,        
    enableMultiRowSelection: true,

    manualPagination: isServerSide,
    manualFiltering: isServerSide,
    
    pageCount: isServerSide ? pageCount : undefined,
    onPaginationChange: setPagination,
    onGlobalFilterChange: isServerSide ? setServerSearchTerm : setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
        pagination,
        globalFilter: isServerSide ? serverSearchTerm : globalFilter,
        rowSelection,
        columnFilters,
        columnVisibility,
    },
    autoResetPageIndex: false,
  });

    return (
        <div className={`main-table ${hasShadowBorderStyle ? "rounded-md border border-gray-200 shadow-md" : ""} ${hasPaddingStyle ? "px-5 sm:px-7.5" : ""} bg-white pt-6 pb-2.5 xl:pb-1 ${className}`}>
            <h4 className="table-title">{title}</h4>
            {subtitle && <h5 className="table-subtitle">{subtitle}</h5>}
            
            <div id="table-tools">
                <div id="table-search-container">
                    {/* O componente de busca agora usa o state correto dependendo do modo */}
                    <SearchRowsTable 
                        globalFilter={isServerSide ? serverSearchTerm : globalFilter} 
                        setGlobalFilter={isServerSide ? setServerSearchTerm : setGlobalFilter}
                    />
                </div>
                <div id="table-other-tools">
                    {canHiddenColumns && <HideColumnsDropdown table={table} setColumnVisibility={setColumnVisibility} />}
                    <ExportModuleTable table={table} title={title} canExport={canExport} />
                </div>
            </div>

            <div id="table-data-container" style={{ position: 'relative', minHeight: '200px' }}>
                {/* Loader sobrepõe a tabela no modo backend */}
                {isServerSide && loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                        <Loader />
                    </div>
                )}
                <Table>
                    <MainTableHeader table={table} hasSelectForRows={hasSelectForRows} />
                    <MainTableBody table={table} hasSelectForRows={hasSelectForRows} columns={columns} />
                </Table>
            </div>

            {enableDataFooter && <CustomPagination table={table} hasCountSelectedLines={hasCountSelectedLines} loading={loading}/>}
        </div>
    );

};

export default MainTable