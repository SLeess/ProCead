import { DateTimeInput, DateTimePicker, FormField } from "@/Components/Global/ui/modals";

export default function PrazosIniciais({formData, handleOnChangeAttr}){
    return (
        (<div className="mx-5 space-y-15">
            <div className="space-y-4">
                <h1 className="text-black text-2xl not-italic font-normal leading-[normal]" style={{fontFamily : "Sora, sans-serif"}}>
                    Prazo de Inscrições e Alteração dos Dados (Deferimento)
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-12 gap-x-8 gap-y-6">
                    <FormField label="Início das inscrições" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            value={formData.inicio_inscricoes} 
                            onChange={(e) => handleOnChangeAttr(e, "inicio_inscricoes")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                    <FormField label="Fim das inscrições" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            value={formData.fim_inscricoes} 
                            onChange={(e) => handleOnChangeAttr(e, "fim_inscricoes")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                    <FormField label="Início da Alteração dos Dados" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            value={formData.inicio_alteracao_dados} 
                            onChange={(e) => handleOnChangeAttr(e, "inicio_alteracao_dados")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                    <FormField label="Fim da Alteração dos Dados" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            value={formData.fim_alteracao_dados} 
                            onChange={(e) => handleOnChangeAttr(e, "fim_alteracao_dados")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                </div>
            </div>
            <div className="space-y-4">
                <h1 className="text-black text-2xl not-italic font-normal leading-[normal]" style={{fontFamily : "Sora, sans-serif"}}>
                    Prazo de Avaliações (Reserva de Vagas)
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-12 gap-x-8 gap-y-6">
                    <FormField label="Início da Avaliação Socioeconômico" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            value={formData.inicio_avaliacao_socioeconomico} 
                            onChange={(e) => handleOnChangeAttr(e, "inicio_avaliacao_socioeconomico")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                    <FormField label="Fim da Avaliação Socioeconômico" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            value={formData.fim_avaliacao_socioeconomico} 
                            onChange={(e) => handleOnChangeAttr(e, "fim_avaliacao_socioeconomico")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>

                    <FormField label="Início da Avaliação Junta-Médica" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            value={formData.inicio_avaliacao_junta_medica} 
                            onChange={(e) => handleOnChangeAttr(e, "inicio_avaliacao_junta_medica")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                    <FormField label="Fim da Avaliação Junta-Médica" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            value={formData.fim_avaliacao_junta_medica} 
                            onChange={(e) => handleOnChangeAttr(e, "fim_avaliacao_junta_medica")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>

                    <FormField label="Início da Avaliação Heteroidentificação" className="sm:col-span-3 md:col-span-6 xl:col-span-3" textWrap={false}>
                        <DateTimePicker 
                            value={formData.inicio_avaliacao_heteroidentificacao} 
                            onChange={(e) => handleOnChangeAttr(e, "inicio_avaliacao_heteroidentificacao")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                    <FormField label="Fim da Avaliação Heteroidentificação" className="sm:col-span-3 md:col-span-6 xl:col-span-3" textWrap={false}>
                        <DateTimePicker 
                            value={formData.fim_avaliacao_heteroidentificacao} 
                            onChange={(e) => handleOnChangeAttr(e, "fim_avaliacao_heteroidentificacao")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                                    
                    <FormField label="Início da Avaliação Étnica" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            value={formData.inicio_avaliacao_etnica} 
                            onChange={(e) => handleOnChangeAttr(e, "inicio_avaliacao_etnica")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                    <FormField label="Fim da Avaliação Étnica" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            value={formData.fim_avaliacao_etnica} 
                            onChange={(e) => handleOnChangeAttr(e, "fim_avaliacao_etnica")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>

                    <FormField label="Início da Avaliação de Gênero" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            value={formData.inicio_avaliacao_identidade_genero} 
                            onChange={(e) => handleOnChangeAttr(e, "inicio_avaliacao_identidade_genero")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                    <FormField label="Fim da Avaliação de Gênero" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            value={formData.fim_avaliacao_identidade_genero} 
                            onChange={(e) => handleOnChangeAttr(e, "fim_avaliacao_identidade_genero")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                </div>
            </div>
        </div>)
    );
}
