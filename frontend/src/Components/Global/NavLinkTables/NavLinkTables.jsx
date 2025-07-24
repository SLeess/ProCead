import React from "react";

export default function NavLinkTables({ table, maxPages = 7 }){
      const renderPageNumbers = () => {
        const totalPages = table.getPageCount();
        const currentPage = table.getState().pagination.pageIndex;
        const pageNumbers = [];
        const maxPagesToShow = maxPages; // Quantidade máxima de botões de página para exibir
    
        if (totalPages <= maxPagesToShow) {
            for (let i = 0; i < totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Lógica para mostrar ellipsis se houver muitas páginas
            let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
            let endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPagesToShow / 2));
    
            if (endPage - startPage + 1 < maxPagesToShow) {
                if (currentPage < Math.floor(maxPagesToShow / 2)) {
                    endPage = maxPagesToShow - 1;
                } else if (currentPage > totalPages - 1 - Math.floor(maxPagesToShow / 2)) {
                    startPage = totalPages - maxPagesToShow;
                }
            }
    
            if (startPage > 0) {
                pageNumbers.push(0);
                if (startPage > 1) pageNumbers.push('...');
            }
    
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
    
            if (endPage < totalPages - 1) {
                if (endPage < totalPages - 2) pageNumbers.push('...');
                pageNumbers.push(totalPages - 1);
            }
        }
        return pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
                {page === '...' ? (
                    <span className="mx-3 my-1 text-gray-500">...</span>
                ) : (
                    <button
                        onClick={() => table.setPageIndex(page)}
                        className={`px-3 py-2 mx-1 hover:cursor-pointer text-md not-italic font-bold leading-[18px] ${
                            table.getState().pagination.pageIndex === page
                                ? 'text-[#004DA9]' // página ativa
                                : 'text-black hover:bg-gray-200 ' // páginas inativas
                        }`}
                    >
                        {page + 1}
                    </button>
                )}
            </React.Fragment>
        ));
    };
    
    return(
        table.getRowModel().rows.length > 0 &&
          <div className="flex flex-col sm:flex-row justify-center items-center mt-8 px-2 md:px-0 text-sm">
              <div className="flex items-center space-x-2 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)] bg-white">
                  <button
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-[#F2F5F7] dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      &lt;
                  </button>

                  <div className="flex ">
                      {renderPageNumbers()}
                  </div>

                  <button
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-[#F2F5F7] dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      &gt;
                  </button>
              </div>
          </div>
    );
}