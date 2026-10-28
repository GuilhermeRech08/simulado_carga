const Entrega = require('../models/Entrega')
const Carga = require('../models/Carga')

const cadastrar = async(req, res) => {
    const valores = req.body

    if(!valores.cidade || !valores.status || !valores.data || !valores.hora || !valores.idCarga){
        return res.status(400).json({message: 'Prencha todos os campos!'})      
    }

    try{
        let carga = await Carga.findByPk(idCarga)
        if(!carga){
            return res.status(404).json({message: 'Não foi possível achar a carga'})
        }

        await Entrega.create({
            cidade: valores.cidade,
            status: valores.status,
            data: new Date(data),
            hora: valores.hora,
            idCarga: valores.idCarga
        })

        return res.status(201).json({message: 'Entrega cadastrada com sucesso!'})
    }catch(err){
        res.status(500).json({message: 'Não foi possível cadastrar a entrega'})
        console.error('Não foi possível cadastrar a entrega', err)
    }
}

const listar = async(req, res) => {
    try{
        const entrega = await Entrega.findAll({
            include: [
                {
                    model: Carga,
                    as: 'entregaCarga',
                    attributes: ['codCarga', 'descricao']
                }
            ],
            order: [
                ['data', 'hora', 'ASC']
            ]
        })
        return res.status(200).json(entrega)
    }catch(err){
        res.status(500).json({message: 'Não foi possível listar a entrega'})
        console.error('Não foi possível listar a entrega', err)
    }
}

module.exports = {cadastrar, listar}