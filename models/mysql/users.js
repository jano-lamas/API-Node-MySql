const { sequelize } = require('../../config/mysql');
const { DataTypes } = require("sequelize");

const User = sequelize.define(
    "users", // Este es exactamente el nombre de la tabla o en mongo seria de la coleccion
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.NUMBER,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM(["user", "admin"]),
        },
    },
    {
        timestamps: true, // establecemos confi para indicar que nos guarde create y update
    }
);

module.exports = User;