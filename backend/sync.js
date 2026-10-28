const {Carga, Motorista, Entrega} = require('./models/rel')
const Funcionario = require('./models/Funcionario')
const conn = require('./db/conn')

async function syncDataBase() {
    try{
        await conn.sync({force: true})
        console.log('Sincronizando tabelas!')
    }catch(err){
        console.error('Não foi possível sincronizar tabelas!', err)
    }finally{
        await conn.close()
        console.log('Fechando tabelas!')
    }
}

syncDataBase()