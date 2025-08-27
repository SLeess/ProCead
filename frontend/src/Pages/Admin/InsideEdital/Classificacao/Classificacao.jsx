import React, { useContext, useEffect, useState } from "react";
import "./Classificacao.css";
import { Plus, Undo2 } from "lucide-react";
import { MultiSelect } from "primereact/multiselect";
import { TabPanel, TabView } from "primereact/tabview";
import { useParams } from "react-router-dom";
import MainTable from "@/Components/Global/Tables/MainTable/MainTable";
import columns from "./columns.jsx";
import data from "./data.js";
import { AppContext } from "@/Contexts/AppContext";
import AccessDenied from "@/Components/Global/AccessDenied/AccessDenied";

const Classificacao = () => {
    const [loading, setLoading] = useState([]);
    const { editalId } = useParams();
    const { hasPermissionForEdital, isSuperAdmin, token, verifyStatusRequest } = useContext(AppContext);

    // dados.
    const [modalidades, setModalidades] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [selectedCursos, setSelectedCursos] = useState(null);

    // fetch nas modalidades para as tabs.
    async function fetchModalidades() {
        try {
            const res = await fetch(`/api/admin/modalidades/${editalId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                verifyStatusRequest(res);
                throw new Error(`Erro ao buscar processos: ${res.status} ${res.statusText}`);
            }

            const result = await res.json();
            setModalidades(result.data);
        } catch (error) {
            setModalidades([]);
            throw new Error(`Erro: ${error}`);
        }
    }

    // fetch nos cursos para options do select.
    async function fetchCursos() {
        try {
            const res = await fetch(`/api/admin/cursos/${editalId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                verifyStatusRequest(res);
                throw new Error(`Erro ao buscar processos: ${res.status} ${res.statusText}`);
            }

            const result = await res.json();
            setCursos(result.data);
        } catch (error) {
            setCursos([]);
            throw new Error(`Erro: ${error}`);
        }
    }

    // renderiza os dados no carregamento da página.
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([fetchModalidades(), fetchCursos()]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (hasPermissionForEdital('visualizar-modalidades', editalId) && hasPermissionForEdital('visualizar-cursos', editalId) || isSuperAdmin())

        return (
            <div id="classificacao-content">

                <div id="classificacao-header">
                    <p id="classificacao-title">Classificação</p>
                    <button id="aprovar-btn">
                        <Plus className="inline" />
                        <span className='ml-1 text-sm'>Aprovar Classificação</span>
                    </button>
                </div>

                <div className="card flex justify-content-center my-4">
                    <MultiSelect 
                        value={selectedCursos} 
                        onChange={(e) => setSelectedCursos(e.value)} 
                        options={cursos} 
                        optionLabel="nome" 
                        display="chip"
                        placeholder="Selecione os Cursos" 
                        className="w-[50%] md:w-20rem h-12 items-center" 
                    />
                </div>

                <TabView scrollable >
                    {modalidades.map((modalidade) => {
                        return (
                            <TabPanel className="text-sm" key={modalidade.id} header={modalidade.sigla}></TabPanel>
                        );
                    })}
                </TabView>

                {selectedCursos && selectedCursos.length > 0 ? (
                    <div>
                        {selectedCursos.map((curso) => {
                            return (
                                <div>
                                    <p className="mb-4 text-xl text-gray-600 font-semibold" key={curso.id}>{curso.nome}</p>
                                    <MainTable data = {data} columns = {columns} isClassificationTable={true} hasPaddingStyle={false} hasSelectForRows={false}/>
                                    <hr className="mt-4 mb-8"/>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <p className="text-red-500">Nenhum curso foi selecionado.</p>
                    </div>
                )}

            </div>
        );

    else {
        return (
            <AccessDenied />
        )
    }
}

export default Classificacao;