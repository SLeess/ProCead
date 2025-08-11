import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table } from "@/Components/Global/ui/table"
import React, { useState } from 'react'
import './MainTable.css';
import MainTableHeader from "./Components/MainTableHeader";
import MainTableBody from "./Components/MainTableBody";
import CustomPagination from "./Components/CustomPagination";
import HideColumnsDropdown from "./Components/HideColumnsDropdown";
import ExportModuleTable from "./Components/ExportModuleTable";
import SearchRowsTable from "./Components/SearchRowsTable";

const MainTable = ({ data, columns, title, hasShadowBorderStyle = true, hasPaddingStyle = true, canExport = true, canHiddenColumns = true, hasSelectForRows = true }) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data,
    columns,
    title,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      pagination,
      globalFilter,
      rowSelection,
      columnVisibility,
    },
  });

  return (
    <div className={`${hasShadowBorderStyle === true ? "rounded-md border border-gray-200 shadow-md": ""} ${hasPaddingStyle === true ? "px-5 sm:px-7.5" : ""} bg-white pt-6 pb-2.5 xl:pb-1 `}>
      <h4 id="table-title">
        {title}
      </h4>
      <div id="table-tools">
        <div id="table-search-container">
            <SearchRowsTable globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
        </div>
        <div id="table-other-tools">
          {
            canHiddenColumns && 
            <HideColumnsDropdown table={table} setColumnVisibility={setColumnVisibility}/>
          }

          <ExportModuleTable table={table} title={title} canExport={canExport}/>
          {/* {
            canExport && <button id="export-button" className="bg-[var(--admin-button)] hover:bg-[var(--admin-button-hover)]" onClick={() => onOpenModal()}>
              {'Gerar Relatório'}
            </button>
          }
          <ModalExportarRelatorio openModal={openModal} onCloseModal={onCloseModal} table={table} title={title}/> */}
        </div>
      </div>

      <div id="table-data-container" className={data.length > 10 ? 'h-[60vh]' : ''}>
        <Table>
          <MainTableHeader table={table} hasSelectForRows={hasSelectForRows}/>
          
          <MainTableBody table={table} hasSelectForRows={hasSelectForRows} columns={columns}/>
        </Table>
      </div>

      <CustomPagination table={table}/>
      {/* Controles de Paginação Estilizados
      <div id="bottom-tools">
        <div id="rows-selected">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div id="paginate">
          --- Previous Button ---
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="paginate-buttons"
          >
            Anterior
          </button>

          --- Page Indicator ---
          <span id="paginate-text">
            Página{' '}
            <span className="font-bold text-[var(--admin-paginate-text)]">
              {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </span>
          </span>

          --- Next Button ---
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="paginate-buttons"
          >
            Próxima
          </button>
        </div>
        <div id="pagesize">
          <span id="pagesize-text">
            Linhas por página:
          </span>
          --- Page Size Selector ---
          <select
            id="pagesize-selector"
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
            <option value={data.length} key={data.length}>Todos</option>
          </select> */}
          {/* <input
            type="number"
            min={1}
            step={10}
            value={table.getState().pagination.pageSize}
            onChange={e => {
              const size = e.target.value ? Number(e.target.value) : 0
              table.setPageSize(size)
            }}
            className="w-24 px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            placeholder="Qtd. linhas"
          /> */}
        {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default MainTable