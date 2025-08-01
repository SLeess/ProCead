import { COLUMNSS } from "@/Components/Global/Tables/TestTable/columns";
import TestTable from "@/Components/Global/Tables/TestTable/TestTable";
import { COLUMNS, visibleDefaultColumns } from "@/Components/Global/Tables/TestTable/ColumnsInscricoes";
import { PRODUCTS } from "@/Components/Global/Tables/TestTable/DATA";
import { AppContext } from "@/Contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home()
{   
    const [Inscricoes, setInscricoes] = useState([]);
    const { token } = useContext(AppContext);

    useEffect(() => {
        const handleTable = async () => {
            try {
                const res = await fetch('/api/data', {
                    method: 'get',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    }
                });
                const response = await res.json();
                setInscricoes(response.data || []);
            } catch (error) {
                toast.error(error)
            }
        }
        handleTable();
    }, []);
    
    return (
        <>
            <div className="">
                <TestTable 
                    rows={Inscricoes} 
                    cols={COLUMNS} 
                    className={`mx-10`} 
                    tableName={"Lista de Inscritos"} 
                    titulo={"Inscritos do Sistema"} 
                    details={"Listagem dos candidatos que participaram do Edital 04/2025"}
                    visibleDefaultColumns={visibleDefaultColumns}
                    minColumns={3}
                ></TestTable>
            </div>
            {/* <div className="">
                <TestTable 
                    rows={PRODUCTS} 
                    cols={COLUMNSS} 
                    className={`mx-10`} 
                    tableName={"Lista de Inscritos"} 
                    titulo={"Inscritos do Sistema"} 
                    details={"Listagem dos candidatos que participaram do Edital 04/2025"}
                    visibleDefaultColumns={visibleDefaultColumns}
                    minColumns={3}
                ></TestTable>
            </div> */}
        </>
    );
}


