import React, { useState, useMemo, useContext, useEffect, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { FaSearch, FaChevronDown, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AppContext } from '@/Contexts/AppContext';

export default function Table({ rows, cols, tableName, titulo, details, visibleDefaultColumns = {}, className = `` , minColumns = 1}){
    const { token } = useContext(AppContext);

    //**Determinar a quantidade mínima de colunas que precisam estar visiveis pra não ficar só os checkbox e os btns de ações */
    const minColumnsExibe = minColumns;

    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');
    const [columnVisibility, setColumnVisibility] = useState(visibleDefaultColumns);
    const [isExporting, setIsExporting] = useState(false); // Estado para feedback de carregamento

    const [filterOpen, setFilterOpen] = useState(false);
    const filterDropdownRef  = useRef(null);

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

    const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    });

    const data = useMemo(() => rows, [rows]);
    const columns = useMemo(() => cols, [cols]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
        sorting,
        globalFilter: filtering,
        columnVisibility,
        pagination,
        },
        enableRowSelection: true,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
    });

    /**
     * Lida com a troca de visibilidade de uma coluna, garantindo
     * que pelo menos uma coluna permaneça sempre visível.
     * @param {import('@tanstack/react-table').Column} column A coluna a ser alterada.
     */
    const handleColumnToggle = (column) => {
        const isHiding = column.getIsVisible();

        const visibleColumnCount = table.getVisibleLeafColumns().length;

        if (isHiding && visibleColumnCount <= minColumnsExibe) {
            toast.error("É obrigatório manter ao menos uma coluna visível.");
            return;
        }

        column.toggleVisibility();
    };
 
    const handleExport = async () => {
        setIsExporting(true);

        const visibleColumns = table.getVisibleLeafColumns().map(col => ({
            id: col.id,
            header: col.columnDef.header,
        }));

        var RowModels;
        
        RowModels = table.getSortedRowModel().rows;

        if(columns.some(col=> col.id === 'select')){
            RowModels = RowModels.filter(row => row.getIsSelected());
            if(RowModels.length == 0){
                toast.error('Selecione pelo menos uma linha antes de gerar o relatório.');
                return;
            }
        }


        const sortedRows = RowModels.map(row => {
            const filteredRowData = {};
            table.getVisibleLeafColumns().forEach(column => {
                if (column.id in row.original) {
                    filteredRowData[column.id] = row.original[column.id];
                }
            });
            return filteredRowData;
        });

        console.log(RowModels, sortedRows);


        try {
            const response = await fetch('/api/export', {
                method: 'post',
                body: JSON.stringify({
                columns: visibleColumns.filter(chave => chave.id !== 'select' && chave.id !== 'acoes'),
                rows: sortedRows,
                tableName: tableName,//"Inventário de Produtos",
                titulo: titulo,//'Relatório de Itens Comprados',
            }),
                headers:{
                'Content-Type': 'application/json', 
                'Accept': 'application/json, application/pdf', 
                'Authorization': `Bearer ${token}`
                },
            });

            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            console.log(errorData);
            const errorMessages = Object.values(errorData.errors || { general: [errorData.message || 'Erro desconhecido'] }).flat();
            errorMessages.forEach((e) => toast.error(e));
            } else {
            if (!response.ok) {
                throw new Error(`Erro na rede: ${response.status} ${response.statusText}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'relatorio.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            toast.error(error.message || 'Falha na comunicação com a API.');
            console.error("Erro na exportação:", error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className={`p-4 md:p-8 bg-white dark:bg-slate-950 min-h-screen ${className}`}>
        <div className="max-w-7xl mx-auto bg-white dark:bg-slate-900  overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">{ tableName }</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{ details }</p>
            </div>

            {/* --- Barra de Ferramentas: Busca, Filtro, Exportar --- */}
            <div className="flex flex-wrap items-center justify-between p-4 md:p-6 gap-4">
                <div className="relative">
                    <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={filtering}
                        onChange={(e) => setFiltering(e.target.value)}
                        placeholder="Buscar elemento"
                        className="pl-10 pr-4 py-2 w-full md:w-80 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative" ref={filterDropdownRef}>
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                            Filtros <FaChevronDown size={12} />
                        </button>

                        {filterOpen && (
                            <div className="absolute z-10 top-full right-0 mt-2 p-4 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl border dark:border-slate-700">
                            <p className="font-bold text-sm mb-2 text-slate-800 dark:text-slate-200">Exibir Colunas</p>
                            {table.getAllLeafColumns()
                                .filter(column => column.getCanHide())
                                .map(column => (
                                <div key={column.id} className="flex items-center gap-2">
                                    <input
                                    type="checkbox"
                                    checked={column.getIsVisible()}
                                    onChange={() => handleColumnToggle(column)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label className="text-sm text-slate-600 dark:text-slate-300">
                                    {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
                                    </label>
                                </div>
                                ))
                            }
                            </div>
                        )}
                        </div>
                    <button 
                        onClick={handleExport}
                        disabled={isExporting}
                        className="px-4 hover:cursor-pointer py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-wait"
                    >
                        {isExporting ? 'Exportando...' : 'Exportar para PDF'}
                    </button>
                </div>
            </div>

            {/* --- Tabela --- */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-slate-800 dark:text-slate-300">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} scope="col" className="px-6 py-3" onClick={header.column.getToggleSortingHandler()}>
                                        <div className="flex items-center gap-2 cursor-pointer select-none">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            { 
                                                (header.column.columnDef.header.id != 'select') ?

                                                    {
                                                        asc: <FaSortUp />,
                                                        desc: <FaSortDown />,
                                                    }[header.column.getIsSorted()] ?? <FaSort className="opacity-30" />
                                                : <></>

                                            }
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="bg-white dark:bg-slate-900 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                                {
                                    row.getVisibleCells().map(cell => {
                                        return(
                                            <td key={cell.id} className={`px-6 py-4 whitespace-nowrap ${cell.column.columnDef.alignText !== undefined ? `${cell.column.columnDef.alignText}` : ''}`}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- Paginação --- */}
            <div className="flex flex-wrap items-center justify-between p-4 md:p-6 gap-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Exibindo{' '}
                    <strong>{table.getRowModel().rows.length > 0 ? table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1 : 0}</strong>
                    -<strong>{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}</strong> de{' '}
                    <strong>{table.getFilteredRowModel().rows.length}</strong>
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Itens por página:</span>
                    {
                    /* <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => table.setPageSize(Number(e.target.value))}
                        className="p-1 pr-6 pl-3 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select> */}
                    <input 
                        type="number" 
                        min={1}
                        value={table.getState().pagination.pageSize}
                        onChange={e => table.setPageSize(Number(e.target.value))}
                        className="p-1 max-w-15 text-center border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center">
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => table.previousPage()} 
                            disabled={!table.getCanPreviousPage()}
                            className="px-3 py-1 border border-slate-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-600"
                        >
                            &lt; Anterior
                        </button>
                        <span className="text-sm">
                            {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map(page => (
                                <button 
                                    key={page} 
                                    onClick={() => table.setPageIndex(page - 1)}
                                    className={`px-3 py-1 mx-1 rounded-md ${table.getState().pagination.pageIndex === page - 1 ? 'bg-blue-500 text-white' : 'bg-white dark:bg-slate-800'}`}
                                >
                                    {page}
                                </button>
                            ))}
                        </span>
                        <button 
                            onClick={() => table.nextPage()} 
                            disabled={!table.getCanNextPage()}
                            className="px-3 py-1 border border-slate-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-600"
                        >
                            Próximo &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};