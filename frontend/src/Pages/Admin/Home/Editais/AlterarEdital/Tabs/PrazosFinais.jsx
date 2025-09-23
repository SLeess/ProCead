import { DateTimePicker, FormField, TextInput } from "@/Components/Global/ui/modals";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function PrazosFinais({formData, handleOnChangeAttr, setFormData}){
    const handleDeleteMoment = (indexToDelete) => {
        setFormData(f => ({
            ...f,
            momentos_de_recurso: f.momentos_de_recurso.filter((_, index) => index !== indexToDelete)
        }));
    };

    const [newMomentoRecurso, setNewMomentoRecurso] = useState("");

    const handleAddMomentoRecurso = () => {
        if (newMomentoRecurso.trim()) {
            const newMoment = {
                description: newMomentoRecurso.trim(),
                start: null,
                end: null,
            };
            setFormData(f => ({
                ...f,
                momentos_de_recurso: [...f.momentos_de_recurso, newMoment]
            }));
            setNewMomentoRecurso('');
        }
    };
    const handleChangeMomentoRecurso = (e, attr, index) => {
        const { value: newValue } = e.target;
        const novosMomentos = formData.momentos_de_recurso.map((item, idx) => {
            if (idx !== index) {
                return item;
            }

            return {
                ...item,
                [attr]: newValue,
            };
        });

        setFormData(f => ({
            ...f,
            momentos_de_recurso: novosMomentos,
        }));
    };

    return (
        (<div className="mx-5 space-y-15">
            <div className="space-y-4">
                <h1 className="text-black text-2xl not-italic font-normal leading-[normal]" style={{fontFamily : "Sora, sans-serif"}}>
                    Momentos para Recursos (Envio e Avaliação)
                </h1>
                <div className="grid grid-cols-12 gap-x-8 gap-y-6 overflow-x-auto">
                    <div className="flex items-end gap-2 mb-4 col-span-10 md:col-span-6 lg:col-span-5 xl:col-span-4">
                        <div className="flex-grow">
                            <FormField label="Momento de Recurso">
                                <TextInput
                                    placeholder="Ex: Impugnação de edital"
                                    value={newMomentoRecurso}
                                    onChange={(e) => setNewMomentoRecurso(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddMomentoRecurso()}
                                />
                            </FormField>
                        </div>
                        <button type="button" onClick={handleAddMomentoRecurso} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300">
                            Adicionar
                        </button>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg col-span-12">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 w-16">Índice</th>
                                    <th scope="col" className="px-6 py-3">Descrição do Momento</th>
                                    <th scope="col" className="px-6 py-3">Data de Início</th>
                                    <th scope="col" className="px-6 py-3">Data de Fim</th>
                                    <th scope="col" className="px-6 py-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData?.momentos_de_recurso.length > 0 ? (
                                    formData.momentos_de_recurso.map((moment, index) => (
                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-4 py-4 text-center">{index + 1}</td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 max-w-[160px] overflow-x-auto">{moment.description}</td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900">
                                                <DateTimePicker 
                                                    id={"inicio_avaliacao_socioeconomico"}
                                                    value={formData.momentos_de_recurso[index].start} 
                                                    onChange={(newValue) => handleChangeMomentoRecurso(newValue, `start`, index)} 
                                                    placeholder={"00/00/00 00:00:00"} 
                                                ></DateTimePicker>
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                <DateTimePicker 
                                                    id={"inicio_avaliacao_socioeconomico"}
                                                    value={formData.momentos_de_recurso[index].end} 
                                                    onChange={(newValue) => handleChangeMomentoRecurso(newValue, `end`, index)}  
                                                    placeholder={"00/00/00 00:00:00"} 
                                                ></DateTimePicker>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button type="button" onClick={() => handleDeleteMoment(index)} className="p-1 text-red-600 rounded-full hover:bg-gray-200">
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-gray-500">Nenhuma categoria adicionada.</td>
                                    </tr>
                                )}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <h1 className="text-black text-2xl not-italic font-normal leading-[normal]" style={{fontFamily : "Sora, sans-serif"}}>
                    Prazos dos Resultados Preliminares
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 gap-x-8 gap-y-6">
                    <FormField label="Resultado Preliminar Inscrição" className="sm:col-span-6 md:col-span-4 xl:col-span-3">
                        <DateTimePicker 
                            id={"resultado_preliminar_inscricao"}
                            value={formData.resultado_preliminar_inscricao} 
                            onChange={(e) => handleOnChangeAttr(e, "resultado_preliminar_inscricao")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                    <FormField label="Resultado Preliminar Geral" className="sm:col-span-6 md:col-span-4 xl:col-span-3">
                        <DateTimePicker 
                            id={"resultado_preliminar_geral"}
                            value={formData.resultado_preliminar_geral} 
                            onChange={(e) => handleOnChangeAttr(e, "resultado_preliminar_geral")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                    
                </div>
            </div>
            <div className="space-y-4">
                <h1 className="text-black text-2xl not-italic font-normal leading-[normal]" style={{fontFamily : "Sora, sans-serif"}}>
                    Prazos do Resultado Final
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-12  lg:grid-cols-12 gap-x-8 gap-y-6">
                    <FormField label="Resultado Final" className="sm:col-span-6 md:col-span-4 xl:col-span-3">
                        <DateTimePicker 
                            id={"resultado_final"}
                            value={formData.resultado_final} 
                            onChange={(e) => handleOnChangeAttr(e, "resultado_final")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                </div>
            </div>
        </div>)
    );
}
