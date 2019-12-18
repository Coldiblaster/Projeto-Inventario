
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tipos_dispositivos', table =>{
        table.increments('disp_tipo_id').primary()
        table.string('disp_tipo_nome', 20).notNull()
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tipos_dispositivos')
};
