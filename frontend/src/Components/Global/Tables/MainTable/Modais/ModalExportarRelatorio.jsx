import { FormField, SelectInput } from "@/Components/Global/ui/modals";
import { AppContext } from "@/Contexts/AppContext";
import { Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ModalExportarRelatorio({openModal, onCloseModal, table, title}){

  const { token } = useContext(AppContext);

  const [titulo, setTitulo] = useState('Edital Referente: Processo de Seleção de Discentes para os Cursos de Especialização da Unimontes – Modalidade Educação a Distância – Sistema Universidade Aberta do Brasil (UAB) – Edital Nº 08/2025');
  const [subtitulo, setSubtitulo] = useState(title);
  const [orientacao, setOrientacao] = useState('Retrato');
  const [formato, setFormato] = useState('PDF');
  const [showGroupBy, setShowGroupBy] = useState(false);

  const [isExporting, setIsExporting] = useState(false);

  const [groupByFields, setGroupByFields] = useState(['']);

  const addGroupByField = () => {
    if(groupByFields.length == 3)
      toast.error("Não é possível agrupar por mais de 3 elementos");
    else
      setGroupByFields([...groupByFields, '']);
  };

  const removeGroupByField = (index) => {
    const newFields = [...groupByFields];
    newFields.splice(index, 1);
    setGroupByFields(newFields);
    // console.log(groupByFields);
  };

  const handleGroupByChange = (index, value) => {
    setGroupByFields(prevFields => {
      const newFields = [...prevFields];
      newFields[index] = value;
      return newFields;
    });
  };

  useEffect(() => {
    // console.log("Novo grupo de campos:", groupByFields);
  }, [groupByFields]);

  const availableColumns = table.getAllColumns()
    .filter(column => column.id !== 'select' && column.id !== 'acoes' && column.id !== 'id' && column.id !== 'actions')
    .map(column => column.id);

  function enableGroupBy(showGroupBy) {
    if(showGroupBy) {
      setGroupByFields(['']);
    }
    setShowGroupBy(!showGroupBy)
  }

  const handleExport = async (titulo, subtitulo, orientacao, formato) => {
    const visibleColumns = table.getVisibleLeafColumns().map(col => ({
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
          columns: visibleColumns.filter(chave => chave.id !== 'select' && chave.id !== 'acoes'),
          rows: rows,
          tableName: title,
          titulo: titulo,
          subtitulo: subtitulo,
          orientacao: orientacao,
          formato: formato,
          groupByFields: groupByFields.filter(field => field !== ''),
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

  return(
    <Modal show={openModal} onClose={onCloseModal} popup>
            <ModalHeader />
            <ModalBody >

              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Gerar Relatório</h1>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                  <FormField className="md:col-span-3" label="Título do PDF">
                    <textarea
                      rows={3}
                      className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
                  <button onClick={() => enableGroupBy(showGroupBy)} className="text-sm font-semibold text-blue-600 hover:underline">
                    {showGroupBy ? 'Desabilitar Agrupamento' : 'Agrupar por Coluna'}
                  </button>
                </div>
                {showGroupBy && (
                  <>
                    <hr className="my-4 h-1 bg-gray-300 border-0 rounded-sm dark:bg-gray-700" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                      <FormField className="md:col-span-3" label="Agrupar por">
                        <div className="space-y-2">
                          {groupByFields.map((field, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={index === 0 ? addGroupByField : () => removeGroupByField(index)}
                                className={`p-1 rounded-full transition-colors ${index === 0
                                    ? 'text-blue-600 hover:bg-blue-100'
                                    : 'text-red-600 hover:bg-red-100'
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


                <div className="mt-10 flex justify-end items-center space-x-4">
                  <button onClick={onCloseModal} className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Fechar</button>
                  <button onClick={() => handleExport(titulo, subtitulo, orientacao, formato)} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> {isExporting ? 'Exportando...' : 'Gerar Relatório'}</button>
                </div>
              </div>
            </ModalBody>
          </Modal>
  );
}
