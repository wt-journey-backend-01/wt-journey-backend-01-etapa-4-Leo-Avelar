const { z } = require('zod');

const registerSchema = z.object({
    nome: z.string().nonempty('Nome é obrigatório.'),
    email: z.email().nonempty('Email é obrigatório.'),
    senha: z.string()
                .min(8, "Senha deve ter no mínimo 8 caracteres")
                .regex(/[a-z]/, "Senha deve conter letra minúscula")
                .regex(/[A-Z]/, "Senha deve conter letra maiúscula")
                .regex(/[0-9]/, "Senha deve conter número")
                .regex(/[^a-zA-Z0-9]/, "Senha deve conter caractere especial"),
}).strict();

const loginSchema = z.object({
    email: z.email().nonempty('Email é obrigatório.'),
    senha: z.string().nonempty('Senha é obrigatória.')
                .min(8, "Senha deve ter no mínimo 8 caracteres")
                .regex(/[a-z]/, "Senha deve conter letra minúscula")
                .regex(/[A-Z]/, "Senha deve conter letra maiúscula")
                .regex(/[0-9]/, "Senha deve conter número")
                .regex(/[^a-zA-Z0-9]/, "Senha deve conter caractere especial"),
});

module.exports = { registerSchema, loginSchema };