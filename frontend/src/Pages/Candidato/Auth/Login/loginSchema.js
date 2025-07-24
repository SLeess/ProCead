import { z } from "zod/v4";

export const loginSchema = z.object({
    email: z.email({ message: "Formato de e-mail inválido." })
            .min(1, "Required")
            .nonempty({ message: "O campo e-mail é obrigatório." }),
    password: z.string().nonempty({ message: "O campo de senha é obrigatório." }),
})