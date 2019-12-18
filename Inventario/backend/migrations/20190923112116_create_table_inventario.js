
exports.up = function(knex, Promise) {
    return knex.schema.createTable('inventario', table =>{
        table.increments('inv_id').primary()
        table.string('inv_descricao', 400)
        table.integer('inv_disp_id').references('disp_id').inTable('dispositivos').notNull()
        table.integer('inv_tipo_id').references('tipo_id').inTable('tipos_softwares')
        table.integer('inv_uni_id').references('uni_id').inTable('unidades').notNull()
        table.string('inv_user', 20)
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('inventario')
};


