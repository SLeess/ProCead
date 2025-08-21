import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import { FormField, SelectInput } from "@/Components/Global/ui/modals";
import { AppContext } from "@/Contexts/AppContext";
import { Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useContext, useEffect, useState, useRef, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import "./ModalExportarRelatorio.css";

export default function ModalExportarRelatorio({ openModal, onCloseModal, table, title }) {

  const { token, verifyStatusRequest } = useContext(AppContext);

  const [titulo, setTitulo] = useState('Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025');
  const [subtitulo, setSubtitulo] = useState(title);
  const [orientacao, setOrientacao] = useState('Retrato');
  const [formato, setFormato] = useState('PDF');
  const [showGroupBy, setShowGroupBy] = useState(false);
  const [showColumnWidth, setShowColumnWidth] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [groupByFields, setGroupByFields] = useState(['']);
  const [columnWidths, setColumnWidths] = useState({});

  const [resizingColumnIndex, setResizingColumnIndex] = useState(null);
  const startXRef = useRef(null);
  const startWidthsRef = useRef(null);
  const previewContainerRef = useRef(null);

  const exportableColumns = useMemo(() => table.getVisibleLeafColumns()
    .filter(column => 
      column.id !== 'select' && 
      column.id !== 'acoes' && 
      column.id !== 'id' && 
      column.id !== 'actions' &&
      !groupByFields.includes(column.id)
    ),
    [table.getState().columnVisibility, groupByFields]
  );

  useEffect(() => {
    if (openModal && exportableColumns.length > 0) {
      const initialWidth = 100 / exportableColumns.length;
      const initialWidths = {};
      exportableColumns.forEach(column => {
        initialWidths[column.id] = initialWidth;
      });
      setColumnWidths(initialWidths);
    }
  }, [openModal, exportableColumns]);

  const handleMouseMove = useCallback((e) => {
    if (resizingColumnIndex === null || !previewContainerRef.current || !startWidthsRef.current) return;

    const dx = e.clientX - startXRef.current;
    const containerWidth = previewContainerRef.current.offsetWidth;
    if (containerWidth === 0) return;
    const dxPercent = (dx / containerWidth) * 100;

    const newWidths = { ...startWidthsRef.current };
    const currentColumnId = exportableColumns[resizingColumnIndex].id;
    const nextColumnId = exportableColumns[resizingColumnIndex + 1].id;

    const currentInitialWidth = startWidthsRef.current[currentColumnId];
    const nextInitialWidth = startWidthsRef.current[nextColumnId];

    let newCurrentWidth = currentInitialWidth + dxPercent;
    let newNextWidth = nextInitialWidth - dxPercent;

    const minWidth = 5; // 5% minimum width
    if (newCurrentWidth < minWidth) {
      newCurrentWidth = minWidth;
      newNextWidth = currentInitialWidth + nextInitialWidth - minWidth;
    }
    if (newNextWidth < minWidth) {
      newNextWidth = minWidth;
      newCurrentWidth = currentInitialWidth + nextInitialWidth - minWidth;
    }

    newWidths[currentColumnId] = newCurrentWidth;
    newWidths[nextColumnId] = newNextWidth;

    setColumnWidths(newWidths);
  }, [resizingColumnIndex, exportableColumns]);

  // useEffect(() => {
  //   if (Object.keys(columnWidths).length > 0) {
  //     console.log('Column Widths:', columnWidths);
  //   }
  // }, [columnWidths]);

  const handleMouseUp = useCallback(() => {
    setResizingColumnIndex(null);
  }, []);

  useEffect(() => {
    if (resizingColumnIndex !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingColumnIndex, handleMouseMove, handleMouseUp]);

  const handleMouseDown = (e, index) => {
    e.preventDefault();
    setResizingColumnIndex(index);
    startXRef.current = e.clientX;
    startWidthsRef.current = { ...columnWidths };
  };

  const addGroupByField = () => {
    if (groupByFields.length == 3)
      toast.error("Não é possível agrupar por mais de 3 elementos");
    else
      setGroupByFields([...groupByFields, '']);
  };

  const removeGroupByField = (index) => {
    const newFields = [...groupByFields];
    newFields.splice(index, 1);
    setGroupByFields(newFields);
  };

  const handleGroupByChange = (index, value) => {
    setGroupByFields(prevFields => {
      const newFields = [...prevFields];
      newFields[index] = value;
      return newFields;
    });
  };

  const availableColumns = table.getAllColumns()
    .filter(column => column.id !== 'select' && column.id !== 'acoes' && column.id !== 'id' && column.id !== 'actions')
    .map(column => column.id);

  function enableGroupBy(showGroupBy) {
    if (showGroupBy) {
      setGroupByFields(['']);
    }
    setShowGroupBy(!showGroupBy)
  }
  function enableColumnWidth(showColumnWidth) {
    if (showColumnWidth) {
      const initialWidth = 100 / exportableColumns.length;
      const initialWidths = {};
      exportableColumns.forEach(column => {
        initialWidths[column.id] = initialWidth;
      });
      setColumnWidths(initialWidths);
    }
    setShowColumnWidth(!showColumnWidth)
  }

  const handleExport = async (titulo, subtitulo, orientacao, formato) => {
    const visibleColumnsForExport = exportableColumns.map(col => ({
      id: col.id,
      header: col.columnDef.header,
    }));

    const selectedRows = table.getSelectedRowModel().rows;
    const sortedRows = table.getSortedRowModel().rows;

    const resultRows = sortedRows.filter((row) => selectedRows.find((selecRow) => selecRow.id == row.id));

    if (selectedRows.length === 0) {
      toast.error('Selecione pelo menos uma linha antes de gerar o relatório.');
      return;
    }

    setIsExporting(true);

    const rows = resultRows.map(row => {
      const filteredRowData = {};
      table.getVisibleLeafColumns().forEach(column => {
        if (column.id in row.original) {
          filteredRowData[column.id] = row.original[column.id];
        }
      });
      return filteredRowData;
    });

    try {
      const response = await fetch('/api/admin/export', {
        method: 'post',
        body: JSON.stringify({
          columns: visibleColumnsForExport,
          rows: rows,
          tableName: title,
          titulo: titulo,
          subtitulo: subtitulo,
          orientacao: orientacao,
          formato: formato,
          groupByFields: groupByFields.filter(field => field !== ''),
          columnWidths: columnWidths,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, application/pdf',
          'Authorization': `Bearer ${token}`
        },
      });

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();


        const errorMessages = Object.values(errorData.errors || { general: [errorData.message || 'Erro desconhecido'] }).flat();
        onCloseModal();
        errorMessages.forEach((e) => {
          return toast.error(e);
        });
      } else {
        if (!response.ok) {
            verifyStatusRequest(response);
            throw new Error(`Erro na rede: ${response.status} ${response.statusText}`);
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'relatorio.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      toast.error(error.message || 'Falha na comunicação com a API.');
      console.error("Erro na exportação:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Modal show={openModal} onClose={onCloseModal} popup>

      <CabecalhoModal titleModal = {"Exportar Relatório"}/>

          <hr className='mb-3 mx-4'/>

      <ModalBody >

        <div>
          <div id='rows-3-input'>
            <FormField className="md:col-span-3" label="Título do PDF">
              <textarea
                id="titulo-pdf-textarea"
                rows={3}
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              >
              </textarea>
            </FormField>
            <FormField className="md:col-span-3" label="Subtítulo do PDF"><TextInput value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} /></FormField>
            <FormField className="md:col-span-1" label="Orientação da Página">
              <SelectInput value={orientacao} options={['Retrato', 'Paisagem']} onChange={(e) => setOrientacao(e.target.value)} />
            </FormField>
            <FormField className="md:col-span-1" label="Formato do Arquivo">
              <SelectInput readOnly={true} value={formato} onChange={(e) => setFormato(e.target.value)} options={['PDF', 'Excel']} />
            </FormField>
          </div>
          <div className="mt-4">
            <button id="relatorio-special-options" onClick={() => enableGroupBy(showGroupBy)}>
              {showGroupBy ? 'Desabilitar Agrupamento' : 'Agrupar por Coluna'}
            </button>
          </div>
          {showGroupBy && (
            <>
              <hr id="relatorio-special-options-divisor" />
              <div id='rows-3-input'>
                <FormField className="md:col-span-3" label="Agrupar por">
                  <div className="space-y-2">
                    {groupByFields.map((field, index) => (
                      <div id="relatorio-group-by-column-container" key={index}>
                        <button
                          id="relatorio-group-by-column-button"
                          type="button"
                          onClick={index === 0 ? addGroupByField : () => removeGroupByField(index)}
                          className={`${index === 0
                            ? 'cursor-pointer text-[var(--admin-add-group-by)] hover:bg-[var(--admin-add-group-by-hover)]'
                            : 'cursor-pointer text-red-600 hover:bg-red-100'
                            }`}
                        >
                          {index === 0 ? <PlusCircle className="h-5 w-5" /> : <MinusCircle className="h-5 w-5" />}
                        </button>
                        <div className="w-full">
                          <SelectInput
                            defaultOption={true}
                            value={field}
                            onChange={(e) => handleGroupByChange(index, e.target.value)}
                            options={availableColumns.filter(op => !groupByFields.includes(op) || op == field)}
                            placeholder="Selecione uma coluna"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </FormField>
              </div>
            </>
          )}
          <div className="mt-4">
            <button id="relatorio-special-options" onClick={() => enableColumnWidth(showColumnWidth)}>
              {showColumnWidth ? 'Desabilitar Ajuste de Colunas' : 'Ajustar Largura das Colunas'}
            </button>
          </div>
          {showColumnWidth && (
            <>
              <hr id="relatorio-special-options-divisor" />
              <div className="mt-6">
                <h3 id="relatorio-column-adjustment-title">Pré-visualização de colunas</h3>
                <p id="relatorio-column-adjustment-subtitle">Arraste as divisórias para ajustar a largura das colunas para a exportação em PDF.</p>
                <div id="relatorio-column-adjustment-container" ref={previewContainerRef}>
                  {exportableColumns.map((column, index) => (
                    <div
                      id="relatorio-column-adjustment-item-box"
                      key={column.id}
                      style={{ width: `${columnWidths[column.id] || 0}%` }}
                    >
                      <span id="relatorio-column-adjustment-item-text">{column.columnDef.header}</span>
                      {index < exportableColumns.length - 1 && (
                        <div
                          id="relatorio-column-adjustment-slide"
                          onMouseDown={(e) => handleMouseDown(e, index)}
                        >
                          <div className={`h-full w-px bg-gray-400 ${resizingColumnIndex === index ? 'bg-blue-600' : ''} hover:bg-blue-600`}></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}


          <div id="buttons-container">
            <button onClick={onCloseModal} id='modal-white-button'>Fechar</button>
            <button onClick={() => handleExport(titulo, subtitulo, orientacao, formato)} id='modal-purple-button'> {isExporting ? 'Exportando...' : 'Gerar Relatório'}</button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
