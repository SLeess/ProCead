import { z } from "zod/v4";

export const perfilCreateSchema = z.object({
    name: z.string({
        required_error: "O campo Nome do Cargo é obrigatório.",
    })
    .min(2, { message: "O Nome do Cargo deve ter no mínimo 2 caracteres." })
    .max(255, { message: "O Nome do Cargo deve ter no máximo 255 caracteres." }),

    scope: z.enum(['local', 'global'], {
        required_error: "O campo Escopo do Cargo é obrigatório.",
        invalid_type_error: "Selecione um escopo válido (local ou global).",
    }),
})