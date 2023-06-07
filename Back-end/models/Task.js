const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Task = db.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    done: {
        type: DataTypes.BOOLEAN,
    },
    periodo: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Valor constante que você deseja definir
    },
});

module.exports = Task;
