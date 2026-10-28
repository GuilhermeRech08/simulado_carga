const cryptoJS = require('crypto-js')
const Funcionario = require('../models/Funcionario')

const login = async(req, res) => {
    const valores = req.body

    try{
        const funcionario = await Funcionario.findOne({where: {email: email}})
        if(!funcionario){
            return res.status(404).json({message: 'Não foi possível achar o funcionario!'})
        }

        if(!valores.email || valores.senha !== cryptoJS.AES.decrypt(funcionario.senha, "senha").toString(cryptoJS.enc.Utf8)){
            return res.status(400).json({message: 'Credenciais inválidas!'})
        }

        const tresHorasEm = 3 * 60 * 60 * 1000
        const tempoExpiracao = Date.now + tresHorasEm

        const token = cryptoJS.AES.encrypt(
            JSON.stringify({
                idFuncionario: funcionario.idFuncionario,
                expiraEm: tempoExpiracao
            }),
            "senha"
        ).toString()

        return res.status({token: token, nome: funcionario.nome})
    }catch(err){
        res.status(500).json({message: 'Não foi possível fazer o login'})
        console.error('Não foi possível fazer o login', err)
    }
}

module.exports = {login}