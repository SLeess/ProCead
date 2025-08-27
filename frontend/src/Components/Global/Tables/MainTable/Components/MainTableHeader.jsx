import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/Global/ui/table"
import { flexRender } from "@tanstack/react-table";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

export default function MainTableHeader({table, hasSelectForRows, isClassificationTable}){

    return (
        <TableHeader className={`sticky top-0 ${isClassificationTable === true ? "bg-slate-100" : "bg-gray-50"}`}>
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
                    {
                        headerGroup.headers.map((header) => {
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
                        })
                    }
                </TableRow>
            ))}
        </TableHeader>
    );
}