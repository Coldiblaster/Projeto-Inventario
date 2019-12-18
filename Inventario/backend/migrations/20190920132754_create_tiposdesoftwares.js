
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tipos_softwares', table =>{
        table.increments('tipo_id').primary()
        table.string('tipo_key', 25).notNull()
        table.string('tipo_descricao', 400)
        table.string('tipo_nf', 50)
        table.date('tipo_data_compra').notNull()
        table.integer('tipo_soft_id').references('soft_id').inTable('softwares').notNull()
        table.integer('tipo_nf_id').references('nf_id').inTable('notas_fiscais')
        
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tipos_softwares')
};

