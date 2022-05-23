const { sequelize } = require('../../config/mysql');
const { DataTypes } = require("sequelize");

const Tracks = sequelize.define(
    "tracks", // Este es exactamente el nombre de la tabla o en mongo seria de la coleccion
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        album: {
            type: DataTypes.STRING,
        },
        cover: {
            type: DataTypes.STRING,
        },
        artist_name: {
            type: DataTypes.STRING,
        },
        artist_nickname: {
            type: DataTypes.STRING,
        },
        artist_nationality: {
            type: DataTypes.STRING,
        },
        duration_start: {
            type: DataTypes.NUMBER,
        },
        duration_end: {
            type: DataTypes.NUMBER,
        },
        mediaId: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true, // establecemos confi para indicar que nos guarde create y update
    }
);

module.exports = Tracks;