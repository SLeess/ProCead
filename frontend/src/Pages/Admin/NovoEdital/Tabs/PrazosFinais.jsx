import { DateTimeInput, FormField } from "@/Components/Global/ui/modals";

export default function PrazosFinais({formData, handleOnChangeAttr}){
    return (
        (<div className="mx-5 space-y-15">
            <div className="space-y-4">
                <h1 className="text-black text-2xl not-italic font-normal leading-[normal]" style={{fontFamily : "Sora, sans-serif"}}>
                    Prazo de Inscrições e Alteração dos Dados (Deferimento)
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 gap-x-8 gap-y-6">
                    <FormField label="Início das inscrições" className="sm:col-span-6 md:col-span-4 xl:col-span-3">
                        <DateTimeInput 
                            value={formData.inicio_inscricoes} 
                            onChange={(e) => handleOnChangeAttr(e, "inicio_inscricoes")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimeInput>
                    </FormField>
                    
                </div>
            </div>
            <div className="space-y-4">
                <h1 className="text-black text-2xl not-italic font-normal leading-[normal]" style={{fontFamily : "Sora, sans-serif"}}>
                    Prazo de Avaliações (Reserva de Vagas)
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-12  lg:grid-cols-12 gap-x-8 gap-y-6">
                    <FormField label="Início da Avaliação Socioeconômico" className="sm:col-span-6 md:col-span-4 xl:col-span-3">
                        <DateTimeInput 
                            value={formData.inicio_avaliacao_socioeconomico} 
                            onChange={(e) => handleOnChangeAttr(e, "inicio_avaliacao_socioeconomico")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimeInput>
                    </FormField>
                </div>
            </div>
        </div>)
    );
}
