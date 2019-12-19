module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const invent = { ...req.body }

        if (req.params.id) invent.inv_id = req.params.id
        try {
            existsOrError(invent.inv_disp_id, 'Selecione um Dispositivo')
            existsOrError(invent.inv_uni_id, 'Selecione uma Unidade')
        } catch (msg) {
            return res.status(400).send(msg)
        }
        delete (invent.inv_soft_id)
        console.log(invent)
        if (invent.inv_id) {

            if (invent.inv_tipo_id > 0) {
                try { // Verifica se existe chaves iguais  
                    var inv_id = 0
                    const retiraBancoTipoSoftId = await app.db('inventario').select('inv_tipo_id').where({ inv_tipo_id: invent.inv_tipo_id })
                    const retiraBancoInvId = await app.db('inventario').select('inv_id').where({ inv_tipo_id: invent.inv_tipo_id })
                    if (Object.keys(retiraBancoInvId).length <= 1 && Object.keys(retiraBancoTipoSoftId).length <= 1) {
                        if (Object.keys(retiraBancoInvId).length == 1) {
                            inv_id = retiraBancoInvId[0].inv_id
                            if (inv_id != invent.inv_id)
                                notExistsOrError(retiraBancoTipoSoftId, 'Chave Serial já cadastrada')

                        }
                    }
                    else notExistsOrError(retiraBancoTipoSoftId, 'Chave Serial já cadastrada')
                }
                catch (msg) {
                    return res.status(400).send(msg)
                }

            }
            app.db('inventario')
                .update(invent)
                .where({ inv_id: req.params.id })
                .then(_ => res.status(204).send()) // Status 204 deu tudo certo se chegar aqui
                .catch(err => res.status(500).send(err)) // Se cair aqui, foi por causa de algum erro 
        }
        else {
            if (invent.inv_tipo_id != null) {
                try { // Verifica se existe chaves iguais
                    const inventoryFromDB = await app.db('inventario') // acessa a tabela                
                        .where({ inv_tipo_id: invent.inv_tipo_id }).first()

                    if (invent.inv_tipo_id) {
                        notExistsOrError(inventoryFromDB, 'Chave Serial já cadastrada')
                    }
                }
                catch (msg) {
                    return res.status(400).send(msg)
                }
            }

            app.db('inventario')
                .insert(invent)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => { // vai pegar todos os usuarios do sistema, na parte dos artigos já tem então pode implementar a paginação para usuario e categoria 
        app.db('inventario')
            .innerJoin('unidades', 'inv_uni_id', 'uni_id')
            .innerJoin('dispositivos', 'inv_disp_id', 'disp_id')
            .innerJoin('tipos_dispositivos', 'disp_tipo_id', 'tipo_disp_id')
            .leftJoin('tipos_softwares', 'inv_tipo_id', 'tipo_id')  // leftJoin pq não é obrigatorio adicionar esse campo
            .leftJoin('softwares', 'tipo_soft_id', 'soft_id')
            .select('inv_id', 'inv_descricao', 'inv_disp_id', 'inv_tipo_id', 'inv_user', 'inv_uni_id', 'inv_setor', 'uni_nome', 'disp_id', 'tipo_key', 'soft_id', 'soft_nome', 'tipo_disp_nome')
            // .whereNull('deletedAt') // Significa que esse campo deve ser nullos, pra significar quando for exclusão logica
            // Se vier os softwares, deu certo
            .then(invent => res.json(invent))
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const getById = (req, res) => { // vai pegar todos os usuarios do sistema, na parte dos artigos já tem então pode implementar a paginação para usuario e categoria 
        app.db('inventario')
            .innerJoin('unidades', 'inv_uni_id', 'uni_id')
            .innerJoin('dispositivos', 'inv_disp_id', 'disp_id')
            .innerJoin('tipos_dispositivos', 'disp_tipo_id', 'tipo_disp_id')
            .leftJoin('tipos_softwares', 'inv_tipo_id', 'tipo_id')
            .leftJoin('softwares', 'tipo_soft_id', 'soft_id')
            .select('inv_id', 'inv_descricao', 'inv_disp_id', 'inv_tipo_id', 'inv_user', 'inv_uni_id', 'inv_setor', 'uni_nome', 'disp_id', 'tipo_key', 'soft_id', 'soft_nome', 'tipo_disp_nome')
            .where({ inv_id: req.params.id }) // vai pegar o soft_id selecionado na URL
            //.whereNull('deletedAt')
            .first()
            .then(invent => res.json(invent))
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do inventario não informado.')

            const rowsDeleted = await app.db('inventario')
                .where({ inv_id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Inventario não encontrado.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}