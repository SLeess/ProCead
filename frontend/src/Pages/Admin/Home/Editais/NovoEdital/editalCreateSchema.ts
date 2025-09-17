import { z } from "zod";

// Helper para validar o formato de data e hora
const dateRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/;
const invalidDateMessage = "O formato da data deve ser DD/MM/AAAA HH:mm:ss";

function parseDate(dateStr: string): Date | null {
    if (!dateRegex.test(dateStr)) return null;
    const [datePart, timePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('/');

    // Formato ISO para o construtor Date: YYYY-MM-DDTHH:mm:ss
    return new Date(`${year}-${month}-${day}T${timePart}`);
}

const momentoRecursoSchema = z.object({
    description: z.string().min(1, { message: "A descrição do momento de recurso é obrigatória." }),
    start: z.string().regex(dateRegex, { message: `Data de início inválida. ${invalidDateMessage}` }),
    end: z.string().regex(dateRegex, { message: `Data de fim inválida. ${invalidDateMessage}` }),
}).refine(data => {
    const start = parseDate(data.start);
    const end = parseDate(data.end);
    return start && end && end > start;
}, {
    message: "A data de fim deve ser posterior à data de início.",
    path: ["end"], // Atribui o erro ao campo 'end'
});

export const editalCreateSchema = z.object({
    // --- Informações Básicas ---
    referencia: z.string().min(1, { message: "A referência do edital é obrigatória." }).max(255),
    descricao: z.string().min(1, { message: "A descrição é obrigatória." }).max(255),
    publico_alvo: z.string({ required_error: "O público-alvo é obrigatório." }).min(1, { message: "Selecione um público-alvo." }),
    formato_notas: z.string({ required_error: "O formato de notas é obrigatório." }).min(1, { message: "Selecione um formato de notas." }),
    tipo_inscricao: z.string({ required_error: "O tipo de inscrição é obrigatório." }).min(1, { message: "Selecione um tipo de inscrição." }),
    has_categorias: z.string({ required_error: "A configuração de categorias é obrigatória." }).min(1, { message: "Selecione uma configuração de categoria." }),
    
    // Converte a string do input para número antes de validar
    max_itens_inscricao: z.coerce.number({ invalid_type_error: "Deve ser um número." }).int().min(1, { message: "O valor deve ser no mínimo 1." }),
    max_itens_posse: z.coerce.number({ invalid_type_error: "Deve ser um número." }).int().min(1, { message: "O valor deve ser no mínimo 1." }),

    remanejamento: z.any().optional(), // Geralmente um boolean ou string, tornamos opcional

    // --- Prazos ---
    inicio_inscricoes: z.string().regex(dateRegex, { message: `Início das inscrições: ${invalidDateMessage}` }),
    fim_inscricoes: z.string().regex(dateRegex, { message: `Fim das inscrições: ${invalidDateMessage}` }),

    inicio_alteracao_dados: z.string().regex(dateRegex, { message: `Início alteração de dados: ${invalidDateMessage}` }),
    fim_alteracao_dados: z.string().regex(dateRegex, { message: `Fim alteração de dados: ${invalidDateMessage}` }),

    inicio_avaliacao_socioeconomico: z.string().regex(dateRegex, { message: `Início avaliação socioeconômica: ${invalidDateMessage}` }),
    fim_avaliacao_socioeconomico: z.string().regex(dateRegex, { message: `Fim avaliação socioeconômica: ${invalidDateMessage}` }),

    // (Adicione as outras datas de avaliação com o mesmo padrão .regex())
    inicio_avaliacao_junta_medica: z.string().regex(dateRegex, { message: `Início junta médica: ${invalidDateMessage}` }),
    fim_avaliacao_junta_medica: z.string().regex(dateRegex, { message: `Fim junta médica: ${invalidDateMessage}` }),
    inicio_avaliacao_heteroidentificacao: z.string().regex(dateRegex, { message: `Início heteroidentificação: ${invalidDateMessage}` }),
    fim_avaliacao_heteroidentificacao: z.string().regex(dateRegex, { message: `Fim heteroidentificação: ${invalidDateMessage}` }),
    inicio_avaliacao_etnica: z.string().regex(dateRegex, { message: `Início avaliação étnica: ${invalidDateMessage}` }),
    fim_avaliacao_etnica: z.string().regex(dateRegex, { message: `Fim avaliação étnica: ${invalidDateMessage}` }),
    inicio_avaliacao_identidade_genero: z.string().regex(dateRegex, { message: `Início identidade de gênero: ${invalidDateMessage}` }),
    fim_avaliacao_identidade_genero: z.string().regex(dateRegex, { message: `Fim identidade de gênero: ${invalidDateMessage}` }),

    // --- Prazos Finais ---
    momentosDeRecursos: z.array(momentoRecursoSchema),
    resultado_preliminar_inscricao: z.string().regex(dateRegex, { message: `Resultado preliminar (inscrição): ${invalidDateMessage}` }),
    resultado_preliminar_geral: z.string().regex(dateRegex, { message: `Resultado preliminar (geral): ${invalidDateMessage}` }),
    resultado_final: z.string().regex(dateRegex, { message: `Resultado final: ${invalidDateMessage}` }),

// Validações que dependem de mais de um campo
}).refine(data => parseDate(data.fim_inscricoes)! > parseDate(data.inicio_inscricoes)!, {
    message: "A data final das inscrições deve ser posterior à data inicial.",
    path: ["fim_inscricoes"],
}).refine(data => parseDate(data.fim_alteracao_dados)! > parseDate(data.inicio_alteracao_dados)!, {
    message: "A data final de alteração de dados deve ser posterior à data inicial.",
    path: ["fim_alteracao_dados"],
}).refine(data => parseDate(data.fim_avaliacao_socioeconomico)! > parseDate(data.inicio_avaliacao_socioeconomico)!, {
    message: "A data final da avaliação socioeconômica deve ser posterior à data inicial.",
    path: ["fim_avaliacao_socioeconomico"],
}).refine(data => parseDate(data.resultado_final)! > parseDate(data.resultado_preliminar_geral)!, {
    message: "O resultado final deve ser posterior ao resultado preliminar geral.",
    path: ["resultado_final"],
});