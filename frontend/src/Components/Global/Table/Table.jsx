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
import './Table.css';

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
        const visibleColumns = table.getVisibleLeafColumns().map(col => ({
            id: col.id,
            header: col.columnDef.header,
        }));

        var RowModels = table.getSortedRowModel().rows;

        if(columns.some(col=> col.id === 'select')){
            RowModels = RowModels.filter(row => row.getIsSelected());
            if(RowModels.length == 0){
                toast.error('Selecione pelo menos uma linha antes de gerar o relatório.');
                return;
            }
        }

        setIsExporting(true);

        const sortedRows = RowModels.map(row => {
            const filteredRowData = {};
            table.getVisibleLeafColumns().forEach(column => {
                if (column.id in row.original) {
                    filteredRowData[column.id] = row.original[column.id];
                }
            });
            return filteredRowData;
        });

        try {
            const response = await fetch('/api/export', {
                method: 'post',
                body: JSON.stringify({
                columns: visibleColumns.filter(chave => chave.id !== 'select' && chave.id !== 'acoes'),
                rows: sortedRows,
                tableName: tableName,
                titulo: titulo,
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
        <div className={`${className} p-5 max-w-7xl mx-auto bg-white dark:bg-slate-900 overflow-hidden`}>
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="table-name">{ tableName }</h2>
                <p className="table-details">{ details }</p>
            </div>

            {/* --- Barra de Ferramentas: Busca, Filtro, Exportar --- */}
            <div className="table-tools">
                <div className="relative">
                    <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={filtering}
                        onChange={(e) => setFiltering(e.target.value)}
                        placeholder="Buscar elemento"
                        className="buscar-elemento"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative" ref={filterDropdownRef}>
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="table-filters"
                        >
                            Filtros <FaChevronDown size={12} />
                        </button>

                        {filterOpen && (
                            <div className="modal-filtros">
                                <p>Exibir Colunas</p>
                                {table.getAllLeafColumns()
                                    .filter(column => column.getCanHide())
                                    .map(column => (
                                    <div key={column.id} className="flex items-center gap-2">
                                        <input
                                        type="checkbox"
                                        checked={column.getIsVisible()}
                                        onChange={() => handleColumnToggle(column)}
                                        className="filtro-checkbox"
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
                        className="export"
                    >
                        {isExporting ? 'Exportando...' : 'Exportar para PDF'}
                    </button>
                </div>
            </div>

            {/* --- Tabela --- */}
            <div className="overflow-x-auto"> {/** Div pra permitir o scroll lateral**/}
                <table className="component">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} scope="col" className="px-6 py-3" onClick={header.column.getToggleSortingHandler()}>
                                        <div className="flex items-center gap-2 cursor-pointer select-none">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            { 
                                                (header.column.columnDef.enableSorting != false) ?

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
                            <tr key={row.id}>
                                {
                                    row.getVisibleCells().map(cell => {
                                        return(
                                            <td key={cell.id} className={`${cell.column.columnDef.alignText !== undefined ? `${cell.column.columnDef.alignText}` : ''}`}>
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
            <div className="table-paginate">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Exibindo{' '}
                    <strong>{table.getRowModel().rows.length > 0 ? table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1 : 0}</strong>
                    -<strong>{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}</strong> de{' '}
                    <strong>{table.getFilteredRowModel().rows.length}</strong>
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Itens por página:</span>
                    <input 
                        type="number" 
                        min={1}
                        value={table.getState().pagination.pageSize}
                        onChange={e => table.setPageSize(Number(e.target.value))}
                        className="itens-pagina"
                    />
                </div>
                <div className="flex items-center">
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => table.previousPage()} 
                            disabled={!table.getCanPreviousPage()}
                            className="last-page"
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
                            className="next-page"
                        >
                            Próximo &gt;
                        </button>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    // </div>
    );
};