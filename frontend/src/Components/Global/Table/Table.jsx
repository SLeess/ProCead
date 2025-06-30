// src/ProductTable.jsx

import React, { useState, useMemo, useContext } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { PRODUCTS } from './DATA';
import { COLUMNS } from './columns';
import { FaSearch, FaChevronDown, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AppContext } from '../../../Contexts/AppContext';

const Table = () => {
//   const [errors, setErrors] = useState({});
  const {token} = useContext(AppContext);


  const handleRegister = async (visibleColumns, sortedRows) => {
 
         try {
             const response = await fetch('/api/export', {
                 method: 'post',
                 body: JSON.stringify({
                    columns: visibleColumns,
                    rows: sortedRows,
                    tableName: "Inventário de Produtos",
                    titulo: 'Relatório de Itens Comprados',
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
                Object.values(errorData.errors).forEach((e) => {
                    toast.error(e);
                });
             } else{
                if (!response.ok) {
                    throw new Error(`Erro na rede: ${response.status} ${response.statusText}`);
                }

                const blob = await response.blob();

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'relatorio-de-produtos.pdf');
                document.body.appendChild(link);

                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
             }

         } catch (error) {
             toast.error(error.toString());
             console.log(error.toString());
         }
 
     };



  const data = useMemo(() => PRODUCTS, []);
  const columns = useMemo(() => COLUMNS, []);

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      columnVisibility: columnVisibility,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <div className="p-4 md:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Product Inventory</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">These are details about all products.</p>
        </div>

        {/* --- Barra de Ferramentas: Busca, Filtro, Exportar --- */}
        <div className="flex flex-wrap items-center justify-between p-4 md:p-6 gap-4">
            <div className="relative">
                <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    value={filtering}
                    onChange={(e) => setFiltering(e.target.value)}
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 w-full md:w-80 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex items-center gap-2">
                {/* Seletor de Colunas */}
                <details className="relative">
                    <summary className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                        Filter <FaChevronDown size={12} />
                    </summary>
                    <div className="absolute z-10 top-full right-0 mt-2 p-4 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl border dark:border-slate-700">
                        <p className="font-bold text-sm mb-2 text-slate-800 dark:text-slate-200">Toggle Columns</p>
                        {table.getAllLeafColumns().map(column => (
                            <div key={column.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={column.getIsVisible()}
                                    onChange={column.getToggleVisibilityHandler()}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label className="text-sm text-slate-600 dark:text-slate-300">{column.id}</label>
                            </div>
                        ))}
                    </div>
                </details>
                <button onClick={() => {

const visibleColumnDefs = table.getVisibleLeafColumns();

const visibleColumns = visibleColumnDefs.map(col => ({
    id: col.id,
    header: col.columnDef.header,
}));

const sortedRowModels = table.getSortedRowModel().rows;

const sortedRows = sortedRowModels.map(row => {
    const filteredRowData = {};

    visibleColumnDefs.forEach(column => {
        if (column.id in row.original) {
            filteredRowData[column.id] = row.original[column.id];
        }
    });

    return filteredRowData;
});


handleRegister(visibleColumns, sortedRows);

                }} className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                    Export
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
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{
                                            asc: <FaSortUp />,
                                            desc: <FaSortDown />,
                                        }[header.column.getIsSorted()] ?? <FaSort className="opacity-30" />}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="bg-white dark:bg-slate-900 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* --- Paginação --- */}
        <div className="flex flex-wrap items-center justify-between p-4 md:p-6 gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
                Showing{' '}
                <strong>{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</strong>
                -<strong>{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}</strong> of{' '}
                <strong>{table.getFilteredRowModel().rows.length}</strong>
            </p>
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => table.previousPage()} 
                    disabled={!table.getCanPreviousPage()}
                    className="px-3 py-1 border border-slate-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-600"
                >
                    &lt; Prev
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
                    Next &gt;
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Table;