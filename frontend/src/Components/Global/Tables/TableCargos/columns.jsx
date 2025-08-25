import { Eye, X } from "lucide-react";
import React from "react";


const columns = (navigate = () => {}, setDisabledPermissions = () => {}
) => {
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

    return [{
        id: 'select', 
        header: ({ table }) => (
        <div className="flex items-center gap-2">
            <IndeterminateCheckbox
            {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
            }}
            />
            <span>Perfis</span>
        </div>
        ),
        cell: ({ row }) => {
            const handleSelectionChange = (event) => {
                row.getToggleSelectedHandler()(event);

                /**Se o cargo foi marcado */
                if(!row.getIsSelected()){
                    setDisabledPermissions((p) => {
                        return [...p, ...row.original.related_permissions_ids]
                    })
                } else{
                    /**Se o cargo foi desmarcado */
                    setDisabledPermissions((p) => {
                        return Array(p).filter(disabledPerm => !Array(row.original.related_permissions_ids).includes(disabledPerm))
                    })
                }
            };
            return (
                <div className='space-x-2'>
                    <IndeterminateCheckbox
                    {...{
                        checked: row.getIsSelected(),
                        disabled: !row.getCanSelect(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: handleSelectionChange,
                    }}
                    />
                    <span className="font-medium">{row.original.name || row.original.nome}</span>
                </div>
            )},
        },
        {
            id: 'actions',
            header: () => <div className="text-right">Ação</div>,
            cell: ({ row }) => (
            <div className="text-center">
                <button 
                onClick={() => navigate(`admin/perfis/${row.original.id}/permissoes`)}
                className="p-1 text-blue-600 hover:bg-blue-100 rounded-full"
                title="Visualizar Permissões"
                >
                    <Eye className="h-5 w-5" />
                </button>
            </div>
            ),
            enableSorting: false,
        },
    ];
};

export default columns;