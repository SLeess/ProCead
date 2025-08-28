import { z } from "zod/v4";

export const userCreateSchema = z.object({
    nome: z.string().min(3, "O nome completo é obrigatório."),
    email: z.email("O formato do e-mail é inválido."),
    cpf: z.string().transform(val => val.replace(/\D/g, ''))
                   .pipe(z.string().length(11, "O CPF deve conter 11 dígitos.")),
}).refine(data => data.password === data.confirm_password, {
    message: "As senhas não coincidem.",
    path: ["confirm_password"],
});