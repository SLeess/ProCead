import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import './RelatoriosCustom.css';
import MainTable from '@/Components/Global/Tables/MainTable/MainTable';
import { Button } from 'flowbite-react';
import { toast } from 'react-toastify';
import LoaderPages from '@/Components/Global/LoaderPages/LoaderPages';
import { CiTrash } from 'react-icons/ci';

export default function RelatoriosCustom(){

    const [columns, setColumns] = useState(() => {
        try {
            const savedColumns = localStorage.getItem('tableColumns');
            return savedColumns ? JSON.parse(savedColumns) : [];
        } catch (error) {
            console.error("Erro ao carregar colunas do localStorage", error);
            return [];
        }
    });
    const [data, setData] = useState(() => {
        try {
            const savedData = localStorage.getItem('tableData');
            return savedData ? JSON.parse(savedData) : [];
        } catch (error) {
            console.error("Erro ao carregar dados do localStorage", error);
            return [];
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => setLoading(false), []);

    const handleFileUpload = (e) => {
        setLoading(true);
        try {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onload = (event) => {
                const bstr = event.target.result;
                const workbook = XLSX.read(bstr, { type: 'binary' });

                // Pega o nome da primeira planilha
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Converte a planilha para um array de objetos JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                if (jsonData.length === 0) {
                    alert("O arquivo Excel está vazio!");
                    return;
                }

                // Pega os cabeçalhos (a primeira linha do Excel)
                const headers = jsonData[0];

                const dynamicColumns = headers.map(header => ({
                    accessorKey: header, 
                    header: header,
                }));

                // Pega os dados (todas as linhas exceto o cabeçalho)
                const tableData = jsonData.slice(1).map(row => {
                    const rowData = {};
                    headers.forEach((header, index) => {
                        rowData[header] = row[index];
                    });
                    return rowData;
                });
                
                // Atualiza os estados com os novos dados e colunas
                setColumns(dynamicColumns);
                setData(tableData);

                localStorage.setItem('tableColumns', JSON.stringify(dynamicColumns));
                localStorage.setItem('tableData', JSON.stringify(tableData));
            };   
            
            reader.readAsBinaryString(file);

        } catch (error) {
            toast.error(`Erro inesperado ${error.toString()}`);
        } finally{
            setLoading(false);
        }
    };

    const handleClearData = () => {
        setLoading(true);
        // Limpa o estado do React
        setData([]);
        setColumns([]);

        // Limpa o localStorage
        localStorage.removeItem('tableData');
        localStorage.removeItem('tableColumns');

        toast.info('Tabela limpa com sucesso!');
        setLoading(false);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
    }

    // console.log(data);
    // console.log(columns);
    return (
    <section id='relatoriosCustom'>

        <header>
            <h1>Etapas de Criação do Edital</h1>
        </header>

        <form onSubmit={handleOnSubmit} id="content">
            {
                loading && <LoaderPages/>
            }
            {data.length <= 0 && (
                <>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Importar Dados do Excel</h2>
                    <p className="text-gray-600">Selecione um arquivo .xlsx para carregar os dados na tabela.</p>
                    
                    {/* Botão de Input de Arquivo estilizado */}
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <Button as="span" className="mt-4 mx-auto max-w-fit">
                            Selecionar Arquivo
                        </Button>
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                    />
                </>
            )}
            {data.length > 0 && (
                <>
                    <div className="flex justify-end mb-4">
                        <Button color="failure" className='bg-[var(--admin-button)] hover:bg-[var(--admin-button-hover)] text-white' onClick={handleClearData}>
                            <CiTrash className="mr-2 h-5 w-5" />
                                Limpar Tabela
                        </Button>
                    </div>
                    <MainTable
                        columns={columns}
                        data={data}
                        title="Pré-visualização do Excel"
                        hasShadowBorderStyle={false}
                        hasPaddingStyle={false}
                    />
                </>
            )}
        </form>    
    </section>
    );
}