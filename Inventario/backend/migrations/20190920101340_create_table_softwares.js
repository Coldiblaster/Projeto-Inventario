
exports.up = function(knex, Promise) {
    return knex.schema.createTable('softwares', table =>{
        table.increments('soft_id').primary()
        table.string('soft_nome', 25).notNull()
        table.integer('soft_qtd').notNull()
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('softwares')
};

