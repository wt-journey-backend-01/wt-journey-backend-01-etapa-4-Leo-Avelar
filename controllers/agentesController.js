const agentesRepository = require('../repositories/agentesRepository');
const { agenteSchema, partialAgenteSchema } = require('../utils/agenteValidation');
const { AppError } = require('../utils/errorHandler');
const { z } = require('zod');




function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && date <= new Date();
}


async function getAll(req, res) {
    const {cargo, sort} = req.query;

    if (sort && !['dataDeIncorporacao', '-dataDeIncorporacao'].includes(sort)) {
        return res.status(400).json({message: "O parâmetro 'sort' deve ser 'dataDeIncorporacao' ou '-dataDeIncorporacao'."});
    }

    const agentes = await agentesRepository.findAll({ cargo, sort});
    res.status(200).json(agentes);
}

async function getById(req, res) {
	const { id } = req.params;
    
    const idNum = Number(id);
    if (isNaN(idNum)) return res.status(400).json({ message: 'ID inválido.' });
    
    const agente = await agentesRepository.findById(idNum);
    if (!agente) return res.status(404).json({ message: `Não foi possível encontrar o agente de Id: ${idNum}` });
    res.status(200).json(agente);
}

async function create(req, res, next) {
    try {
        const data = agenteSchema.parse(req.body);
        if (!isValidDate(data.dataDeIncorporacao)) {
            return res.status(400).json({ message: "dataDeIncorporacao deve estar no formato YYYY-MM-DD e não pode ser um valor futuro." });
        }
        const agente = await agentesRepository.create(data);

        if (!agente) return res.status(400).json({ message: 'Erro ao criar agente.' });
        res.status(201).json(agente);
    } catch (err) {
        if (err instanceof AppError) {
            return next(err);
        }
        if (err instanceof z.ZodError) {
            return next(new AppError(400, err.issues.map((e) => e.message).join(', ')));
        }
        return next(new AppError(500, 'Erro ao criar agente.'));
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        const data = agenteSchema.parse(req.body);
        if (!isValidDate(data.dataDeIncorporacao)) {
            return res.status(400).json({ message: "dataDeIncorporacao deve estar no formato YYYY-MM-DD e não pode ser um valor futuro." });
        }

        const updated = await agentesRepository.update(id, data);
        if (!updated) return res.status(404).json({ message: 'Agente não encontrado.' });
        res.status(200).json(updated);
    } catch (err) {
        if (err instanceof AppError) {
            return next(err);
        }
        if (err instanceof z.ZodError) {
            return next(new AppError(400, err.issues.map((e) => e.message).join(', ')));
        }
        return next(new AppError(500, 'Erro ao atualizar agente.'));
    }
}

async function partialUpdate(req, res, next) {
    const { id } = req.params;
    try {
        const data = partialAgenteSchema.parse(req.body);
        if (data.dataDeIncorporacao && !isValidDate(data.dataDeIncorporacao)) {
            return res.status(400).json({ message: "dataDeIncorporacao deve estar no formato YYYY-MM-DD e não pode ser um valor futuro." });
        }
        const updatedAgente = await agentesRepository.update(id, data);
        if (!updatedAgente) return res.status(404).json({ message: 'Agente não encontrado.' });
        res.status(200).json(updatedAgente);
    } catch (err) {
        if (err instanceof AppError) {
            return next(err);
        }
        if (err instanceof z.ZodError) {
            return next(new AppError(400, err.issues.map((e) => e.message).join(', ')));
        }
        return next(new AppError(500, 'Erro ao atualizar agente.'));
    }
}

async function remove(req, res) {
	const { id } = req.params;
	const deleted = await agentesRepository.delete(id);

	if (!deleted) return res.status(404).json({ message: 'Agente não encontrado.' });
	res.status(204).send();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    partialUpdate,
    delete: remove,
};