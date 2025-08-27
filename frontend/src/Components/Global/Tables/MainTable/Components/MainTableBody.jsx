import { TableBody, TableCell, TableRow } from "@/Components/Global/ui/table";
import { flexRender } from "@tanstack/react-table";

export default function MainTableBody({table, hasSelectForRows, columns, isClassificationTable}){
    return (
        <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`${isClassificationTable === true ? "bg-white" : "bg-white"}`}
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
    );
}