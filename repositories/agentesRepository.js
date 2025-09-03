const db = require('../db/db');

async function findAll(filters) {
    const query = db('agentes');
    if (filters.cargo) query.where('cargo', 'ilike', `%${filters.cargo}%`);
    if (filters.sort === 'dataDeIncorporacao') query.orderBy('dataDeIncorporacao', 'asc');
    else if (filters.sort === '-dataDeIncorporacao') query.orderBy('dataDeIncorporacao', 'desc');
    
    const agentes = await query;
    return agentes.map((agente) => ({
        ...agente,
        dataDeIncorporacao: agente.dataDeIncorporacao.toISOString().split('T')[0],
    }));
}

async function findById(id) {
    const agente = await db('agentes').where({ id }).first();
    if (!agente) return null;
    return {
        ...agente,
        dataDeIncorporacao: agente.dataDeIncorporacao.toISOString().split('T')[0],
    };
}

async function create(agente) {
    const [createdAgente] = await db('agentes').insert(agente, ['*']);
    if (!createdAgente) return null;
    return {
        ...createdAgente,
        dataDeIncorporacao: createdAgente.dataDeIncorporacao.toISOString().split('T')[0],
    };
}

async function update(id, updatedAgenteData) {
    const updatedAgente = await db('agentes').where({ id: id }).update(updatedAgenteData, ['*']);
    if (!updatedAgente || updatedAgente.length === 0) return null;
    return {
        ...updatedAgente[0],
        dataDeIncorporacao: updatedAgente[0].dataDeIncorporacao.toISOString().split('T')[0],
    };
}

async function remove(id) {
    return db('agentes').where({ id: id }).del();
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: remove,
};