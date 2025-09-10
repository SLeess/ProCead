import React from "react";
import "./VisaoGeral.css";
import { TabPanel, TabView } from "primereact/tabview";
import { Bell, CircleCheck, UserRoundPlus } from "lucide-react";

const VisaoGeral = () => {
    const vagasTabs = [
        {title: "Alfabetização e Multiletramentos"},
        {title: "Arte e Cultura Visual"}
    ];

    return(
        <>
            <div id="visao-geral-content">
                <TabView scrollable>
                    {vagasTabs.map((tab) => {
                        return (
                            <TabPanel className="text-md" header={tab.title}>
                                <h1 className="text-2xl mb-6">Detalhes da Vaga "{tab.title}"</h1>
                            </TabPanel>
                        );
                    })}
                </TabView>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-2 mb-6">
                    <div className="bg-green-200 flex flex-row p-2 rounded-md gap-4 items-center shadow-md border-l-4 border-green-600">
                        <CircleCheck className="flex-1/10 w-16 h-16 text-green-600"/>
                        <div className="flex flex-col flex-9/10 gap-2">
                            <p className="text-green-600 font-bold">Status na Modalidade:</p>
                            <p className="text-green-600">Deferido</p>
                            <p className="text-green-600">Modalidade: Transgênero e Travesti</p>
                        </div>
                    </div>
                    <div className="bg-green-200 flex flex-row p-2 rounded-md gap-4 items-center shadow-md border-l-4 border-green-600">
                        <CircleCheck className="flex-1/10 w-16 h-16 text-green-600"/>
                        <div className="flex flex-col flex-9/10 gap-2">
                            <p className="text-green-600 font-bold">Status da Inscrição:</p>
                            <p className="text-green-600">Deferido</p>
                        </div>
                    </div>
                    <div className="bg-yellow-200 flex flex-row p-2 rounded-md gap-4 items-center shadow-md border-l-4 border-yellow-600">
                        <Bell className="flex-1/10 w-16 h-16 text-yellow-600"/>
                        <div className="flex flex-col flex-9/10 gap-2">
                            <p className="text-yellow-600 font-bold">Status de Convocação:</p>
                            <p className="text-yellow-600">Convocado para Matrícula</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-1 mb-6">
                    <button className="flex justify-center items-center h-[60px] gap-2 px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer">
                        <UserRoundPlus />
                        <p className="font-semibold">REALIZAR MATRÍCULA AGORA</p>
                    </button>
                    <span className="text-sm text-gray-800">Prazo Final da Matrícula: <strong>05/10/2025</strong></span>
                </div>

                <div className="border border-slate-200 pb-2 px-2 rounded-md shadow-sm">
                    <p className="text-blue-800 m-4">Comprovante de Inscrição</p>
                    <hr className="mb-4"/>
                    <div className="flex flex-col mx-4 gap-2">
                        <div className="flex flex-row gap-4">
                            <p className="font-semibold">Número de Inscrição:</p>
                            <p>100000000</p>
                        </div>
                        <div className="flex flex-row gap-4">
                            <p className="font-semibold">Nome do Candidato:</p>
                            <p>José Pereira da Silva</p>
                        </div>
                        <div className="flex flex-row gap-4">
                            <p className="font-semibold">Vaga Inscrita:</p>
                            <p>Lato Sensu em Alfabetização e Multiletramentos</p>
                        </div>
                        <div className="flex flex-row gap-4">
                            <p className="font-semibold">Categoria:</p>
                            <p>Categoria 3: Comunidade em Geral</p>
                        </div>
                        <div className="flex flex-row gap-4">
                            <p className="font-semibold">Modalidade:</p>
                            <p>Transgênero e Travesti</p>
                        </div>
                        <div className="flex flex-row gap-4">
                            <p className="font-semibold">Campus:</p>
                            <p>Montes Claros</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VisaoGeral;