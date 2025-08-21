import React from "react";
import "./Edital.css";
import { FormField, SelectInput, TextInput } from "@/Components/Global/ui/modals";
import DateTimePicker from "react-flatpickr";
import { useState } from "react";

const Edital = () => {
    const [formData, setFormData] = useState({
        referencia: '',
        descricao: '',
        publico_alvo: '',
        formato_notas: '',
        tipo_inscricao: '',
        max_itens_inscricao: '',
        max_itens_posse: '',
        remanejamento: '',
        has_categorias: '',
        tipo_avaliacao_cotas: '',

        inicio_inscricoes: '',
        fim_inscricoes: '',
        inicio_alteracao_dados: '',
        fim_alteracao_dados: '',
        inicio_avaliacao_socioeconomico: '',
        fim_avaliacao_socioeconomico: '',
        inicio_avaliacao_junta_medica: '',
        fim_avaliacao_junta_medica: '',
        inicio_avaliacao_heteroidentificacao: '',
        fim_avaliacao_heteroidentificacao: '',
        inicio_avaliacao_etnica: '',
        fim_avaliacao_etnica: '',
        inicio_avaliacao_identidade_genero: '',
        fim_avaliacao_identidade_genero: '',

        resultado_preliminar_inscricao: '',
        resultado_preliminar_geral: '',
        resultado_final: '',
    });

    return(
        <div id="edital-container">

            <div id="edital-header">
                <p id="edital-header-text">Ver Especificações do Edital</p>
            </div>

            <div id="edital-body">

                <p className="form-subtitles">Informações Básicas</p>

                <div className="edital-forms">
                    <FormField label="Edital referente" className="sm:col-span-2 lg:col-span-2">
                        <TextInput value={formData.referencia} onChange={(e) => handleOnChangeAttr(e, "referencia")} placeholder="Ex: 00/0000" />
                    </FormField>
                    <FormField label="Nome do Edital" className="sm:col-span-4 lg:col-span-4">
                        <TextInput value={formData.descricao} onChange={(e) => handleOnChangeAttr(e, "descricao")} placeholder="Ex: Processo de Seleção de Discente..." />
                    </FormField>
                    <FormField label="Público alvo" className="sm:col-span-2 lg:col-span-3">
                        <SelectInput value={formData.publico_alvo} onChange={(e) => handleOnChangeAttr(e, "publico_alvo")} options={['...', 'teste']} />
                    </FormField>
                    <FormField label="Formato das notas" className="sm:col-span-4 lg:col-span-2">
                        <SelectInput value={formData.formato_notas} onChange={(e) => handleOnChangeAttr(e, "formato_notas")} options={['...', '']} />
                    </FormField>
                    <FormField label="Candidato se inscreve em" className="sm:col-span-4 lg:col-span-3">
                        <SelectInput value={formData.tipo_inscricao} onChange={(e) => handleOnChangeAttr(e, "tipo_inscricao")} options={['...', '']} />
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
                        <SelectInput value={formData.remanejamento} onChange={(e) => handleOnChangeAttr(e, "remanejamento")} options={['...', '']} />
                    </FormField>
                    <FormField label="Edital possui categorias?" className="sm:col-span-2 md:col-span-3 lg:col-span-3">
                        <SelectInput value={formData.has_categorias} onChange={(e) => handleOnChangeAttr(e, "has_categorias")} options={['...', '']} />
                    </FormField>
                    <FormField label="Tipos de Avaliação para Reserva de Vagas" className="sm:col-span-3 lg:col-span-4">
                        <SelectInput value={formData.tipo_avaliacao_cotas} onChange={(e) => handleOnChangeAttr(e, "tipo_avaliacao_cotas")} options={['...', '']} />
                    </FormField>
                </div>

                <hr id="edital-divisor" />

                <p className="form-subtitles">Prazo de Inscrições e Alteração dos Dados (Deferimento)</p>

                <div className="edital-forms">
                    <FormField label="Início das inscrições" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                            <DateTimePicker 
                                id={"inicio_inscricoes"} 
                                value={formData.inicio_inscricoes} 
                                onChange={(e) => handleOnChangeAttr(e, "inicio_inscricoes")} 
                                placeholder={"00/00/00 00:00:00"} 
                            ></DateTimePicker>
                        </FormField>
                        <FormField label="Fim das inscrições" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                            <DateTimePicker 
                                id={"fim_inscricoes"} 
                                value={formData.fim_inscricoes} 
                                onChange={(e) => handleOnChangeAttr(e, "fim_inscricoes")} 
                                placeholder={"00/00/00 00:00:00"} 
                            ></DateTimePicker>
                        </FormField>
                        <FormField label="Início da Alteração dos Dados" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                            <DateTimePicker 
                                id={"inicio_alteracao_dados"} 
                                value={formData.inicio_alteracao_dados} 
                                onChange={(e) => handleOnChangeAttr(e, "inicio_alteracao_dados")} 
                                placeholder={"00/00/00 00:00:00"} 
                            ></DateTimePicker>
                        </FormField>
                        <FormField label="Fim da Alteração dos Dados" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                            <DateTimePicker 
                                id={"fim_alteracao_dados"} 
                                value={formData.fim_alteracao_dados} 
                                onChange={(e) => handleOnChangeAttr(e, "fim_alteracao_dados")} 
                                placeholder={"00/00/00 00:00:00"} 
                            ></DateTimePicker>
                        </FormField>
                </div>

                <hr id="edital-divisor" />

                <p className="form-subtitles">Prazo de Avaliações (Reserva de Vagas)</p>

                <div className="edital-forms">
                    <FormField label="Início da Avaliação Socioeconômico" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            id={"inicio_avaliacao_socioeconomico"} 
                            value={formData.inicio_avaliacao_socioeconomico} 
                            onChange={(e) => handleOnChangeAttr(e, "inicio_avaliacao_socioeconomico")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                        </FormField>
                    <FormField label="Fim da Avaliação Socioeconômico" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            id={"fim_avaliacao_socioeconomico"} 
                            value={formData.fim_avaliacao_socioeconomico} 
                            onChange={(e) => handleOnChangeAttr(e, "fim_avaliacao_socioeconomico")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>

                    <FormField label="Início da Avaliação Junta-Médica" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            id={"inicio_avaliacao_junta_medica"} 
                            value={formData.inicio_avaliacao_junta_medica} 
                            onChange={(e) => handleOnChangeAttr(e, "inicio_avaliacao_junta_medica")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                    <FormField label="Fim da Avaliação Junta-Médica" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            id={"fim_avaliacao_junta_medica"} 
                            value={formData.fim_avaliacao_junta_medica} 
                            onChange={(e) => handleOnChangeAttr(e, "fim_avaliacao_junta_medica")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>

                    <FormField label="Início da Avaliação Heteroidentificação" className="sm:col-span-3 md:col-span-6 xl:col-span-3" textWrap={false}>
                        <DateTimePicker 
                            id={"inicio_avaliacao_heteroidentificacao"} 
                            value={formData.inicio_avaliacao_heteroidentificacao} 
                            onChange={(e) => handleOnChangeAttr(e, "inicio_avaliacao_heteroidentificacao")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                    <FormField label="Fim da Avaliação Heteroidentificação" className="sm:col-span-3 md:col-span-6 xl:col-span-3" textWrap={false}>
                        <DateTimePicker 
                            id={"fim_avaliacao_heteroidentificacao"} 
                            value={formData.fim_avaliacao_heteroidentificacao} 
                            onChange={(e) => handleOnChangeAttr(e, "fim_avaliacao_heteroidentificacao")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                                        
                    <FormField label="Início da Avaliação Étnica" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            id={"inicio_avaliacao_etnica"} 
                            value={formData.inicio_avaliacao_etnica} 
                            onChange={(e) => handleOnChangeAttr(e, "inicio_avaliacao_etnica")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                    <FormField label="Fim da Avaliação Étnica" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            id={"fim_avaliacao_etnica"} 
                            value={formData.fim_avaliacao_etnica} 
                            onChange={(e) => handleOnChangeAttr(e, "fim_avaliacao_etnica")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>

                    <FormField label="Início da Avaliação de Gênero" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            id={"inicio_avaliacao_identidade_genero"} 
                            value={formData.inicio_avaliacao_identidade_genero} 
                            onChange={(e) => handleOnChangeAttr(e, "inicio_avaliacao_identidade_genero")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                    <FormField label="Fim da Avaliação de Gênero" className="sm:col-span-3 md:col-span-6 xl:col-span-3">
                        <DateTimePicker 
                            id={"fim_avaliacao_identidade_genero"} 
                            value={formData.fim_avaliacao_identidade_genero} 
                            onChange={(e) => handleOnChangeAttr(e, "fim_avaliacao_identidade_genero")} 
                            placeholder={"00/00/00 00:00:00"} 
                        ></DateTimePicker>
                    </FormField>
                </div>

                <hr id="edital-divisor" />

                <p className="form-subtitles">Prazo dos Resultados Preliminares</p>

                <div className="edital-forms">
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

                <hr id="edital-divisor" />

                <p className="form-subtitles">Prazo do Resultado Final</p>
                
                <div className="edital-forms">
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
        </div>
    );
}

export default Edital;