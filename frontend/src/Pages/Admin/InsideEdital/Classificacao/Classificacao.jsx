import React, { useState } from "react";
import "./Classificacao.css";
import dataPreview from "./dataPreview.js";
import { Plus, Undo2 } from "lucide-react";
import { MultiSelect } from "primereact/multiselect";
import { TabPanel, TabView } from "primereact/tabview";
import { useParams } from "react-router-dom";

const Classificacao = () => {
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
        <div id="classificacao-content">

            <div id="classificacao-header">
                <p id="classificacao-title">Classificação</p>
                <button id="aprovar-btn">
                    <Plus className="inline" />
                    <span className='ml-1'>Aprovar Classificação</span>
                </button>
            </div>

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

export default Classificacao;