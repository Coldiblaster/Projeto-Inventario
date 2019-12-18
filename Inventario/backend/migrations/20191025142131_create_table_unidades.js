
exports.up = function(knex, Promise) {
    return knex.schema.createTable('unidades', table =>{
        table.increments('uni_id').primary()
        table.string('uni_nome', 45).notNull()
        table.string('uni_endereco', 50).notNull()
        table.string('uni_cep', 9).notNull()
        table.string('uni_bairro', 20).notNull()
        table.string('uni_cidade', 30).notNull()
        table.string('uni_telefone', 12).notNull()
        table.string('uni_cnpj')
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('unidades')
};
