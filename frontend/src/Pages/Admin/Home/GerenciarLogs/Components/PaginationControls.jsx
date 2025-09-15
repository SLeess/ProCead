import { useEffect, useState } from "react";

export default function PaginationControls({ pagination, setPagination, meta, loading, className=`` }){
    const [pageSizeInput, setPageSizeInput] = useState(pagination.pageSize);

    useEffect(() => {
        setPageSizeInput(pagination.pageSize);
    }, [pagination.pageSize]);

    const applyPageSize = () => {
        const newSize = Number(pageSizeInput);
        if (newSize > 0) {
            setPagination({ pageIndex: 1, pageSize: newSize }); // Volta para a pág. 1
        }
    };
    
    return (
        <div className={`${className} flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 p-2 border-t dark:border-gray-700`}>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setPagination(p => ({ ...p, pageIndex: p.pageIndex - 1 }))}
                    disabled={meta.current_page === 1 || loading}
                    className="paginate-buttons"
                >
                    Anterior
                </button>
                <span>
                    Página <span className="font-bold">{meta.current_page || 0}</span> de <span className="font-bold">{meta.last_page || 0}</span>
                </span>
                <button
                    onClick={() => setPagination(p => ({ ...p, pageIndex: p.pageIndex + 1 }))}
                    disabled={meta.current_page === meta.last_page || loading}
                    className="paginate-buttons"
                >
                    Próxima
                </button>
            </div>
            <div className="flex items-center gap-2">
                <span>Linhas por pág:</span>
                <input
                    type="number"
                    min={1}
                    value={pageSizeInput}
                    onChange={e => setPageSizeInput(e.target.value)}
                    onBlur={applyPageSize}
                    onKeyDown={e => e.key === 'Enter' && applyPageSize()}
                    disabled={loading}
                    className="w-16 p-1 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
            </div>
        </div>
    );
};