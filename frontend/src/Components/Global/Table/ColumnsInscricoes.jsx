import CpfPill from "../CpfPill";
import { Checkbox } from "@/Components/ui/checkbox";

export const COLUMNS = [
    {
        id: "select",
        accessorKey: 'select',
        header: ({ table }) => (
            <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            />
        ),  
        enableSorting: false,
    },
    {
        accessorKey: "n_inscricao",
        header: "Número de Inscrição",
    },
    {
        accessorKey: "nome",
        header: "Nome Completo",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "cpf",
        header: "CPF",
        cell: ({ getValue }) => (
            <CpfPill cpf={getValue()}></CpfPill>
        ),
    },
    {
        accessorKey: "modalidade",
        header: "Modalidade",
        alignText: 'text-center',
        cell: ({getValue}) => (
            <span className="px-2 py-1 text-xs font-semibold uppercase bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 rounded-md">
                {getValue()}
            </span>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({getValue}) => (
            // if
            <span className="px-2 py-1 text-xs font-semibold uppercase bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 rounded-md">
                {getValue()}
            </span>
        ),
    },
    
]

// {
//     accessorKey: "",
//     header: "",
//     cell: ({row}) => (
//         <></>
//     ),
// },