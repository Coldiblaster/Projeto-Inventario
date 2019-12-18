
exports.up = function(knex, Promise) {
    return knex.schema.createTable('dispositivos', table =>{
        table.increments('disp_id').primary()
        table.string('disp_patrimonio', 15)
        table.string('disp_marca', 20)
        table.string('disp_descricao', 400)
        table.string('disp_proc',30)
        table.string('disp_ram', 8)
        table.string('disp_hd', 8)
        table.integer('disp_nf_id').references('nf_id').inTable('notas_fiscais')
        table.integer('disp_tipo_id').references('disp_tipo_id').inTable('tipos_dispositivos')
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('dispositivos')
};
