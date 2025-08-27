export default function CustomPagination({table, hasCountSelectedLines, isClassificationTable})
{
    return (
        <div id="bottom-tools" className={`${isClassificationTable === true ? "bg-white" : "bg-white"}`}>
                <div id="rows-selected">
                {
                    hasCountSelectedLines && 
                    <>
                        {table.getFilteredSelectedRowModel().rows.length} de{" "}
                        {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
                    </>
                }
                {
                    !hasCountSelectedLines && 
                    <>
                        {table.getFilteredRowModel().rows.length} linha(s) no total(s).
                    </>
                }
                </div>
            <div id="paginate">
                {/* --- Previous Button --- */}
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="paginate-buttons"
                >
                    Anterior
                </button>

                {/* --- Page Indicator --- */}
                <span id="paginate-text">
                    Página{' '}
                    <span className="font-bold text-[var(--paginate-text)]">
                    {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                    </span>
                </span>

                {/* --- Next Button --- */}
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="paginate-buttons"
                >
                    Próxima
                </button>
            </div>
            <div id="pagesize">
                <span id="pagesize-text">
                    Linhas por página:
                </span>
                {/* --- Page Size Selector ---
                /* <select
                    id="pagesize-selector"
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                    table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        {pageSize}
                    </option>
                    ))}
                    <option value={data.length} key={data.length}>Todos</option>
                </select> */}
                <input
                    id="pagesize-input"
                    type="number"
                    min={1}
                    defaultValue={table.getState().pagination.pageSize}
                    onChange={e => {
                    const size = e.target.value ? Number(e.target.value) : 0;
                    table.setPageSize(size > 0 ? size : 10); 
                    }}
                    className="w-24 px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    placeholder="Qtd."
                />
            </div>
      </div>
    );
}