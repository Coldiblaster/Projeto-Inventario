module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => { // Salva e altera
        const unidade = { ...req.body }
        
        if(req.params.id) unidade.uni_id = req.params.id

        try {
            existsOrError(unidade.uni_nome, 'Insira o Nome ')
            existsOrError(unidade.uni_cep, 'Insira o Cep')
            existsOrError(unidade.uni_endereco, 'Insira o Endereço')
            existsOrError(unidade.uni_bairro, 'Insira o Bairro')
            existsOrError(unidade.uni_cidade, 'Insira a Cidade')
            existsOrError(unidade.uni_telefone, 'Insira o Telefone')
        } catch(msg) {  
            return res.status(400).send(msg)
        }
        
        if(unidade.uni_id) {
            app.db('unidades')
                .update(unidade)
                .where({ uni_id: req.params.id })
                .then(_ => res.status(204).send()) // Status 204 deu tudo certo se chegar aqui
                .catch(err => res.status(500).send(err)) // Se cair aqui, foi por causa de algum erro 
        }
        else { 
            app.db('unidades')
                .insert(unidade)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }   
    }
    
    //select campos ... tipos_softwares inner join softwares on tipo_soft_id = soft_id 
    const get = (req, res) => { // vai pegar todos os usuarios do sistema, na parte dos artigos já tem então pode implementar a paginação para usuario e categoria 
        app.db('unidades')
            .select('uni_id', 'uni_nome', 'uni_cep', 'uni_endereco', 'uni_bairro', 'uni_cidade', 'uni_telefone', 'uni_cnpj')
             // .whereNull('deletedAt') // Significa que esse campo deve ser nullos, pra significar quando for exclusão logica
            .then(unidade => res.json(unidade)) // Se vier os softwares, deu certo
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const getById = (req, res) => { 
        app.db('unidades')
        .select('uni_id', 'uni_nome', 'uni_cep', 'uni_endereco', 'uni_bairro', 'uni_cidade', 'uni_telefone', 'uni_cnpj')// Vai trazer esses dados
            .where({ uni_id: req.params.id }) // vai pegar o soft_id selecionado na URL
            //.whereNull('deletedAt')
            .first()
            .then(unidade => res.json(unidade))
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const remove = async (req, res) => {
        try {
            const inventario = await app.db('inventario')
            .where({ inv_id: req.params.id})
                notExistsOrError(inventario, 'Existe unidade vinculada ao Inventário.')
        
            const rowsDeleted = await app.db('unidades')
                .where({ uni_id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Unidade não encontrada.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}