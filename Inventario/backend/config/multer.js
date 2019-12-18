const multer = require('multer')
const path = require('path')
const crypto = require('crypto') 


const storageTypes = {
    dest: path.resolve(__dirname, '..', 'tmp', 'uploads'), // cd .. cd .. cd tmp cd uploads
    local: multer.diskStorage({
        destination:(req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'tmp', 'uploads'))
        },
        filename: (req, file, cb) => { // forma de garantir q não possa existir 2 imagens com o mesmo nome
            crypto.randomBytes(16, (err, hash)=>{
                if(err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}` // vai ter 16bits de caracteres aleatorios letras aleatorias + nomearquivo
                cb(null, file.key)
            })
        },
     })
}


module.exports = {
    dest: path.resolve(__dirname, '..', 'tmp', 'uploads'), // cd .. cd .. cd tmp cd uploads
    storage: storageTypes['local'],
    limits: { // Determinar o tamanho dos arquivos, quantos uploads pode ser feito
        fileSize: 2 * 1024 * 1024, //determinou 2 mb de tamanho 
    },
    fileFilter: (req, file, cb) => { // filtra upload de arquivos .. cb seria callback
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            'application/pdf'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Invalid file type."))
        }
    }
}