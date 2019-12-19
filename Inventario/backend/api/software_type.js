
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => { // Salva e altera 
        const tipo_s = { ...req.body }
        const soft_id = tipo_s.tipo_soft_id
        const soft_qtd = 0
        if(req.params.id) tipo_s.tipo_id = req.params.id

        try {
            existsOrError(tipo_s.tipo_soft_id, 'Selecione um Software')
            existsOrError(tipo_s.tipo_key, 'Insira a Chave do Software')
            existsOrError(tipo_s.tipo_data_compra, 'Insira a Data da Compra')
        } catch(msg) {  
            return res.status(400).send(msg)
        }

        /* try{ // Verifica se existe chaves iguais
            const chave = await app.db('tipos_softwares').select('tipo_key').where({ tipo_id: req.params.id })
            var n = tipo_s.tipo_key.localeCompare(chave[0].tipo_key);
            if(n === 0) {
                notExistsOrError(chave, 'Chave Serial já cadastrada')
            }
        }
        catch(msg) {
            return res.status(400).send(msg)
        } */

        /*const result = await app.db('softwares').select('soft_qtd').where({ soft_id: soft_id })
        const software = { soft_id,  soft_qtd}

        console.log(result)*/
        const software = { soft_id,  soft_qtd }
        if(tipo_s.tipo_id) {
            const software_anterior = await app.db('tipos_softwares').select('tipo_soft_id').where({ tipo_id: req.params.id })
            const soft_anterior = software_anterior[0].tipo_soft_id

            if(soft_anterior != tipo_s.tipo_soft_id)
            {
                app.db('softwares') // VAI REMOVER 1 SOFTWARE NA SOMA TOTAL 
                .update(software)
                .where({ soft_id: soft_anterior })
                .decrement('soft_qtd', 1) 
                .catch(err => res.status(500).send(err))
                
                app.db('softwares') //Adiciona 1 do soft qtd
                .update(software)
                .where({ soft_id: soft_id })
                .increment('soft_qtd', 1)
                .catch(err => res.status(500).send(err))  
                
            }   
               
            try{ // Verifica se existe chaves iguais  
                var tipoS_id = 0 
                const retiraBancoTipoKey = await app.db('tipos_softwares').select('tipo_key').where({ tipo_key: tipo_s.tipo_key }) 
                const retiraBancoTipoSoft = await app.db('tipos_softwares').select('tipo_id').where({ tipo_key: tipo_s.tipo_key }) 

                if(Object.keys(retiraBancoTipoSoft).length <= 1 && Object.keys(retiraBancoTipoKey).length <= 1)
                {
                    if(Object.keys(retiraBancoTipoSoft).length == 1)
                    {    
                        tipoS_id = retiraBancoTipoSoft[0].tipo_id
                        if(tipoS_id != tipo_s.tipo_id)
                            notExistsOrError(retiraBancoTipoKey, 'Chave Serial já cadastrada')
                        
                    }
                }  
                else notExistsOrError(retiraBancoTipoKey, 'Chave Serial já cadastrada')      
            } 
            catch(msg) {
                return res.status(400).send(msg)
            }
                


            app.db('tipos_softwares') // Alterar o tipo software
            .update(tipo_s)
            .where({ tipo_id: req.params.id })
            .then(_ => res.status(204).send()) // Status 204 deu tudo certo se chegar aqui
            .catch(err => res.status(500).send(err)) // Se cair aqui, foi por causa de algum erro 

        }
        else { 
            try{ // Verifica se existe chaves iguais
                const typesoftwareFromDB = await app.db('tipos_softwares') // acessa a tabela
                .where({ tipo_key: tipo_s.tipo_key }).first()
    
                if(tipo_s.tipo_key) {
                    notExistsOrError(typesoftwareFromDB, 'Chave Serial já cadastrada')
                }
            } 
            catch(msg) {
                return res.status(400).send(msg)
            }
                
            app.db('tipos_softwares')
                .insert(tipo_s)
                .catch(err => res.status(500).send(err))
            
             app.db('softwares')
                .update(software)
                .where({ soft_id: soft_id })
                .increment('soft_qtd', 1)
                .then(_ => res.status(204).send()) // Status 204 deu tudo certo se chegar aqui
                .catch(err => res.status(500).send(err)) 
            

        
        }   
    }

    //select campos ... tipos_softwares inner join softwares on tipo_soft_id = soft_id 
    const get = (req, res) => { // vai pegar todos os usuarios do sistema, na parte dos artigos já tem então pode implementar a paginação para usuario e categoria 
        app.db('tipos_softwares').innerJoin('softwares', 'tipo_soft_id', 'soft_id')
            .select('tipo_id', 'tipo_key', 'tipo_descricao', 'tipo_soft_id', 'tipo_nf', 'tipo_data_compra', 'soft_nome')
             // .whereNull('deletedAt') // Significa que esse campo deve ser nullos, pra significar quando for exclusão logica
            .then(tipo_s => res.json(tipo_s)) // Se vier os softwares, deu certo
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const getById = (req, res) => { 
        app.db('tipos_softwares')
        .select('tipo_id', 'tipo_key', 'tipo_descricao', 'tipo_soft_id', 'tipo_nf', 'tipo_data_compra')// Vai trazer esses dados
            .where({ tipo_id: req.params.id }) // vai pegar o soft_id selecionado na URL
            //.whereNull('deletedAt')
            .first()
            .then(tipo_s => res.json(tipo_s))
            .catch(err => res.status(500).send(err)) //se houver erro
    }

    const remove = async (req, res) => {

        try {
            const tipo_s = await app.db('tipos_softwares').select('tipo_soft_id').where({ tipo_id: req.params.id })
            const soft_id = tipo_s[0].tipo_soft_id
            const soft_qtd = 0
            const software = { soft_id, soft_qtd }

            existsOrError(req.params.id, 'Código do tipo de software não informado.')

            /* const inventario = await app.db('inventario')
                .where({ inv_soft_id: req.params.id }).del()
            existsOrError(inventario, 'Software Vinculado ao Inventário.')    */

            const rowsDeleted = await app.db('tipos_softwares')
                .where({ tipo_id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Software não encontrada.')   
            
            app.db('softwares') // VAI REMOVER 1 SOFTWARE NA SOMA TOTAL 
                .update(software)
                .where({ soft_id: soft_id })
                .decrement('soft_qtd', 1) 
                .then(_ => res.status(204).send()) // Status 204 deu tudo certo se chegar aqui
                .catch(err => res.status(500).send(err))
                
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}