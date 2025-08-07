import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/Global/ui/table"

import React, { useState } from 'react'
import { ChevronDown, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "flowbite-react";
import { toast } from 'react-toastify';
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import ModalExportarRelatorio from "./Modais/ModalExportarRelatorio";
import './MainTable.css';

const MainTable = ({ data, columns, title, hasShadowBorderStyle = true, hasPaddingStyle = true, canExport = true, canHiddenColumns = true, hasSelectForRows = true }) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
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

  const [openModal, setOpenModal] = useState(false);
  function onCloseModal() {
    setOpenModal(false);
  }
  function onOpenModal() {
    var RowModels = table.getSortedRowModel().rows.filter(row => row.getIsSelected());
    if (RowModels.length == 0)
      toast.error('Selecione pelo menos uma linha antes de gerar o relatório.');
    else
      setOpenModal(true);
  }

  return (
    <div className={`${hasShadowBorderStyle === true ? "rounded-md border border-gray-200 shadow-md": ""} ${hasPaddingStyle === true ? "px-5 sm:px-7.5" : ""} bg-white pt-6 pb-2.5 xl:pb-1 `}>
      <h4 id="table-title">
        {title}
      </h4>
      <div id="table-tools">
        <div id="table-search-container">
            <div id="table-search">
              <input
                id="search-input"
                type="text"
                value={globalFilter ?? ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Pesquisar..."
              />
              <span id="search-icon">
                <Search />
              </span>
            </div>
        </div>
        <div id="table-other-tools">
          {
            canHiddenColumns && 
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button id="columns-button" variant="outline">
                  Colunas <ChevronDown id="chevron" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent id="dropdown-content" align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        id="dropdown-checkbox-item"
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        <input id="dropdown-checkbox" type="checkbox" defaultChecked={column.getIsVisible() ? true : false}/>
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          }

          {
            canExport && <button id="export-button" className="bg-[var(--admin-button)] hover:bg-[var(--admin-button-hover)]" onClick={() => onOpenModal()}>
              {'Gerar Relatório'}
            </button>
          }
          <ModalExportarRelatorio openModal={openModal} onCloseModal={onCloseModal} table={table} title={title}/>
        </div>
      </div>

      {/* Tabela Shadcn/ui */}
      <div id="table-data-container" className={data.length > 10 ? 'h-[60vh]' : ''}>
        <Table>
          <TableHeader className="bg-gray-50">

            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {
                  hasSelectForRows &&
                  <TableHead className={`whitespace-nowrap px-4 py-3 text-xs font-medium uppercase text-gray-600`} key={"select"}>
                    <input
                      type="checkbox"
                      checked={table.getIsAllPageRowsSelected()}
                      indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
                      onChange={table.getToggleAllPageRowsSelectedHandler()}
                    />
                  </TableHead>
                }
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={`whitespace-nowrap px-4 py-3 text-xs font-medium uppercase text-gray-600 ${header.id === 'actions' ? 'flex justify-center': ''}`}>
                      {/* {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )} */}
                      <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => header.column.toggleSorting(header.column.getIsSorted() === "asc")}>
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
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  
                  {
                    hasSelectForRows &&
                    <TableCell className="whitespace-nowrap px-4 py-2">
                      <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                      />
                    </TableCell>
                  }

                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap px-4 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Controles de Paginação Estilizados */}
      <div id="bottom-tools">
        <div id="rows-selected">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div id="paginate">
          {/* --- Previous Button --- */}
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="paginate-buttons"
          >
            Anterior
          </button>

          {/* --- Page Indicator --- */}
          <span id="paginate-text">
            Página{' '}
            <span className="font-bold text-[var(--admin-paginate-text)]">
              {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </span>
          </span>

          {/* --- Next Button --- */}
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
          {/* --- Page Size Selector --- */}
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
          </select>
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
        </div>
      </div>
    </div>
  );
};

export default MainTable