"use client"
 
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React, { useState } from 'react'
import DATA from './data';
import { Pagination } from "flowbite-react";
import { ArrowUpDown } from "lucide-react";
const MainTable = () => {
  const [data, setData] = useState(DATA);
  const columns = [
    {
      accessorKey: "id",
      header: "#",
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "inscricao",
      // header: "Nº de Inscricao",
      header: ({ column }) => {
      return (
        <button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Inscricao
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "nome",
      header: ({ column }) => {
      return (
        <button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
      return (
        <button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          E-mail
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "cpf",
      header: ({ column }) => {
      return (
        <button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CPF
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "modalidade",
      header: ({ column }) => {
      return (
        <button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modalidade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
      return (
        <button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      )
    },
      cell: (props) => <span>{props.getValue()}</span>
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  console.log(table.getHeaderGroups());

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <button onClick={() => table.previousPage()}>previous page</button><br />
      <button onClick={() => table.nextPage()}>next page</button>
    </div>
  );
};

export default MainTable