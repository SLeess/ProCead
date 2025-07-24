import { z } from "zod/v4";

export const recuperarSenhaSchema = z.object({
    token: z.string(),
    email: z.email({ message: "Formato de e-mail inválido." })
            .min(1, "Required")
            .nonempty({ message: "O campo e-mail é obrigatório." }),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
    confirm_password: z.string()
}).refine(data => data.password === data.confirm_password, {
    message: "As senhas não coincidem.",
    path: ["confirm_password"],
})