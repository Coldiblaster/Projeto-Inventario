module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => { // Salva e altera
        const disp = { ...req.body }
        const tipo_disp_id = disp.disp_tipo_id
        const tipo_disp_qtd = 0
        if (req.params.id) disp.disp_id = req.params.id

        try {
            existsOrError(disp.disp_tipo_id, 'Tipo dispositivo não informado')
            if (disp.disp_patrimonio != null) {
                const DispFromDB = await app.db('dispositivos') // acessa a tabela
                    .where({ disp_patrimonio: disp.disp_patrimonio }).first()

                if (!disp.disp_id) {
                    notExistsOrError(DispFromDB, 'Patrimônio existente')
                }
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        delete (disp.tipo_disp_nome)
        const tipo = { tipo_disp_id, tipo_disp_qtd }
        if (disp.disp_id) {
            const dispositivo_anterior = await app.db('dispositivos').select('disp_tipo_id').where({ disp_id: req.params.id })
            const disp_anterior = dispositivo_anterior[0].disp_tipo_id

            if (disp_anterior != disp.disp_tipo_id) {
                app.db('tipos_dispositivos') // VAI REMOVER 1 SOFTWARE NA SOMA TOTAL 
                    .update(tipo)
                    .where({ tipo_disp_id: disp_anterior })
                    .decrement('tipo_disp_qtd', 1)
                    .catch(err => res.status(500).send(err))

                app.db('tipos_dispositivos') //Adiciona 1 do soft qtd
                    .update(tipo)
                    .where({ tipo_disp_id: tipo_disp_id })
                    .increment('tipo_disp_qtd', 1)
                    .catch(err => res.status(500).send(err))
            }

            app.db('dispositivos')
                .update(disp)
                .where({ disp_id: req.params.id })
                .then(_ => res.status(204).send()) // Status 204 deu tudo certo se chegar aqui
                .catch(err => res.status(500).send(err)) // Se cair aqui, foi por causa de algum erro 
        }
        else {
            app.db('dispositivos')
                .insert(disp)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

            app.db('tipos_dispositivos')
                .update(tipo)
                .where({ tipo_disp_id: tipo_disp_id })
                .increment('tipo_disp_qtd', 1)
                .then(_ => res.status(204).send()) // Status 204 deu tudo certo se chegar aqui
                .catch(err => res.status(500).send(err))

        }
    }

    const get = (req, res) => { // vai pegar todos os usuarios do sistema, na parte dos artigos já tem então pode implementar a paginação para usuario e categoria 
        app.db('dispositivos').innerJoin('tipos_dispositivos', 'disp_tipo_id', 'tipo_disp_id')
            .select('disp_id', 'disp_patrimonio', 'disp_marca', 'disp_tipo_id', 'disp_descricao', 'tipo_disp_nome', 'disp_nf', 'disp_proc', 'disp_ram',
                'disp_hd', 'disp_host', 'disp_ip', 'disp_mac', 'disp_tipolicenca_so', 'disp_modelo', 'disp_imei'
            )
            // .whereNull('deletedAt') // Significa que esse campo deve ser nullos, pra significar quando for exclusão logica
            .then(disp => res.json(disp)) // Se vier os softwares, deu certo
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const getById = (req, res) => { // vai pegar todos os usuarios do sistema, na parte dos artigos já tem então pode implementar a paginação para usuario e categoria 
        app.db('dispositivos').innerJoin('tipos_dispositivos', 'disp_tipo_id', 'tipo_disp_id')
            .select('disp_id', 'disp_patrimonio', 'disp_marca', 'disp_tipo_id', 'disp_descricao', 'tipo_disp_nome', 'disp_nf', 'disp_proc', 'disp_ram',
                'disp_hd', 'disp_host', 'disp_ip', 'disp_mac', 'disp_tipolicenca_so', 'disp_modelo', 'disp_imei'
            )
            .where({ disp_id: req.params.id }) // vai pegar o soft_id selecionado na URL
            //.whereNull('deletedAt')
            .first()
            .then(disp => res.json(disp))
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const remove = async (req, res) => {
        try {
            const tipo_s = await app.db('dispositivos').select('disp_tipo_id').where({ disp_id: req.params.id })
            const tipo_disp_id = tipo_s[0].disp_tipo_id
            const tipo_disp_qtd = 0
            const tipo = { tipo_disp_id, tipo_disp_qtd }

            existsOrError(req.params.id, 'Código de Dispositivo não encontrado.')

            const inventario = await app.db('inventario')
                .where({ inv_disp_id: req.params.id })
            notExistsOrError(inventario, 'Existem Dispositivos vinculados ao Inventário.')

            const rowsDeleted = await app.db('dispositivos')
                .where({ disp_id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Dispositivo não encontrado.')

            app.db('tipos_dispositivos') // VAI REMOVER 1 SOFTWARE NA SOMA TOTAL 
                .update(tipo)
                .where({ tipo_disp_id: tipo_disp_id })
                .decrement('tipo_disp_qtd', 1)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
                
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}