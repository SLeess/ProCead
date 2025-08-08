import CabecalhoModal from "@/Components/Global/Modais/CabecalhoModal";
import { FormField, SelectInput } from "@/Components/Global/ui/modals";
import { AppContext } from "@/Contexts/AppContext";
import { Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useContext, useEffect, useState, useRef, useCallback, useMemo } from "react";
import { toast } from "react-toastify";

export default function ModalExportarRelatorio({ openModal, onCloseModal, table, title }) {

  const { token } = useContext(AppContext);

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
      const response = await fetch('/api/export', {
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
                rows={3}
                className="bg-gray-100 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
            <button onClick={() => enableGroupBy(showGroupBy)} className="text-sm font-semibold text-[var(--admin-add-group-by)] hover:underline">
              {showGroupBy ? 'Desabilitar Agrupamento' : 'Agrupar por Coluna'}
            </button>
          </div>
          {showGroupBy && (
            <>
              <hr className="my-4 h-1 bg-gray-300 border-0 rounded-md dark:bg-gray-700" />
              <div id='rows-3-input'>
                <FormField className="md:col-span-3" label="Agrupar por">
                  <div className="space-y-2">
                    {groupByFields.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={index === 0 ? addGroupByField : () => removeGroupByField(index)}
                          className={`p-1 rounded-full transition-colors ${index === 0
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
            <button onClick={() => enableColumnWidth(showColumnWidth)} className="text-sm font-semibold text-[var(--admin-add-group-by)] hover:underline">
              {showColumnWidth ? 'Desabilitar Ajuste de Colunas' : 'Ajustar Largura das Colunas'}
            </button>
          </div>
          {showColumnWidth && (
            <>
              <hr className="my-4 h-1 bg-gray-300 border-0 rounded-md dark:bg-gray-700" />
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Pré-visualização de colunas</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Arraste as divisórias para ajustar a largura das colunas para a exportação em PDF.</p>
                <div ref={previewContainerRef} className="flex w-full h-12 bg-gray-50 border border-gray-300 rounded-md overflow-hidden select-none">
                  {exportableColumns.map((column, index) => (
                    <div
                      key={column.id}
                      className="h-full flex items-center justify-center border-r border-gray-300 relative text-center"
                      style={{ width: `${columnWidths[column.id] || 0}%` }}
                    >
                      <span className="text-xs font-medium text-gray-700 truncate px-2">{column.columnDef.header}</span>
                      {index < exportableColumns.length - 1 && (
                        <div
                          className="absolute top-0 -right-1 h-full w-2 cursor-col-resize z-10"
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
