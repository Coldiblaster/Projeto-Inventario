module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    
    const save = async (req, res) => { // Salva e altera
        const disp = { ...req.body }

        if(req.params.id) disp.disp_id = req.params.id
        
        try {
            existsOrError(disp.disp_tipo_id, 'Tipo dispositivo não informado')
        } catch(msg) {  
            return res.status(400).send(msg)
        }

        if(disp.disp_id) {
            app.db('dispositivos')
                .update(disp)
                .where({ disp_id : req.params.id })
                .then(_ => res.status(204).send()) // Status 204 deu tudo certo se chegar aqui
                .catch(err => res.status(500).send(err)) // Se cair aqui, foi por causa de algum erro 
        }
        else { 
            app.db('dispositivos')
                .insert(disp)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }   
    }

    const get = (req, res) => { // vai pegar todos os usuarios do sistema, na parte dos artigos já tem então pode implementar a paginação para usuario e categoria 
        app.db('dispositivos').innerJoin('tipos_dispositivos', 'disp_tipo_id', 'tipo_disp_id')
            .select('disp_id', 'disp_patrimonio', 'disp_num_serial', 'disp_marca', 'disp_tipo_id', 'disp_descricao', 'tipo_disp_nome')
             // .whereNull('deletedAt') // Significa que esse campo deve ser nullos, pra significar quando for exclusão logica
            .then(disp => res.json(disp)) // Se vier os softwares, deu certo
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const getById = (req, res) => { // vai pegar todos os usuarios do sistema, na parte dos artigos já tem então pode implementar a paginação para usuario e categoria 
        app.db('dispositivos')
            .select('disp_id', 'disp_patrimonio', 'disp_num_serial', 'disp_marca', 'disp_tipo_id', 'disp_descricao', 'tipo_disp_nome') // Vai trazer esses dados
            .where({ disp_id: req.params.id }) // vai pegar o soft_id selecionado na URL
            //.whereNull('deletedAt')
            .first()
            .then(disp => res.json(disp))
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código de Dispositivo não encontrado.')

            const inventario = await app.db('inventario')
                .where({ inv_disp_id: req.params.id})
            notExistsOrError(inventario, 'Existem Dispositivos vinculados ao Inventário.')

            const rowsDeleted = await app.db('dispositivos')
                .where({ disp_id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Dispositivo não encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}