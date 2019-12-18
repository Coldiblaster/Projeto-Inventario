const bcrypt = require('bcrypt-nodejs')
const _ = require('lodash')

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/

module.exports = app => {
    const sendErrorsFromDB = (res, dbErrors) => {
        const errors = []
        _.forIn(dbErrors.errors, error => errors.push(error.message))
        return res.status(400).json({errors})
    }

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    const encryptPassword = password => { // Vai encriptografar a senha, gerando numeros aleatorios
        const salt = bcrypt.genSaltSync(10) 
        return bcrypt.hashSync(password, salt) 
    }

    const save = async (req, res) => { // Salva e altera
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id

        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false
        //Validações
        try {
            existsOrError(user.name, 'Nome não informado')
            if(!user.email.match(emailRegex)) {
                return res.status(400).send({errors: ['O e-mail informa está inválido']})
            }
            if(!user.password.match(passwordRegex)) {
                return res.status(400).send({errors: [
                    "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número e tamanho entre 6-20."
                ]})
            }
            existsOrError(user.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userFromDB = await app.db('users') // acessa a tabela de usuario
                .where({ email: user.email }).first()

            if(!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        }catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword
        
        if(user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send()) // Status 204 deu tudo certo se chegar aqui
                .catch(err => res.status(500).send(err)) // Se cair aqui, foi por causa de algum erro no servidor
        }
        else { // Se o id não esteja inserido, aqui faz a inserção
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }   
        
    }

    const get = (req, res) => { // vai pegar todos os usuarios do sistema, na parte dos artigos já tem então pode implementar a paginação para usuario e categoria 
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt') // Significa que esse campo deve ser nullos, pra significar q n foi excluido
            .then(users => res.json(users)) // Se vier os usuarios, deu certo
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const getById = (req, res) => { // vai pegar todos os usuarios do sistema, na parte dos artigos já tem então pode implementar a paginação para usuario e categoria 
        app.db('users')
            .select('id', 'name', 'email', 'admin') // Vai trazer esses dados
            .where({ id: req.params.id }) // vai pegar o id selecionado na URL
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id})
            notExistsOrError(articles, 'Usuário possui artigos.')

            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}