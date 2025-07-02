// src/columns.js
import StatusPill from "./StatusPill";

export const COLUMNSS = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img src={row.original.imageUrl} alt={row.original.name} className="w-10 h-10 rounded-md object-cover" />
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-200">{row.original.name}</p>
          <p className="text-sm text-slate-500">ID: {row.original.id}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ getValue }) => (
        <span className="px-2 py-1 text-xs font-semibold uppercase bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 rounded-md">
            {getValue()}
        </span>
    ),
  },
  {
    accessorKey: "inStore",
    header: "In-Store",
    cell: ({ getValue }) => <StatusPill quantity={getValue()} />,
  },
  {
    accessorKey: "online",
    header: "Online",
    cell: ({ getValue }) => <StatusPill quantity={getValue()} />,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => `$${getValue().toFixed(2)}`,
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
  },
  {
    accessorKey: "lastRestock",
    header: "Last Restock",
  },
];