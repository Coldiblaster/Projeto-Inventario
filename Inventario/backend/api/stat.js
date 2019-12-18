module.exports = app => {
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        softwares: Number,
        tipos_softwares: Number,
        dispositivos: Number,
        inventario: Number,
        createdAt: Date
    })

    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'createdAt' : -1}})
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    softwares: 0,
                    tipos_softwares: 0,
                    dispositivos: 0,
                    inventario: 0
                }
                res.json(stat || defaultStat) 
            })
    }

    return { Stat, get }
}