import { useState } from "react";
import { toast } from "react-toastify";
import ModalExportarRelatorio from "../Modais/ModalExportarRelatorio";

export default function ExportModuleTable({
    canExport, 
    table, 
    title, 
    pagesCached = [],
    isServerSide = false,
    rowSelection,
    // setRowSelection,
})
{
    const [openModal, setOpenModal] = useState(false);
    // const [selectedRowsData, setSelectedRowsData] = useState([]);

    function onCloseModal() {
        setOpenModal(false);
    }
    function onOpenModal() {
        const selectedIds = Object.keys(table.getState().rowSelection);

        let allSelectedRows = [];

        if (isServerSide) {
            // Junta todos os dados de todas as páginas cacheadas em um único array
            const allCachedData = Object.values(pagesCached).flat();
            
            // Cria um Set para uma busca rápida
            const selectedIdsSet = new Set(selectedIds);
            // Filtra os dados cacheados para encontrar os objetos completos dos usuários selecionados
            allSelectedRows = allCachedData.filter(row => selectedIdsSet.has(row.uuid));

        } else {
            // ===============================================
            // LÓGICA PARA PAGINAÇÃO NO FRONTEND (como antes)
            // ===============================================
            allSelectedRows = table.getFilteredSelectedRowModel().rows.map(row => row.original);
        }

        if (selectedIds.length === 0 && allSelectedRows.length === 0) {
            toast.error('Selecione pelo menos uma linha antes de gerar o relatório.');
            return;
        }

        // setRowSelection(allSelectedRows);
        setOpenModal(true);
    }

    return (<>
        {
            canExport && <button id="export-button" className="bg-[var(--admin-button)] hover:bg-[var(--admin-button-hover)]" onClick={() => onOpenModal()}>
                {'Gerar Relatório'}
            </button>
        }
        <ModalExportarRelatorio openModal={openModal} onCloseModal={onCloseModal} table={table} title={title} selectedRowsData={rowSelection} />
    </>);
}