import { DateTimePicker, FormField } from "@/Components/Global/ui/modals";

export default function PrazosFinais({formData, handleOnChangeAttr}){
    return (
        (<div className="mx-5 space-y-15">
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
                    Prazos dos Recursos (Envio e Avaliação)
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-12  lg:grid-cols-12 gap-x-8 gap-y-6">
                    {/* <FormField label="Início do Envio dos Recursos" className="sm:col-span-6 md:col-span-4 xl:col-span-3">
                        <DateTimePicker 
                            id={"inicio_avaliacao_socioeconomico"}
                            value={formData.inicio_avaliacao_socioeconomico} 
                            onChange={(e) => handleOnChangeAttr(e, "inicio_avaliacao_socioeconomico")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField> */}
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
