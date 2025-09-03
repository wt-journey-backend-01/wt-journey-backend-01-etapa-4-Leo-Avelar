/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('usuarios').del()
  await knex('usuarios').insert([
    {id: 1, nome: 'Lucas', email: 'lucas@gmail.com', senha: 'ABCDEFGH'},
    {id: 2, nome: 'Pedro', email: 'pedro@gmail.com', senha: '12345678'},
    {id: 3, nome: 'Maria', email: 'maria@gmail.com', senha: 'ABCD1234'}
  ]);
};