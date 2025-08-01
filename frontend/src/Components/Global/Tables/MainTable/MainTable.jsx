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

const MainTable = ({ data, columns, title, hasShadowBorderStyle = true, hasPaddingStyle = true, canExport = true, canHiddenColumns = true }) => {
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
    <div className={`${hasShadowBorderStyle === true ? "rounded-sm border border-gray-200 shadow-md": ""} ${hasPaddingStyle === true ? "px-5 sm:px-7.5" : ""} bg-white pt-6 pb-2.5 xl:pb-1 `}>
      <h4 className="text-xl font-semibold text-black mb-4">
        {title}
      </h4>
      <div className="mb-6 grid grid-cols-12 lg:flex justify-between">
        <div className="col-span-12 flex w-full items-center space-x-4 justify-between lg:justify-start">
          {/* <div className="w-full"> */}
            <div className="relative w-full lg:w-[90%] lg:max-w-md">
              <input
                type="text"
                value={globalFilter ?? ''}
                onChange={e => setGlobalFilter(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                placeholder="Pesquisar..."
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Search />
              </span>
            </div>
          {/* </div> */}
        </div>
        <div className="justify-between mt-5 lg:mt-0 col-span-12 flex items-center gap-2">
          {
            canHiddenColumns && 
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-white">
                  Colunas <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto bg-white dark:bg-gray-800 z-50 border border-gray-200 rounded-md shadow-lg p-1">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1.5 cursor-pointer flex items-center"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        <input type="checkbox" defaultChecked={column.getIsVisible() ? true : false} className={`mr-2 border border-gray-300 rounded-sm `} />
                        {column.id}
                        {/* <span className="mr-2">{column.id}</span> */}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          }

          {
            canExport && <button onClick={() => onOpenModal()} className="cursor-pointer md:text-nowrap px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {'Gerar Relatório'}
            </button>
          }
          <ModalExportarRelatorio openModal={openModal} onCloseModal={onCloseModal} table={table} title={title}/>
        </div>
      </div>

      {/* Tabela Shadcn/ui */}
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50">

            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead className={`whitespace-nowrap px-4 py-3 text-xs font-medium uppercase text-gray-600`} key={"select"}>
                  <input
                    type="checkbox"
                    checked={table.getIsAllPageRowsSelected()}
                    indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                  />
                </TableHead>
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
                  <TableCell className="whitespace-nowrap px-4 py-2">
                    <input
                      type="checkbox"
                      checked={row.getIsSelected()}
                      disabled={!row.getCanSelect()}
                      onChange={row.getToggleSelectedHandler()}
                    />
                  </TableCell>

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
      <div className="flex md:flex-row flex-col md:space-y-0 space-y-2 items-center justify-between p-4">
        <div className=" text-sm text-muted-foreground justify-start">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="flex items-center justify-center space-x-4">
          {/* --- Previous Button --- */}
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>

          {/* --- Page Indicator --- */}
          <span className="text-sm font-medium text-gray-700">
            Página{' '}
            <span className="font-bold text-blue-600">
              {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </span>
          </span>

          {/* --- Next Button --- */}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Próxima
          </button>
        </div>
        <div className="flex ml-5 justify-end">
          {/* --- Page Size Selector --- */}
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
            className="min-w-[110px] px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
            <option value={data.length} key={data.length}>Mostrar Todos</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MainTable