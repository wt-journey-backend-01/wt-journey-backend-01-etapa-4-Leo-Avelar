/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('usuarios').del()
  await knex('usuarios').insert([
    {id: 1, nome: 'Lucas', email: 'lucas@gmail.com', senha: 'Abc123ab!'},
    {id: 2, nome: 'Pedro', email: 'pedro@gmail.com', senha: 'Cde456ab?'},
    {id: 3, nome: 'Maria', email: 'maria@gmail.com', senha: 'Efg789ab!'}
  ]);
};