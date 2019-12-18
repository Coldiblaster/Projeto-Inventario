module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => { // Salva e altera
        const software = { ...req.body }
        
        if(req.params.id) software.soft_id = req.params.id
        
        try {
            existsOrError(software.soft_nome, 'Nome não informado')
        } catch(msg) {  
            return res.status(400).send(msg)
        }

        try{
            const softwareFromDB = await app.db('softwares') // acessa a tabela
                .where({ soft_nome: software.soft_nome }).first()

            if(!software.soft_id) {
                notExistsOrError(softwareFromDB, 'Software já cadastrado')
            }
        
        } 
        catch(msg) {
            return res.status(400).send(msg)
        }
        
        if(software.soft_id) {
            app.db('softwares')
                .update(software)
                .where({ soft_id: req.params.id })
                .then(_ => res.status(204).send()) // Status 204 deu tudo certo se chegar aqui
                .catch(err => res.status(500).send(err)) // Se cair aqui, foi por causa de algum erro 
        }
        else { // Se o soft_id não esteja na tabela, aqui faz a inserção
            software.soft_qtd = 0
            app.db('softwares')
                .insert(software)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }  
    }

    const get = (req, res) => { // vai pegar todos os usuarios do sistema, na parte dos artigos já tem então pode implementar a paginação para usuario e categoria 
        app.db('softwares')
            .select('soft_id', 'soft_nome', 'soft_qtd')
             // .whereNull('deletedAt') // Significa que esse campo deve ser nullos, pra significar quando for exclusão logica
            .then(softwares => res.json(softwares)) // Se vier os softwares, deu certo
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const getById = (req, res) => { // vai pegar todos os usuarios do sistema, na parte dos artigos já tem então pode implementar a paginação para usuario e categoria 
        app.db('softwares')
            .select('soft_id', 'soft_nome', 'soft_qtd') // Vai trazer esses dados
            .where({ soft_id: req.params.id }) // vai pegar o soft_id selecionado na URL
            //.whereNull('deletedAt')
            .first()
            .then(software => res.json(software))
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código de Software não informado.')

            const tipo_software = await app.db('tipos_softwares')
                .where({ tipo_soft_id: req.params.id})
            notExistsOrError(tipo_software, 'Existem Tipos Softwares cadastrados.')

            const rowsDeleted = await app.db('softwares')
                .where({ soft_id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Software não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }
    return { save, get, getById, remove }
}