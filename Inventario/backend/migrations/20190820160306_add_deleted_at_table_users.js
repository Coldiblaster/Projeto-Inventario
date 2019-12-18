
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.timestamp('deletedAt') // Cria tabela adicionando coluna
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('deletedAt') // altera a tabela excluindo a coluna
    })
};
