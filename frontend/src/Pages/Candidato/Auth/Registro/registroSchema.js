import { z } from "zod/v4";

export const registerSchema = z.object({
    nome: z.string().min(3, "O nome completo é obrigatório."),
    email: z.email("O formato do e-mail é inválido."),
    cpf: z.string().transform(val => val.replace(/\D/g, ''))
                   .pipe(z.string().length(11, "O CPF deve conter 11 dígitos.")),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
    confirm_password: z.string()
}).refine(data => data.password === data.confirm_password, {
    message: "As senhas não coincidem.",
    path: ["confirm_password"],
});