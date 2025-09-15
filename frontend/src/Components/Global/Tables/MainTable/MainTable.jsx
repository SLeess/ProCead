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

const MainTable = ({ 
    data, 
    columns, 
    title, 
    subtitle = null, 
    isClassificationTable = false,
    hasShadowBorderStyle = true, 
    hasPaddingStyle = true, 
    canExport = true, 
    canHiddenColumns = true, 
    hasSelectForRows = true, 
    hasCountSelectedLines = true, 
    setNeedUpdate, 
    enableDataFooter = true,
    pageSize=10,
    className = ``,
    // ==========================================================
    // 1. RECEBA AS PROPS DE SELEÇÃO DO COMPONENTE PAI
    // ==========================================================
    rowSelection: controlledRowSelection,
    setRowSelection: setControlledRowSelection,
}) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [internalRowSelection, setInternalRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  // ==========================================================
  // DECIDA QUAL ESTADO USAR (O DO PAI OU O INTERNO)
  // ==========================================================
  const isControlled = controlledRowSelection !== undefined;
  const rowSelection = isControlled ? controlledRowSelection : internalRowSelection;
  const setRowSelection = isControlled ? setControlledRowSelection : setInternalRowSelection;
  
  const [columnVisibility, setColumnVisibility] = useState(() => {
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

  const table = useReactTable({
    data,
    columns,
    title,
    meta: {
      setNeedUpdate,
    },
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
    <div className={`main-table 
        ${hasShadowBorderStyle === true ? "rounded-md border border-gray-200 shadow-md": ""} 
        ${hasPaddingStyle === true ? "px-5 sm:px-7.5" : ""}
        ${isClassificationTable === true ? "bg-slate-100" : "bg-white pt-6 pb-2.5 xl:pb-1 "}
        ${className}
      `}>
      
      { 
        isClassificationTable !== true &&
        <h4 className="table-title">
          {title}
        </h4>
      }
      
      {
        subtitle !== null && 
        <h5 className="table-subtitle">
          {subtitle}
        </h5>
      }

      {
        isClassificationTable !== true &&
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
      }


      <div id="table-data-container" className={data.length > 10 ? 'h-[60vh]' : ''}>
        <Table>
          <MainTableHeader table={table} hasSelectForRows={hasSelectForRows} isClassificationTable={isClassificationTable}/>
          
          <MainTableBody table={table} hasSelectForRows={hasSelectForRows} columns={columns} isClassificationTable={isClassificationTable}/>
        </Table>
      </div>
      {
        enableDataFooter && 
        <CustomPagination table={table} hasCountSelectedLines={hasCountSelectedLines} isClassificationTable={isClassificationTable}/>
      }
    </div>
  );
};

export default MainTable