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

const stringMessages = (description) => ({
    required_error: `A ${description} é obrigatória.`,
    invalid_type_error: `A ${description} não pode ser nula.`, 
});

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
    descricao:                              z.string().min(1, { message: "A descrição é obrigatória." }).max(255),

    // --- Prazos ---
    inicio_inscricoes:                      z.string(stringMessages('data de início das inscrições')).regex(dateRegex, { message: `${invalidDateMessage}` }),
    fim_inscricoes:                         z.string(stringMessages('data de término das inscrições')).regex(dateRegex, { message: `${invalidDateMessage}` }),

    inicio_alteracao_dados:                 z.string(stringMessages('data de início da alteração de dados pelos Administradores')).regex(dateRegex, { message: `${invalidDateMessage}` }),
    fim_alteracao_dados:                    z.string(stringMessages('data de término da alteração de dados pelos Administradores')).regex(dateRegex, { message: `${invalidDateMessage}` }),

    inicio_avaliacao_socioeconomico:        z.string(stringMessages('data de início da avaliação Socioeconômica')).regex(dateRegex, { message: `${invalidDateMessage}` }),
    fim_avaliacao_socioeconomico:           z.string(stringMessages('data de término da avaliação Socioeconômica')).regex(dateRegex, { message: `${invalidDateMessage}` }),
    inicio_avaliacao_junta_medica:          z.string(stringMessages('data de início da avaliação Médica')).regex(dateRegex, { message: `${invalidDateMessage}` }),
    fim_avaliacao_junta_medica:             z.string(stringMessages('data de término da avaliação Médica')).regex(dateRegex, { message: `${invalidDateMessage}` }),
    inicio_avaliacao_heteroidentificacao:   z.string(stringMessages('data de início da avaliação Heteroidentificatória')).regex(dateRegex, { message: `${invalidDateMessage}` }),
    fim_avaliacao_heteroidentificacao:      z.string(stringMessages('data de término da avaliação Heteroidentificatória')).regex(dateRegex, { message: `${invalidDateMessage}` }),
    inicio_avaliacao_etnica:                z.string(stringMessages('data de início da avaliação Étnica')).regex(dateRegex, { message: `${invalidDateMessage}` }),
    fim_avaliacao_etnica:                   z.string(stringMessages('data de término da avaliação Étnica')).regex(dateRegex, { message: `${invalidDateMessage}` }),
    inicio_avaliacao_identidade_genero:     z.string(stringMessages('data de início da avaliação de identidade de gênero')).regex(dateRegex, { message: `${invalidDateMessage}` }),
    fim_avaliacao_identidade_genero:        z.string(stringMessages('data de término da avaliação de identidade de gênero')).regex(dateRegex, { message: `${invalidDateMessage}` }),
    
    // --- Prazos Finais ---
    momentosDeRecursos:                     z.array(momento_de_recurso),
    resultado_preliminar_inscricao:         z.string(stringMessages('resultado_preliminar_inscricao')).regex(dateRegex, { message: ` ${invalidDateMessage}` }),
    resultado_preliminar_geral:             z.string(stringMessages('resultado_preliminar_geral')).regex(dateRegex, { message: ` ${invalidDateMessage}` }),
    resultado_final:                        z.string(stringMessages('resultado_final')).regex(dateRegex, { message: `${invalidDateMessage}` }),

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