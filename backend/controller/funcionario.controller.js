const Funcionario = require('../models/Funcionario')
const cryptoJS = require('crypto-js')

const cadastrar = async(req, res) => {
    const valores = req.body

    if(!valores.nome || !valores.email || !valores.senha){
        return res.status(400).json({message: 'Preencha todos os campos!'})
    }

    try{
        let senhaCripto = cryptoJS.AES.encrypt(valores.senha, "senha").toString()

        Funcionario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto
        })

        res.status(201).json({message: 'Funcionario cadastrado com sucesso!'})
    }catch(err){
        res.status(500).json({message: 'Não foi possível cadastrar o funcionario'})
        console.error('Não foi possível cadastrar o funcionario', err)
    }
}

module.exports = {cadastrar}