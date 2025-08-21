import React from 'react';
import { CircleQuestionMark, Eye } from 'lucide-react';
import { Tooltip } from 'flowbite-react';

function IndeterminateCheckbox({ indeterminate, className = '', ...rest }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref.current) {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}


export const TabelaPermissoesGlobaisGlobais = () => [
  {
    accessorKey: "nome",
    header: ({ table }) => (
      <div className="flex items-center gap-2">
        <IndeterminateCheckbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
        <span>Permissões</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className='space-x-2'>
        <IndeterminateCheckbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
    enableSorting: false,
  },

  {
    id: 'actions',
    header: () => <div className="text-right">Ação</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Tooltip content={row.original.description}>
          <button 
          //   onClick={() => navigate(`admin/perfis/${row.original.id}/permissoes`)}
            className="p-1 text-blue-600 hover:bg-blue-100 rounded-full"
            title="Visualizar Permissões"
          >
            {/* <Eye className="h-5 w-5" /> */}
            <CircleQuestionMark className="h-5 w-5" />
          </button>
        </Tooltip>
      </div>
    ),
    enableSorting: false,
  },
];