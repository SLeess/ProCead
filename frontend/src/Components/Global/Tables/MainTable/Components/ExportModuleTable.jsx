import { useState } from "react";
import { toast } from "react-toastify";
import ModalExportarRelatorio from "../Modais/ModalExportarRelatorio";

export default function ExportModuleTable({canExport, table, title})
{
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }
    function onOpenModal() {
        var RowModels = table.getSortedRowModel().rows.filter(row => row.getIsSelected());
        if (RowModels.length == 0)
        toast.error('Selecione pelo menos uma linha antes de gerar o relatório.');
        else
        setOpenModal(true);
    }

    return (<>
        {
            canExport && <button id="export-button" className="bg-[var(--admin-button)] hover:bg-[var(--admin-button-hover)]" onClick={() => onOpenModal()}>
                {'Gerar Relatório'}
            </button>
        }
        <ModalExportarRelatorio openModal={openModal} onCloseModal={onCloseModal} table={table} title={title}/>
    </>);
}