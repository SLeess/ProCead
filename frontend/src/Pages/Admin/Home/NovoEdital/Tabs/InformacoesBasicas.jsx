import { FormField, SelectInput, TextInput } from "@/Components/Global/ui/modals";

export default function InformacoesBasicas({formData, handleOnChangeAttr, metaData}){
    return (
        <div className="mx-5 space-y-4">
            <h1 className="text-black text-2xl not-italic font-normal leading-[normal]" style={{fontFamily : "Sora, sans-serif"}}>
                Informações Básicas
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-11 gap-x-8 gap-y-6">
                {/* Row 1 */}
                <FormField label="Edital referente" className="sm:col-span-2 lg:col-span-2">
                    <TextInput value={formData.referencia} onChange={(e) => handleOnChangeAttr(e, "referencia")} placeholder="Ex: 00/0000" />
                </FormField>
                <FormField label="Nome do Edital" className="sm:col-span-4 lg:col-span-4">
                    <TextInput value={formData.descricao} onChange={(e) => handleOnChangeAttr(e, "descricao")} placeholder="Ex: Processo de Seleção de Discente..." />
                </FormField>
                <FormField label="Público alvo" className="sm:col-span-2 lg:col-span-3">
                    <SelectInput value={formData.publico_alvo} onChange={(e) => handleOnChangeAttr(e, "publico_alvo")} options={["..."].concat(metaData?.publico_alvo)} />
                </FormField>
                <FormField label="Formato das notas" className="sm:col-span-4 lg:col-span-2">
                    <SelectInput value={formData.formato_notas} onChange={(e) => handleOnChangeAttr(e, "formato_notas")} options={["..."].concat(metaData?.formato_notas)}  />
                </FormField>
                <FormField label="Candidato se inscreve em" className="sm:col-span-4 lg:col-span-3">
                    <SelectInput value={formData.tipo_inscricao} onChange={(e) => handleOnChangeAttr(e, "tipo_inscricao")} options={["..."].concat(metaData?.tipo_inscricao)} />
                </FormField>
                <FormField label="Valor máximo de itens que se pode inscrever" className="sm:col-span-3 lg:col-span-4">
                    <TextInput value={formData.max_itens_inscricao} onChange={(e) => handleOnChangeAttr(e, "max_itens_inscricao")} placeholder="Ex: 2" />
                </FormField>
                <FormField label="Valor máximo de itens que se pode tomar posse" className="sm:col-span-3 lg:col-span-4">
                    <TextInput value={formData.max_itens_posse} onChange={(e) => handleOnChangeAttr(e, "max_itens_posse")} placeholder="Ex: 2" />
                </FormField>
                {/* <FormField label="Edital exclusivo para MG" className="sm:col-span- lg:col-span-2">
                    <SelectInput value="..." options={['...', onChange={(e) => handleOnChangeAttr(e, "options")} '']} />
                </FormField> */}
                <FormField label="Habilitar remanejamento de vagas" className="sm:col-span-3 lg:col-span-3">
                    <SelectInput value={formData.remanejamento} onChange={(e) => handleOnChangeAttr(e, "remanejamento")} options={['Sim', 'Não']} />
                </FormField>
                <FormField label="Edital possui categorias?" className="sm:col-span-2 md:col-span-3 lg:col-span-3">
                    <SelectInput value={formData.has_categorias} onChange={(e) => handleOnChangeAttr(e, "has_categorias")} options={["..."].concat(metaData?.categorias)} />
                </FormField>
                {/* <FormField label="Tipos de Avaliação para Reserva de Vagas" className="sm:col-span-3 lg:col-span-4">
                    <SelectInput value={formData.tipo_avaliacao_cotas} onChange={(e) => handleOnChangeAttr(e, "tipo_avaliacao_cotas")} options={['...', '']} />
                </FormField> */}
            </div>
        </div>
    );
}
