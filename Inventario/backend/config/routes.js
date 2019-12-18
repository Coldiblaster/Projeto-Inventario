const admin = require('./admin')
const multer = require('multer') // Importante adicionar, para aceitar os uploads
const multerConfig = require('./multer')


module.exports = app => {

    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validadeToken)
    
    app.route('/users') //Inserindo
        .all(app.config.passport.authenticate()) // todos precisam passar pelo authenticate
        .post(app.api.user.save)
        .get(admin(app.api.user.get))

    app.route('/users/:id') //Alterando
        .all(app.config.passport.authenticate()) // todos precisam passar pelo authenticate
        .put(app.api.user.save)
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)

    app.route('/software')
        .all(app.config.passport.authenticate()) // todos precisam passar pelo authenticate
        .get(admin(app.api.software.get))
        .post(admin(app.api.software.save))
    
    app.route('/software/:id')
        .all(app.config.passport.authenticate()) // todos precisam passar pelo authenticate
        .put(admin(app.api.software.save))
        .get(app.api.software.getById)
        .delete(admin(app.api.software.remove))   
    
    app.route('/software_type')
        .all(app.config.passport.authenticate()) // todos precisam passar pelo authenticate
        .get(admin(app.api.software_type.get))
        .post(admin(app.api.software_type.save))

    app.route('/software_type/:id')
        .all(app.config.passport.authenticate()) // todos precisam passar pelo authenticate
        .put(admin(app.api.software_type.save))
        .get(app.api.software_type.getById)
        .delete(admin(app.api.software_type.remove))       

    app.route('/device_type')
        .all(app.config.passport.authenticate()) // todos precisam passar pelo authenticate
        .get(admin(app.api.device_type.get))
        .post(admin(app.api.device_type.save))

        app.route('/device_type/:id')
        .all(app.config.passport.authenticate()) // todos precisam passar pelo authenticate
        .put(admin(app.api.device_type.save))   
        .get(app.api.device_type.getById) 
        .delete(admin(app.api.device_type.remove))

    app.route('/device')
        .all(app.config.passport.authenticate()) // todos precisam passar pelo authenticate
        .get(admin(app.api.device.get))
        .post(admin(app.api.device.save))

    app.route('/device/:id')
        .all(app.config.passport.authenticate()) // todos precisam passar pelo authenticate
        .put(admin(app.api.device.save))   
        .get(app.api.device.getById) 
        .delete(admin(app.api.device.remove))

    app.route('/inventory')
        .all(app.config.passport.authenticate()) // todos precisam passar pelo authenticate
        .get(admin(app.api.inventory.get))
        .post(admin(app.api.inventory.save))

    app.route('/inventory/:id')
        .all(app.config.passport.authenticate()) // todos precisam passar pelo authenticate
        .put(admin(app.api.inventory.save))   
        .get(app.api.inventory.getById) 
        .delete(admin(app.api.inventory.remove))

    app.route('/unidade')
        .all(app.config.passport.authenticate()) // todos precisam passar pelo authenticate
        .get(admin(app.api.unidade.get))
        .post(admin(app.api.unidade.save))

    app.route('/unidade/:id')
        .all(app.config.passport.authenticate()) // todos precisam passar pelo authenticate
        .put(admin(app.api.unidade.save))   
        .get(app.api.unidade.getById) 
        .delete(admin(app.api.unidade.remove))

    app.route('/posts')
        .all(app.config.passport.authenticate()) // todos precisam passar pelo authenticate
        .post(multer(multerConfig).single('file'), async(req, res)=> {
            const { originalname: name, size, key, location: url = `http://localhost:3000/files/${key}` } = req.file
            return res.json({ola : name, tamanho : size, chave: key, local: url})
        })
                
}

/*
      // Forma que funciona, amis só salva o arquivo
        .post(multer(multerConfig).single('file'), async(req, res)=> {
 
           const { originalname: name, size, key, location: url = `http://localhost:3000/files/${key}` } = req.file
            return res.json({ola : name, tamanho : size, chave: key, local: url})
        })
*/