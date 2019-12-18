const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const express = require('express')

require('./config/mongodb') // vai estabelecer conexão com o mongoDB

app.db = db  // Desse modo da pra fazer app.db e select, update entre outras coisas, poir o app agora está recebendo o banco
app.mongoose = mongoose
app.use(express.json()) // IMPORTANTE, POIS O EXPRESS VAI CONSEGUIR LIDAR COM CORPOS DE MENSAGENS VINDO NO FORMADO DE JSON
app.use(express.urlencoded({ extended:true})) // IMPORT: ENSINA O EXPRESS A LIDAR COM REQUISIÇÕES E FACILITA ENVIO DE ARQUIVOS
app.use('/files', express.static(path.resolve(__dirname, 'tmp', 'uploads')))

consign() // Em vez de utilizar o require, utilizara o app , exemplo: app.api.user.save)
    
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)

    //Lembrando que vai carregar primeiro a validation, para depois carregar o resto das api

app.listen(3000 , () => {
    console.log('Backend executando...')
})