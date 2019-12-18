const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs') // Compara a senha 

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {// verifica o body da requisição se tem email e está com senha
            return res.status(400).send('Informe usuário e senha!')
        }

        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        if(!user) return res.status(400).send('Usuário não encontrado!')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if(!isMatch) return res.status(401).send('Email/Senha inválidos!')

        //Configuração do tempo de limite do token
        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now, //emitido a data e o exp é o tempo limite
            exp: now + (60 * 60 * 24 * 3) // Tempo que um token pode ficar no navegador, por exemplo, ele pode ficar 3 dias, então o usuario só precisaria logar no 4° dia
            //         ( 60 -> segundos * 60 -> minutos * 24 -> horas * 3 -> quantidade de dias)

            // iat(data inicial) e exp(data limite) são nomes padrões do jwt
        }

        res.json({ // manda a resposta
            ...payload, // vai mandar id do usuario, nome, email, se é admin, data de geraçãp, expiração 
            token: jwt.encode(payload, authSecret) // vai gerar o token apartir de um segredo
            //Qualquer nova requisição que for feita vai precisar de uma autorização, para saber se o usuario pode ou não fazer a requisição
        })
        
        // O Token serve para:  
        // O token diz para o fronteand que tem o token valido e valida quais serviços ele pode acessar.
    }
    
    const validadeToken = async( req, res ) => {
        const userData = req.body || nulltry 
        try{
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Data()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            // problema com o token
        }

        res.send(false)
    }

    return { signin, validadeToken } 
}