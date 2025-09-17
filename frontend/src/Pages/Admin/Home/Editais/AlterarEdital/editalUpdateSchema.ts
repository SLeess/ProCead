import { z } from "zod";

const dateRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/;
const invalidDateMessage = "O formato da data deve ser DD/MM/AAAA HH:mm:ss";

function parseDate(dateStr: string): Date | null {
    if (!dateRegex.test(dateStr)) return null;
    const [datePart, timePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('/');

    // Formato ISO para o construtor Date: YYYY-MM-DDTHH:mm:ss
    return new Date(`${year}-${month}-${day}T${timePart}`);
}

const momento_de_recurso = z.object({
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

export const editalUpdateSchema = z.object({
    // --- Informações Básicas ---
    descricao: z.string().min(1, { message: "A descrição é obrigatória." }).max(255),

    // --- Prazos ---
    inicio_inscricoes: z.string().regex(dateRegex, { message: `Início das inscrições: ${invalidDateMessage}` }),
    fim_inscricoes: z.string().regex(dateRegex, { message: `Fim das inscrições: ${invalidDateMessage}` }),

    inicio_alteracao_dados: z.string().regex(dateRegex, { message: `Início alteração de dados: ${invalidDateMessage}` }),
    fim_alteracao_dados: z.string().regex(dateRegex, { message: `Fim alteração de dados: ${invalidDateMessage}` }),

    // (Adicione as outras datas de avaliação com o mesmo padrão .regex())
    inicio_avaliacao_socioeconomico: z.string().regex(dateRegex, { message: `Início avaliação socioeconômica: ${invalidDateMessage}` }),
    fim_avaliacao_socioeconomico: z.string().regex(dateRegex, { message: `Fim avaliação socioeconômica: ${invalidDateMessage}` }),
    inicio_avaliacao_junta_medica: z.string().regex(dateRegex, { message: `Início junta médica: ${invalidDateMessage}` }),
    fim_avaliacao_junta_medica: z.string().regex(dateRegex, { message: `Fim junta médica: ${invalidDateMessage}` }),
    inicio_avaliacao_heteroidentificacao: z.string().regex(dateRegex, { message: `Início heteroidentificação: ${invalidDateMessage}` }),
    fim_avaliacao_heteroidentificacao: z.string().regex(dateRegex, { message: `Fim heteroidentificação: ${invalidDateMessage}` }),
    inicio_avaliacao_etnica: z.string().regex(dateRegex, { message: `Início avaliação étnica: ${invalidDateMessage}` }),
    fim_avaliacao_etnica: z.string().regex(dateRegex, { message: `Fim avaliação étnica: ${invalidDateMessage}` }),
    inicio_avaliacao_identidade_genero: z.string().regex(dateRegex, { message: `Início identidade de gênero: ${invalidDateMessage}` }),
    fim_avaliacao_identidade_genero: z.string().regex(dateRegex, { message: `Fim identidade de gênero: ${invalidDateMessage}` }),
    
    // --- Prazos Finais ---
    momentos_de_recurso: z.array(momento_de_recurso),
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