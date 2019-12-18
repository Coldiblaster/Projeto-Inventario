const mongoose = require('mongoose') // biblioteca odm https://mongoosejs.com/
mongoose.connect('mongodb://localhost/knowledge_stats', { useNewUrlParser: true })
    .catch(e => {
        const msg = "Não foi possível conectar com o MongoDB!"
        console.log('\x1b[41m%s\x1b[37m',msg, '\x1b[0m') // vai aparecer colorido no console
    })