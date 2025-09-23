import { FormField, SelectInput, TextInput } from "@/Components/Global/ui/modals";

export default function InformacoesBasicas({formData, handleOnChangeAttr, metaData}){
    return (
        <div className="mx-5 space-y-4">
            <h1 className="text-black text-2xl not-italic font-normal leading-[normal]" style={{fontFamily : "Sora, sans-serif"}}>
                Informações Básicas
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-5">
                {/* Row 1 */}
                <div className="md:col-span-1 lg:col-span-2">
                    <FormField label="Edital referente">
                        <TextInput value={formData.referencia} onChange={(e) => handleOnChangeAttr(e, "referencia")} placeholder="Ex: 00/0000" />
                    </FormField>
                </div>
                <div className="md:col-span-1 lg:col-span-10">
                    <FormField label="Nome do Edital">
                        <TextInput value={formData.descricao} onChange={(e) => handleOnChangeAttr(e, "descricao")} placeholder="Ex: Processo de Seleção de Discente..." />
                    </FormField>
                </div>

                {/* --- Linha 2 --- */}
                <div className="md:col-span-1 lg:col-span-4">
                    <FormField label="Público alvo">
                        <SelectInput value={formData.publico_alvo} onChange={(e) => handleOnChangeAttr(e, "publico_alvo")} options={["..."].concat(metaData?.publico_alvo)} />
                    </FormField>
                </div>

                <div className="md:col-span-1 lg:col-span-4">  
                    <FormField label="Formato das notas" className="sm:col-span-4 lg:col-span-2">
                        <SelectInput value={formData.formato_notas} onChange={(e) => handleOnChangeAttr(e, "formato_notas")} options={["..."].concat(metaData?.formato_notas)}  />
                    </FormField>
                </div>

                <div className="md:col-span-1 lg:col-span-4">
                    <FormField label="Candidato se inscreve em">
                        <SelectInput value={formData.tipo_inscricao} onChange={(e) => handleOnChangeAttr(e, "tipo_inscricao")} options={["..."].concat(metaData?.tipo_inscricao)} />
                    </FormField>
                </div>
            </div>
            <h1 className="text-black mt-10 text-2xl not-italic font-normal leading-[normal]" style={{fontFamily : "Sora, sans-serif"}}>
                Valores máximos para seleção de itens
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-5">
                {/* --- Linha 3 --- */}
                <div className="md:col-span-1 lg:col-span-2">
                    <FormField label="Para a Inscrição">
                        <TextInput value={formData.max_itens_inscricao} onChange={(e) => handleOnChangeAttr(e, "max_itens_inscricao")} placeholder="Ex: 2" />
                    </FormField>
                </div>
                <div className="md:col-span-1 lg:col-span-2">
                    <FormField label="Para tomar Posse" className="sm:col-span-3 lg:col-span-4">
                        <TextInput value={formData.max_itens_posse} onChange={(e) => handleOnChangeAttr(e, "max_itens_posse")} placeholder="Ex: 2" />
                    </FormField>
                </div>
            </div>

            <h1 className="text-black mt-10 text-2xl not-italic font-normal leading-[normal]" style={{fontFamily : "Sora, sans-serif"}}>
                Configurações adicionais
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-5">
                {/* <FormField label="Edital exclusivo para MG" className="sm:col-span- lg:col-span-2">
                    <SelectInput value="..." options={['...', onChange={(e) => handleOnChangeAttr(e, "options")} '']} />
                </FormField> */}
                {/* --- Linha 4 --- */}
                <div className="md:col-span-1 lg:col-span-4 xl:col-span-3">
                    <FormField label="Habilitar remanejamento de vagas">
                        <SelectInput value={formData.remanejamento} onChange={(e) => handleOnChangeAttr(e, "remanejamento")} options={['Sim', 'Não']} />
                    </FormField>
                </div>
                <div className="md:col-span-1 lg:col-span-4">
                    <FormField label="Edital possui categorias?">
                        <SelectInput value={formData.has_categorias} onChange={(e) => handleOnChangeAttr(e, "has_categorias")} options={["..."].concat(metaData?.categorias)} />
                    </FormField>
                </div>
                {/* <FormField label="Tipos de Avaliação para Reserva de Vagas" className="sm:col-span-3 lg:col-span-4">
                    <SelectInput value={formData.tipo_avaliacao_cotas} onChange={(e) => handleOnChangeAttr(e, "tipo_avaliacao_cotas")} options={['...', '']} />
                </FormField> */}
            </div>
        </div>
    );
}
