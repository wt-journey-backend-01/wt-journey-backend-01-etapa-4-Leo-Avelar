const { z } = require('zod');

const agenteSchema = z.object({
    nome: z.string("nome é obrigatório (string)").nonempty("nome não pode ser vazio"),
    dataDeIncorporacao: z.string("dataDeIncorporacao é obrigatória (YYYY-MM-DD ou YYYY/MM/DD)").nonempty("dataDeIncorporacao não pode ser vazia"),
    cargo: z.string("cargo é obrigatório (string)").nonempty("cargo não pode ser vazio"),
}).strict();

const partialAgenteSchema = z.object({
    nome: z.string("nome inválido").optional(),
    dataDeIncorporacao: z.string("dataDeIncorporacao inválida").optional(),
    cargo: z.string("cargo inválido").optional(),
}).strict();

module.exports = { agenteSchema, partialAgenteSchema };