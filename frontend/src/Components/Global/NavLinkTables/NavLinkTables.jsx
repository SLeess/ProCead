import React from "react";
import "./NavLinkTables.css";

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
                    <span className={`ellipsis`}>...</span>
                ) : (
                    <button
                        onClick={() => table.setPageIndex(page)}
                        className={`pageNumberButton' ${
                            table.getState().pagination.pageIndex === page
                                ? 'pageNumberButtonActive'
                                : 'pageNumberButtonInactive'
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
          <div id={`paginationContainer`}>
              <div className={`paginationWrapper`}>
                  <button
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className={`pageButton`}
                  >
                      &lt;
                  </button>

                  <div className={`pageNumbersContainer`}>
                      {renderPageNumbers()}
                  </div>

                  <button
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className={`pageButton`}
                  >
                      &gt;
                  </button>
              </div>
          </div>
    );
}