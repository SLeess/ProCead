import LoaderPages from "@/Components/Global/LoaderPages/LoaderPages";
import MainTable from "@/Components/Global/Tables/MainTable/MainTable";
import { Paperclip } from "lucide-react";
import React, { useEffect, useState } from "react";
import "./Anexos.css";
import columns from './columns';
import AnexoCreateModal from "./Modais/AnexoCreateModal";
import { useAppContext } from "@/Contexts/AppContext";

const Anexos = () => {
    // const { token, verifyStatusRequest } = useContext(AppContext);
    // const [needUpdate, setNeedUpdate] = useState(false);
    const { token } = useAppContext();
    const [anexos, setAnexos] = useState([]);
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProcessos = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/super-admin/anexos",{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })
                const result = await res.json();
                setAnexos(result.data);
            } catch (err) {
                setError("Não foi possível carregar seus processos seletivos. " + (err.message ? ` (${err.message})` : ''));
                setAnexos([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProcessos();
    }, []);

    return (
        <>
            {loading && <LoaderPages />}
            {!loading &&
                <section id="anexos">
                    <header>
                        <h1>Gerenciar Anexos</h1>
                    </header>
                    <div id="content">
                        <div className="lg:px-4">
                            <div className="flex items-center justify-between  mb-4">
                                <div className="bg-white shadow-md rounded-md p-5 w-xs relative flex flex-col justify-between h-30">
                                    <p className="text-gray-600 mb-1">Nº de Anexos</p>
                                    <p className="text-2xl font-bold mb-1">{ anexos.length }</p>
                                    <Paperclip className="absolute top-4 right-4 text-gray-500" />
                                </div>
                                <AnexoCreateModal />
                            </div>
                            <MainTable
                                data={anexos}
                                columns={columns}
                                title={"Anexos"}
                                canExport={false}
                                canHiddenColumns={false}
                                hasSelectForRows={false}
                            />
                        </div>
                    </div>
                </section>
            }
        </>
    );
}

export default Anexos;