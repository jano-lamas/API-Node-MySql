const { sequelize } = require('../../config/mysql');
const { DataTypes } = require("sequelize");
const Storage = require('./storage');
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

/**
 * Implementando modelo personalizado
 */
/*
Tracks.findAllData = function () {
    Tracks.belongsTo(Storage, {
        foreignKey:'mediaId',
        as:'foto'
    })

    return Tracks.findAll({include:'foto'})
};
*/
Tracks.findOneData = function (id) {
    Tracks.belongsTo(Storage, {
        foreignKey:'mediaId',
        as:'foto'
    })

    return Tracks.findOne({where: {id}, include: 'foto'})
};

module.exports = Tracks;