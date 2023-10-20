const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Venda = db.define('Venda', {
    cliente: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataHora: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    modoPagamento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    faturado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Padrão é "não faturado"
    },
});

module.exports = Venda;
