
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notas_fiscais', table =>{
        table.increments('nf_id').primary()
        table.string('nf_name', 50).notNull()
        table.string('nf_size').notNull()
        table.string('nf_key', 200).notNull()
        table.string('nf_url', 250)
        table.timestamp('nf_data_upload') 
    })    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('notas_fiscais')
};
