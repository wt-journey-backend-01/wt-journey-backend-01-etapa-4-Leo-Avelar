const { z } = require('zod');

const casoSchema = z.object({
    titulo: z.string("titulo é obrigatório (string)").nonempty("titulo não pode ser vazio"),
    descricao: z.string("descricao é obrigatória (string)").nonempty("descricao não pode ser vazio"),
    status: z.enum(['aberto', 'solucionado'], "status é obrigatório (aberto ou solucionado)"),
    agente_id: z.int("agente_id é obrigatório (Id de um agente existente - integer)").positive("agente_id deve ser um número inteiro positivo"),
}).strict();

const partialCasoSchema = z.object({
    titulo: z.string("titulo é obrigatório (string)").optional(),
    descricao: z.string("descricao é obrigatória (string)").optional(),
    status: z.enum(['aberto', 'solucionado'], "status é obrigatório (aberto ou solucionado)").optional(),
    agente_id: z.int("agente_id é obrigatório (Id de um agente existente - integer)").positive("agente_id deve ser um número inteiro positivo").optional(),
}).strict();

module.exports = { casoSchema, partialCasoSchema };