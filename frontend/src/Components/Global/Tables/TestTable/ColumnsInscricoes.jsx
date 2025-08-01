import CpfPill from "./CpfPill";
import { Checkbox } from "@/Components/Global/ui/checkbox";

export const visibleDefaultColumns = ({
    cpf: false,
    modalidade: false,
});

export const COLUMNS = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            className={`border-2 border-gray-400`}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
            checked={row.getIsSelected()}
            className={`border-2 border-gray-400`}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            />
        ),  
        enableSorting: false,
        enableHiding: false,
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
    {
        id: "acoes",
        header: "Ações",
        cell: ({ row }) => (
            <div className={`flex flex-row gap-2`}>
                <button onClick={() => { console.log(row.original.id); }}>
                    <svg className="hover:cursor-pointer hover:text-blue-800 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 28 28" fill="none" style={{flexShrink: 0}}>
                        <path d="M2.40569 14.4059C2.30846 14.144 2.30846 13.8559 2.40569 13.5939C3.35267 11.2978 4.96012 9.33448 7.02425 7.95298C9.08838 6.57148 11.5162 5.83398 14 5.83398C16.4838 5.83398 18.9117 6.57148 20.9758 7.95298C23.0399 9.33448 24.6474 11.2978 25.5944 13.5939C25.6916 13.8559 25.6916 14.144 25.5944 14.4059C24.6474 16.7021 23.0399 18.6654 20.9758 20.0469C18.9117 21.4284 16.4838 22.1659 14 22.1659C11.5162 22.1659 9.08838 21.4284 7.02425 20.0469C4.96012 18.6654 3.35267 16.7021 2.40569 14.4059Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 17.5C15.933 17.5 17.5 15.933 17.5 14C17.5 12.067 15.933 10.5 14 10.5C12.067 10.5 10.5 12.067 10.5 14C10.5 15.933 12.067 17.5 14 17.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button onClick={() => { console.log(row.original.id); }}>
                    <svg className="hover:cursor-pointer hover:text-yellow-800 text-amber-600" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 28 28" fill="none" style={{flexShrink: 0}}>
                        <path d="M24.703 7.94745C25.3198 7.33078 25.6664 6.49433 25.6665 5.62211C25.6666 4.7499 25.3202 3.91336 24.7035 3.29654C24.0869 2.67971 23.2504 2.33312 22.3782 2.33301C21.506 2.3329 20.6695 2.67928 20.0526 3.29595L4.4823 18.8698C4.21142 19.1399 4.0111 19.4724 3.89896 19.8381L2.3578 24.9155C2.32765 25.0163 2.32537 25.1235 2.35121 25.2256C2.37705 25.3277 2.43004 25.4209 2.50456 25.4953C2.57908 25.5697 2.67235 25.6225 2.77448 25.6482C2.87661 25.6739 2.98378 25.6714 3.08463 25.6411L8.16313 24.1011C8.5285 23.99 8.861 23.7909 9.13147 23.5213L24.703 7.94745Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17.5 5.83325L22.1667 10.4999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        ),  
        enableSorting: false,
        enableHiding: false,
    },
    
]

// {
//     accessorKey: "",
//     header: "",
//     cell: ({row}) => (
//         <></>
//     ),
// },