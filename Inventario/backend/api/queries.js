module.exports = {
    comparaTipoComSoft: `
        select soft_id, soft_nome from softwares 
        inner join tipos_softwares t on t.tipo_soft_id = soft_id
        order by soft_nome
    `
}




