import { COLUMNSS } from "@/Components/Global/Table/columns";
import Table from "../../../Components/Global/Table/Table";
import { COLUMNS, visibleDefaultColumns } from "@/Components/Global/Table/ColumnsInscricoes";
import { PRODUCTS } from "@/Components/Global/Table/DATA";
import { AppContext } from "@/Contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home()
{
    const navigate = useNavigate();
    
    const [Inscricoes, setInscricoes] = useState([]);
    const { token, logout } = useContext(AppContext);

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
    
                // if (!res.ok) {
                    // if (res.status === 401) {
                    //     toast.info("Login inválido ou expirado. Redirecionando para a tela de Login...");
                    //     logout();
                    // }
                    // throw new Error('Falha ao buscar dados.');
                // }

                const response = await res.json();
                setInscricoes(response.data || []);
            } catch (error) {
                // navigate('/login');
            }
        }
        handleTable();
    }, []);
    
    return (
        <>
            <div className="">
                <Table 
                    rows={Inscricoes} 
                    cols={COLUMNS} 
                    className={`mx-10`} 
                    tableName={"Lista de Inscritos"} 
                    titulo={"Inscritos do Sistema"} 
                    details={"Listagem dos candidatos que participaram do Edital 04/2025"}
                    visibleDefaultColumns={visibleDefaultColumns}
                    minColumns={3}
                ></Table>
            </div>
            {/* <div className="">
                <Table 
                    rows={PRODUCTS} 
                    cols={COLUMNSS} 
                    className={`mx-10`} 
                    tableName={"Lista de Inscritos"} 
                    titulo={"Inscritos do Sistema"} 
                    details={"Listagem dos candidatos que participaram do Edital 04/2025"}
                    visibleDefaultColumns={visibleDefaultColumns}
                    minColumns={3}
                ></Table>
            </div> */}
        </>
    );
}


