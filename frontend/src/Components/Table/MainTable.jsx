"use client"

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

// import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React, { useContext, useState } from 'react'
import { ChevronDown, Search, PlusCircle, MinusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { toast } from 'react-toastify';
import { AppContext } from "@/Contexts/AppContext";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { FormField, SelectInput } from "../Global/ui/modals";

const MainTable = ({ data, columns, title }) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const [isExporting, setIsExporting] = useState(false);
  const { token } = useContext(AppContext);
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

  // const handleColumnToggle = (column) => {
  //         const isHiding = column.getIsVisible();

  //         const visibleColumnCount = table.getVisibleLeafColumns().length;

  //         if (isHiding && visibleColumnCount <= minColumnsExibe) {
  //             toast.error("É obrigatório manter ao menos uma coluna visível.");
  //             return;
  //         }

  //         column.toggleVisibility();
  //     };

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

  const handleExport = async (titulo, subtitulo, orientacao, formato) => {
    const visibleColumns = table.getVisibleLeafColumns().map(col => ({
      id: col.id,
      header: col.columnDef.header,
    }));

    const selectedRows = table.getSelectedRowModel().rows;
    const sortedRows = table.getSortedRowModel().rows;

    const resultRows = sortedRows.filter((row) => selectedRows.find((selecRow) => selecRow.id == row.id));

    if (selectedRows.length === 0) {
      toast.error('Selecione pelo menos uma linha antes de gerar o relatório.');
      return;
    }

    setIsExporting(true);

    const rows = resultRows.map(row => {
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
          rows: rows,
          tableName: title,
          titulo: titulo,
          subtitulo: subtitulo,
          orientacao: orientacao,
          formato: formato,
          groupByFields: groupByFields.filter(field => field !== ''),
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, application/pdf',
          'Authorization': `Bearer ${token}`
        },
      });

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();

        
        const errorMessages = Object.values(errorData.errors || { general: [errorData.message || 'Erro desconhecido'] }).flat();
        onCloseModal();
        errorMessages.forEach((e) => {
          return toast.error(e);
        });
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

  const [titulo, setTitulo] = useState('Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025');
  const [subtitulo, setSubtitulo] = useState(title);
  const [orientacao, setOrientacao] = useState('Retrato');
  const [formato, setFormato] = useState('PDF');
  const [showGroupBy, setShowGroupBy] = useState(false);

  const [groupByFields, setGroupByFields] = useState(['']);

  const addGroupByField = () => {
    if(groupByFields.length == 3)
      toast.error("Não é possível agrupar por mais de 3 elementos");
    else
      setGroupByFields([...groupByFields, '']);
  };

  const removeGroupByField = (index) => {
    const newFields = [...groupByFields];
    newFields.splice(index, 1);
    setGroupByFields(newFields);
    // console.log(groupByFields);
  };

  const handleGroupByChange = (index, value) => {
    setGroupByFields(prevFields => {
      const newFields = [...prevFields];
      newFields[index] = value;
      return newFields;
    });
  };

  React.useEffect(() => {
    console.log("Novo grupo de campos:", groupByFields);
  }, [groupByFields]);

  const availableColumns = table.getAllColumns()
    .filter(column => column.id !== 'select' && column.id !== 'acoes' && column.id !== 'id' && column.id !== 'actions')
    .map(column => column.id);

  function enableGroupBy(showGroupBy) {
    if(showGroupBy) {
      setGroupByFields(['']);
    }
    setShowGroupBy(!showGroupBy)
  }

  return (
    <div className="rounded-sm border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-md sm:px-7.5 xl:pb-1 min-w-[320px]">
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
                      <input type="checkbox" checked={column.getIsVisible() ? true : false} className={`mr-2 border border-gray-300 rounded-sm `} />
                      {column.id}
                      {/* <span className="mr-2">{column.id}</span> */}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <button onClick={() => onOpenModal()} className="cursor-pointer text-nowrap px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            {isExporting ? 'Exportando...' : 'Gerar Relatório'}
          </button>
          <Modal show={openModal} onClose={onCloseModal} popup>
            <ModalHeader />
            <ModalBody >

              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Gerar Relatório</h1>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                  <FormField className="md:col-span-3" label="Título do PDF">
                    <textarea
                      rows={3}
                      className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                    >
                    </textarea>
                  </FormField>
                  <FormField className="md:col-span-3" label="Subtítulo do PDF"><TextInput value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} /></FormField>
                  <FormField className="md:col-span-1" label="Orientação da Página">
                    <SelectInput value={orientacao} options={['Retrato', 'Paisagem']} onChange={(e) => setOrientacao(e.target.value)} />
                  </FormField>
                  <FormField className="md:col-span-1" label="Formato do Arquivo">
                    <SelectInput readOnly={true} value={formato} onChange={(e) => setFormato(e.target.value)} options={['PDF', 'Excel']} />
                  </FormField>
                </div>
                <div className="mt-4">
                  <button onClick={() => enableGroupBy(showGroupBy)} className="text-sm font-semibold text-blue-600 hover:underline">
                    {showGroupBy ? 'Desabilitar Agrupamento' : 'Agrupar por Coluna'}
                  </button>
                </div>
                {showGroupBy && (
                  <>
                    <hr className="my-4 h-1 bg-gray-300 border-0 rounded-sm dark:bg-gray-700" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                      <FormField className="md:col-span-3" label="Agrupar por">
                        <div className="space-y-2">
                          {groupByFields.map((field, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={index === 0 ? addGroupByField : () => removeGroupByField(index)}
                                className={`p-1 rounded-full transition-colors ${index === 0
                                    ? 'text-blue-600 hover:bg-blue-100'
                                    : 'text-red-600 hover:bg-red-100'
                                  }`}
                              >
                                {index === 0 ? <PlusCircle className="h-5 w-5" /> : <MinusCircle className="h-5 w-5" />}
                              </button>
                              <div className="w-full">
                                <SelectInput
                                  defaultOption={true}
                                  value={field}
                                  onChange={(e) => handleGroupByChange(index, e.target.value)}
                                  options={availableColumns.filter(op => !groupByFields.includes(op) || op == field)}
                                  placeholder="Selecione uma coluna"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </FormField>
                    </div>
                  </>
                )}


                <div className="mt-10 flex justify-end items-center space-x-4">
                  <button onClick={onCloseModal} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Fechar</button>
                  <button onClick={() => handleExport(titulo, subtitulo, orientacao, formato)} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> {isExporting ? 'Exportando...' : 'Gerar Relatório'}</button>
                </div>
              </div>
            </ModalBody>
          </Modal>


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
      <div className="flex items-center justify-between p-4">
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
            className="px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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