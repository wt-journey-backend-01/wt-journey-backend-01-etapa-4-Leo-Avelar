const { z } = require('zod');

const casoSchema = z.object({
    id: z.any().refine(() => false, { message: "Id inválido, o id é criado automaticamente e não é alterável" }).optional(),

    titulo: z.string({ message: 'titulo é obrigatório (string)' }).min(1, 'titulo não pode ser vazio'),

    descricao: z.string({ message: 'descricao é obrigatória (string)' }).min(1, 'descricao não pode ser vazio'),

    status: z.enum(['aberto', 'solucionado'], {message: 'status é obrigatório (aberto ou solucionado)'}),

    agente_id: z.int({message: 'agente_id é obrigatório (Id de um agente existente - integer)'}).positive({message: 'agente_id deve ser um número inteiro positivo'}),
});

module.exports = { casoSchema };