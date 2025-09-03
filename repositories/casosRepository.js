const db = require('../db/db');

async function findAll(filters = {}) {
    const casos = db('casos');
    if (filters.agente_id) casos.where({ agente_id: filters.agente_id });
    if (filters.status) casos.where({ status: filters.status });
    return casos;
}

async function findById(id) {
    return db('casos').where({ id: id }).first();
}

async function findByAgenteId(agente_id) {
    return db('casos').where({ agente_id: agente_id });
}

async function create(caso) {
    return db('casos').insert(caso, ['*']);
}

async function update(id, updatedCasoData) {
    return updatedCaso = db('casos').where({ id: id }).update(updatedCasoData, ['*']);
}

async function remove(id) {
    return db('casos').where({ id: id }).del();
}

async function search(q) {
    return db('casos').where(function () {
        this.whereILike('titulo', `%${q}%`).orWhereILike('descricao', `%${q}%`);
    });
}

module.exports = {
    findAll,
    findById,
    findByAgenteId,
    create,
    update,
    delete: remove,
    search,
};