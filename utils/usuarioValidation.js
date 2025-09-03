const { z } = require('zod');

const registerSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório.'),
    email: z.email('Email inválido.'),
    senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres.'),
});

const loginSchema = z.object({
    email: z.email().min(1, 'Email é obrigatório.'),
    senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres.'),
});

module.exports = { registerSchema, loginSchema };