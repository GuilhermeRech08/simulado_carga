const Motorista = require('../models/Motorista')
const Carga = require('../models/Carga')

const cadastrar = async(req, res) => {
    const valores = req.body

    if(!valores.descricao || !valores.peso || !valores.volume || !valores.idRastreio || !valores.idMotorista){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }

    try{
        let motorista = await Motorista.findByPk(id)
        if(!motorista){
            return res.status(400).json({message: 'Motorista não encntrado!'})
        }

        Carga.create({
            descricao: valores.descricao,
            peso: valores.peso,
            volume: valores.volume,
            idRastreio: valores.idRastreio,
            idMotorista: valores.idMotorista
        })

        res.status(201).json({message: 'Carga cadastrada com sucesso!'})
    }catch(err){
        res.status(500).json({message: 'Não foi possível cadastrar a carga'})
        console.error('Não foi possível cadastrar a carga', err)
    }
}

module.exports = {cadastrar}