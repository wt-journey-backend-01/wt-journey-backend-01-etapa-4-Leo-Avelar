const db = require('../db/db');

async function createUser(user) {
    const [created] = await db('usuarios')
        .insert(user)
        .returning(['id', 'nome', 'email']);
    return created;
}

async function findByEmail(email) {
    return db('usuarios').where({ email }).first();
}

async function deleteUser(id) {
    return db('usuarios').where({ id }).del();
}

module.exports = {
    createUser,
    findByEmail,
    findByName,
    deleteUser
};