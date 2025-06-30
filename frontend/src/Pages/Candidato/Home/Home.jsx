import Table from "../../../Components/Global/Table/Table";
// import { PRODUCTS } from '../../../Components/Global/Table/DATA';
// import { COLUMNS } from '../../../Components/Global/Table/COLUMNS';
import { COLUMNS } from "@/Components/Global/Table/ColumnsInscricoes";
// import { Inscricoes } from "@/Components/Global/Table/dataInscricoes";
import { AppContext } from "@/Contexts/AppContext";
import { useContext, useEffect, useState } from "react";

export default function Home()
{
    
    const [Inscricoes, setInscricoes] = useState([]);
    const { token } = useContext(AppContext);

    useEffect(() => {
        const handleTable = async () => {
            const res = await fetch('/api/data', {
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            });

            const response = await res.json();
            setInscricoes(i => (response.data));
        }
        handleTable();
    }, []);
    
    return (
        <>
            {/* <h1 className="title dark:text-white">Latests Posts</h1>
            <div className="min-h-10/12 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
                
                <header className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm p-4 flex justify-between items-center sticky top-0">
                    <h1 className="text-xl font-bold">
                    React 19 & Tailwind v4
                    </h1>
                </header>

                <main className="p-8">
                    <div className="max-w-md mx-auto bg-slate-100 dark:bg-slate-800 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Olá, Mundo!</h2>
                    <p>
                        Este card e todo o texto dentro dele mudam de cor automaticamente 
                        quando você alterna o tema. A configuração com a stack moderna é 
                        muito mais limpa!
                    </p>
                    </div>
                </main>
                
            </div> */}

            <div className="">
                <Table rows={Inscricoes} cols={COLUMNS} className={`mx-10`} tableName={"Lista de Inscritos"} titulo={"Inscritos do Sistema"} details={"Listagem dos candidatos que participaram do Edital 04/2025"}></Table>
            </div>
        </>
    );
}


