const cryptoJS = require('crypto-js')

const authMiddleware = async(req, res) => {
    const token = req.headers['authorization']

    if(!token){
        return res.status(400).json({message: 'Não foi possível usar este token!'})
    }

    try{
        const bytes = cryptoJS.AES.decrypt(token, "senha").toString(cryptoJS.enc.Utf8)

        if(!bytes){
            return res.status(400).json({message: 'Usuário não autorizado!'})
        }

        const tokenDescriptografado = JSON.parse(bytes)

        if(!tokenDescriptografado){
            return res.status(400).json({message: 'usuario não autenticado'})
        }

        if(tokenDescriptografado.expiraEm < Date.now()){
            return res.status(401).json({message: 'Token expirado!'})
        }   
    }catch(err){
        res.status(500).json({message: 'Não foi possível autenticar'})
        console.error('não foi possível autenticar', err)
    }
}

module.exports = authMiddleware