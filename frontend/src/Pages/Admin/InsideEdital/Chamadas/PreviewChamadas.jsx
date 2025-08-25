import React from "react";
import { useState } from "react";
import "./PreviewChamadas.css";
import { Undo2 } from "lucide-react";
import dataPreview from "./dataPreview.js";
import { useLocation, useNavigate } from "react-router-dom";

// Prime React component imports.
import { MultiSelect } from 'primereact/multiselect';
import { TabView, TabPanel } from 'primereact/tabview';
import "primereact/resources/themes/lara-light-purple/theme.css";

const PreviewChamadas = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const showChamada = location.state;
    const tabs = [
        'Ampla Concorrência', 
        'Negros e Pardos', 
        'Pessoa com Deficiência', 
        'Transgênero e Travesti', 
        'Egresso de Escola Pública',
        'Ver Todos'
    ];

    // filter by cursos.
    const [selectedCursos, setSelectedCursos] = useState(null);
    const cursos = [
        { name: 'Especialização em Alfabetização e Multiletramentos' },
        { name: 'Especialização em Arte e Cultura Visual' },
        { name: 'Especialização em Apicultura' },
        { name: 'Especialização em Artes Cênicas' },
        { name: 'Especialização em Pecuária' },
        { name: 'Especialização em Arqueologia' },
    ];

    return (
        <div id="preview-content">

            <div id="preview-header">
                {showChamada ? (
                    <p id="preview-title">{showChamada.title}</p>
                ) : (
                    <p id="preview-title">Pré-Visualização da Chamada</p>
                )}
                <button onClick={() => navigate(-1) } id="back-btn">
                    <Undo2 className="inline" />
                    <span className="ml-1">Voltar</span>
                </button>
            </div>
            
            {showChamada ? (
                <p id="preview-editalref">Edital Referente: {showChamada.editalref}</p>
            ) : (
                <></>
            )}

            <div className="card flex justify-content-center my-4">
                <MultiSelect 
                    value={selectedCursos} 
                    onChange={(e) => setSelectedCursos(e.value)} 
                    options={cursos} 
                    optionLabel="name" 
                    display="chip"
                    placeholder="Selecione os Cursos" 
                    className="w-[50%] md:w-20rem h-12 items-center" 
                />
            </div>

            <TabView scrollable >
                {tabs.map((tab) => {
                    return (
                        <TabPanel className="text-sm" key={tab} header={tab}></TabPanel>
                    );
                })}
            </TabView>

            <div className="shadow-sm mb-4">
                <div className="flex bg-gray-100 py-2 px-4">
                    <div className="w-1/4 text-sm text-gray-600">Inscrição</div>
                    <div className="w-1/4 text-sm text-gray-600">Nome</div>
                    <div className="w-1/4 text-sm text-gray-600">CPF</div>
                    <div className="w-1/4 text-sm text-gray-600">Modalidade</div>
                </div>
                <div className="bg-white">
                    {dataPreview.map((item, index) => (
                        <div key={index} className={`${index % 2 == 1 ? ' bg-slate-50' : ''}`}>
                            <div className="flex border-t border-slate-100 py-2 px-4">
                                <p className="w-1/4">{item.inscricao}</p>
                                <p className="w-1/4">{item.nome}</p>
                                <p className="w-1/4">{item.cpf}</p>
                                <p className="w-1/4">{item.modalidade}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default PreviewChamadas;