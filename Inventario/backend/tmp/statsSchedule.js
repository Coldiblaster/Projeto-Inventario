//Utilizando o Mongodb para gravar as estatisticas
//Vai ser utilizado para olhar os bancos e sincronizando os dados de tempo em tempo (1min)

const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('* * * * * *', async function(){
        const usersCount = await app.db('users').count('id').first()
        const softwaresCount = await app.db('softwares').count('soft_id').first()
        const tipos_softwaresCount = await app.db('tipos_softwares').count('tipo_id').first()
        const dispositivosCount = await app.db('dispositivos').count('disp_id').first()
        const inventarioCount = await app.db('inventario').count('inv_id').first()

        const { Stat } = app.api.stat
        const lastStat = await Stat.findOne({}, {},      // Compara o lastStat com o stat para ver se mudou alguma estatistica
            { sort: { 'createdAt' : -1 } })              // Se mudou, persiste no mongo se não, espera a proxima chamada

        const stat = new Stat({
            users: usersCount.count,
            softwares: softwaresCount.count,
            tipos_softwares: tipos_softwaresCount.count,
            dispositivos: dispositivosCount.count,
            inventario: inventarioCount.count,
            createdAt: new Date()
        })

        //Comparações: Se a ultima estatistica não estiver setada ou  o valor for diferente ai vai considerar que o usuario mudou  
        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeSoftwares = !lastStat || stat.softwares !== lastStat.softwares
        const changeTipos_Softwares = !lastStat || stat.tipos_softwares !== lastStat.tipos_softwares
        const changeDispositivos = !lastStat || stat.dispositivos !== lastStat.dispositivos
        const changeInventario = !lastStat || stat.inventario !== lastStat.inventario

        if(changeUsers || changeSoftwares || changeTipos_Softwares || changeDispositivos || changeInventario) // se alterou alguma, habilita para inserir novo registro no mongodb
        {
            stat.save().then(() => console.log('[Stats] Estatísticas atualizadas'))
        }

    }) //Tempo de 1 min
}