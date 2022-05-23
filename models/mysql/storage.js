const { sequelize } = require('../../config/mysql');
const { DataTypes } = require("sequelize");

const Storage = sequelize.define(
    "storages", // Este es exactamente el nombre de la tabla o en mongo seria de la coleccion
    {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: true, // establecemos confi para indicar que nos guarde create y update
    }
);

module.exports = Storage;