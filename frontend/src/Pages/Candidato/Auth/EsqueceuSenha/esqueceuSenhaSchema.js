import { z } from "zod/v4";

export const esqueceuSenhaSchema = z.object({
    email: z.email({ message: "Formato de e-mail inválido." })
            .min(1, "Required")
            .nonempty({ message: "O campo e-mail é obrigatório." }),
})