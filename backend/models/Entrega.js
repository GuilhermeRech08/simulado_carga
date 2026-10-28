const {DataTypes}= require('sequelize')
const db = require('../db/conn')

const Entrega = db.define('entrega', {
    codEntrega: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idCarga: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'codCarga',
            model: 'cargas'
        }
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("ENTREGUE", "TANSITO"),
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'entregas'
})

module.exports = Entrega