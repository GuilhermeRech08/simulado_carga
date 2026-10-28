const Motorista = require('../models/Motorista')
const cryptoJS = require('crypto-js')

const cadastrar = async(req, res) => {
    const valores = req.body

    if(!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }

    try{
        let cpfCripto = cryptoJS.AES.encrypt(valores.cpf, "senha").toString
        let cnhCripto = cryptoJS.AES.encrypt(valores.cnh, "senha").toString

        Motorista.create({
            nome: valores.nome,
            cpf: cpfCripto,
            cnh: cnhCripto,
            telefone: valores.telefone
        })

        res.status(201).json({message: 'Motorista cadastrado com sucesso!'})
    }catch(err){
        res.status(500).json({message: 'Não foi possível cadastrar o motorista'})
        console.error('Não foi possível cadastrar o motorista', err)
    }
}

const listar = async(req, res) => {
    try{
        let motoristas = await Motorista.findAll()
        motoristas.forEach(el => {
            el.cnh = cryptoJS.AES.decrypt(el.cnh, "senha").toString(cryptoJS.enc.Utf8)
            el.cpf = cryptoJS.AES.decrypt(el.cpf, "senha").toString(cryptoJS.enc.Utf8)
        })
        return res.status(200).json(motoristas)
    }catch(err){
        res.status(500).json({message: 'Não foi possível listar os motoristas'})
        console.error('Não foi possível listar os motoristas', err)
    }
}

const buscar = async(req, res) => {
    const id = req.params.id

    if(!id){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }

    try{
        let motorista = await Motorista.findByPk(id)

        if(!motorista){
            return res.status(404).json({message: 'Não foi possível achar o motorista!'})
        }
    
        motorista.cnh = cryptoJS.AES.decrypt(motorista.cnh, "senha").toString(cryptoJS.enc.Utf8)
        motorista.cpf = cryptoJS.AES.decrypt(motorista.cpf, "senha").toString(cryptoJS.enc.Utf8)

        return res.status(200).json(motorista)
    }catch(err){
        res.status(500).json({message: 'Não foi possível consultar o motorista'})
        console.error('Não foi possível consultar o motorista', err)
    }
}

const buscarNome = async(req, res) => {
    const nome = req.params.nome

    if(!nome){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }

    try{
        let motorista = await Motorista.findOne({where: {nome: nome}})
        
        if(!motorista){
            return res.status(404).json({message: 'Não foi possível achar o motorista!'})
        }

        motorista.cnh = cryptoJS.AES.decrypt(motorista.cnh, "senha").toString(cryptoJS.enc.Utf8)
        motorista.cpf = cryptoJS.AES.decrypt(motorista.cpf, "senha").toString(cryptoJS.enc.Utf8)

        return res.status(200).json(motorista)
    }catch(err){
        res.status(500).json({message: 'Não foi possível consultar o nome do motorista'})
        console.error('Não foi possível consultar o nome do motorista', err)
    }
}

const atualizar = async(req, res) => {
    let valores = req.body
    let id = req.params.id

    if(!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }

    try{
        const motorista = await Motorista.findByPk(id)
        if(!motorista){
            return res.status(404).json({message: 'Não foi possível encontrar o motorista!'})
        }

        let cpfCripto = cryptoJS.AES.encrypt(valores.cpf, "senha").toString
        let cnhCripto = cryptoJS.AES.encrypt(valores.cnh, "senha").toString

        await motorista.update({
            nome: valores.nome,
            cpf: cpfCripto,
            cnh: cnhCripto,
            telefone: valores.telefone
        })

        res.status(200).json(motorista)
    }catch(err){
        res.status(500).json({message: 'Não foi possível atualizar o motorista'})
        console.error('Não foi possível atualizar o motorista', err)
    }
}

const deletar = async(req, res) => {
    const id = req.params.id

    try{    
        const motorista = await motorista.findByPk(id)

        if(!motorista){
            return res.status(404).json({message: 'Não foi possível achar o motorista!'})
        }

        await motorista.destroy()

        res.status(200).json({message: 'Motorista deletado com sucesso!'})
    }catch(err){
        res.status(500).json({message: 'Não foi possível deletar o motorista'})
        console.error('Não foi possível deletar o motorista', err)
    }
}

module.exports = {cadastrar, listar, buscar, buscarNome, atualizar, deletar}