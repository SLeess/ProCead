import React from "react";
import { useState } from "react";
import "./PreviewChamadas.css";
import { Undo2 } from "lucide-react";
import { FormField, SelectInput } from "@/Components/Global/ui/modals";
import dataPreview from "./dataPreview.js";
import { useLocation, useNavigate } from "react-router-dom";

const PreviewChamadas = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const showChamada = location.state;
    const [activeTab, setActiveTab] = useState('Ampla Concorrência');
    const tabs = ['Ampla Concorrência', 'Negros e Pardos', 'Pessoa com Deficiência', 'Transgênero e Travesti', 'Egresso de Escola Pública'];

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

            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 mb-6">
                <FormField label="Selecione um Curso">
                    <SelectInput value="..." options={[]} />
                </FormField>
            </div>

            <div className="border border-slate-100 mb-6 rounded-md bg-gray-100">
                <nav className="flex justify-around" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`whitespace-nowrap py-2 px-1 font-medium text-sm w-full cursor-pointer ${activeTab === tab
                                ? 'text-[#6C4BC3] font-semibold bg-[white] rounded-md m-0.5'
                                : 'text-gray-500'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

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