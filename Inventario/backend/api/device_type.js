module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => { // Salva e altera
        const disp = { ...req.body }

        if(req.params.id) disp.tipo_disp_id = req.params.id
        
        try {
            existsOrError(disp.tipo_disp_nome, 'Nome não informado')
        } catch(msg) {  
            return res.status(400).send(msg)
        }
  
        if(disp.tipo_disp_id) {
            app.db('tipos_dispositivos')
                .update(disp)
                .where({ tipo_disp_id: req.params.id })
                .then(_ => res.status(204).send()) // Status 204 deu tudo certo se chegar aqui
                .catch(err => res.status(500).send('err')) // Se cair aqui, foi por causa de algum erro 
        }
        else { // Se o soft_id não esteja na tabela, aqui faz a inserção
            try{ // Verifica se existe chaves iguais
                const typedeviceFromDB = await app.db('tipos_dispositivos') // acessa a tabela
                .where({ tipo_disp_nome: disp.tipo_disp_nome }).first()
    
                if(disp.tipo_disp_nome) {
                    notExistsOrError(typedeviceFromDB, 'Dispositivo já cadastrada')
                }
            } 
            catch(msg) {
                return res.status(400).send(msg)
            }

            disp.tipo_disp_qtd = 0
            app.db('tipos_dispositivos')
                .insert(disp)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }  
    }

    const get = (req, res) => { // vai pegar todos os usuarios do sistema, na parte dos artigos já tem então pode implementar a paginação para usuario e categoria 
        app.db('tipos_dispositivos')
            .select('tipo_disp_id', 'tipo_disp_nome', 'tipo_disp_qtd')
            .orderBy('tipo_disp_nome')
             // .whereNull('deletedAt') // Significa que esse campo deve ser nullos, pra significar quando for exclusão logica
            .then(tipo_disp => res.json(tipo_disp)) // Se vier os softwares, deu certo
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const getById = (req, res) => { // vai pegar todos os usuarios do sistema, na parte dos artigos já tem então pode implementar a paginação para usuario e categoria 
        app.db('tipos_dispositivos')
            .select('tipo_disp_id', 'tipo_disp_nome', 'tipo_disp_qtd') // Vai trazer esses dados
            .where({ tipo_disp_id: req.params.id }) // vai pegar o soft_id selecionado na URL
            //.whereNull('deletedAt')
            .first()
            .then(tipo_disp => res.json(tipo_disp))
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código de Tipo de Dispositivo não informado.')

            const dispositivo = await app.db('dispositivos')
                .where({ disp_tipo_id: req.params.id})
            notExistsOrError(dispositivo, 'Existem Dispositivos cadastrados.')

            const rowsDeleted = await app.db('tipos_dispositivos')
                .where({ tipo_disp_id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Dispositivo não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }
    return { save, get, getById, remove }
}