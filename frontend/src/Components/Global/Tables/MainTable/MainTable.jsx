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
    autoResetPageIndex: false,
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
        </div>
      </div>

      <div id="table-data-container" className={data.length > 10 ? 'h-[60vh]' : ''}>
        <Table>
          <MainTableHeader table={table} hasSelectForRows={hasSelectForRows}/>
          
          <MainTableBody table={table} hasSelectForRows={hasSelectForRows} columns={columns}/>
        </Table>
      </div>

      <CustomPagination table={table}/>
    </div>
  );
};

export default MainTable