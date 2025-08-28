import { useEffect, useState } from "react";

export default function CustomPagination({
    table, 
    hasCountSelectedLines, 
    rowSelection,
    loading = false,
    setLoading = () => {},
})
{
    const [pageSizeValue, setPageSizeValue] = useState(table.getState().pagination.pageSize);
    // 2. Efeito para sincronizar o input se o valor da tabela mudar por fora
    useEffect(() => {
        setPageSizeValue(table.getState().pagination.pageSize);
    }, [table.getState().pagination.pageSize]);

    const applyPageSize = () => {
        const newSize = Number(pageSizeValue);
        // Só atualiza se o valor for válido e diferente do atual
        if (newSize > 0 && newSize !== table.getState().pagination.pageSize) {
            table.setPageSize(newSize);
        } else {
            // Se o valor for inválido, reseta para o valor atual da tabela
            setPageSizeValue(table.getState().pagination.pageSize);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            applyPageSize();
            event.target.blur(); // Tira o foco do input
        }
    };
    return (
        <div id="bottom-tools">
            <div id="rows-selected">
                {
                    hasCountSelectedLines && 
                    <>
                        {Object.keys(rowSelection).length || 0} linha(s) selecionada(s).
                    </>
                }
                {
                    !hasCountSelectedLines && 
                    <>
                        {table.getFilteredRowModel().rows.length} linha(s) exibidas no total(s).
                    </>
                }
            </div>
            <div id="paginate">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage() || loading}
                    className="paginate-buttons"
                >
                    Anterior
                </button>

                <span id="paginate-text">
                    Página{' '}
                    <span className="font-bold">
                        {table.getState().pagination.pageIndex + 1} de {table.getPageCount() > 0 ? table.getPageCount() : 1}
                    </span>
                </span>

                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage() || loading}
                    className="paginate-buttons"
                >
                    Próxima
                </button>
            </div>
            <div id="pagesize">
                <span id="pagesize-text">
                    Linhas por página:
                </span>
                <input
                    id="pagesize-input"
                    type="number"
                    min={1}
                    value={pageSizeValue}
                    onChange={e => setPageSizeValue(e.target.value)}
                    onBlur={applyPageSize}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                    className={`w-24 px-2 py-1 text-sm font-medium text-gray-700 borderborder-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                        ${loading ? 'bg-gray-200' : 'bg-white'}`
                    }
                />
            </div>
        </div>
    );
}