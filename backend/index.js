const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const PORT = 3000
const hostname = 'localhost'

require('./models/rel')

const authController = require('./controller/auth.controller')
const funcionarioController = require('./controller/funcionario.controller')
const motoristaController = require('./controller/motorista.controller')
const cargaController = require('./controller/carga.controller')
const entregaController = require('./controller/entrega.controller')
const authMiddleware = require('./middleware/auth.middleware')

// middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//rotas publicas
app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)

app.use(authMiddleware)
//rotas privadas
app.post('/motorista', motoristaController.cadastrar)
app.get('/motoristas', motoristaController.listar)
app.get('/motorista/:id', motoristaController.buscar)
app.get('/motorista/nome/:nome', motoristaController.buscarNome)
app.put('/motorista/:id', motoristaController.atualizar)
app.delete('/motorista/:id', motoristaController.deletar)

app.post('/carga', cargaController.cadastrar)

app.post('entrega', entregaController.cadastrar)
app.get('/entregas', entregaController.listar)

app.listen(PORT, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${PORT}`)
})