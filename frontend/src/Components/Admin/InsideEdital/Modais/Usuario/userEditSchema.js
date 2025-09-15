import { z } from 'zod';

export const editUserSchema = z.object({
    uuid: z.string().uuid("O ID do usuário fornecido é inválido."),
    nome: z.string().min(3, "O nome completo é obrigatório."),
    email: z.string().email("O formato do e-mail é inválido."),
    cpf: z.string()
        .transform(val => val.replace(/\D/g, '')) // Remove a formatação
        .pipe(z.string().length(11, "O CPF deve conter 11 dígitos.")),

        // --- Lógica para Senhas Opcionais ---
    password: z.string().optional(),    
    confirm_password: z.string().optional()
})
.refine(data => {
    if (!data.password) return true;
    
    return data.password.length >= 8;
}, {
    message: "A nova senha deve ter no mínimo 8 caracteres.",
    path: ["password"],
})
.refine(data => {
    if (!data.password) return true;
    
    return data.password === data.confirm_password;
}, {
    message: "As senhas não coincidem.",
    path: ["confirm_password"],
});