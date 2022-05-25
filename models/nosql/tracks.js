const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const TracksSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        album: {
            type: String
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true
                },
                message: "ERROR_URL",
            },
        },
        artist: {
            name: {
                type: String,
            },
            nickname: {
                type: String,
            },
            nationality: {
                type: String,
            },
        },
        duration: {
            start: {
                type: Number
            },
            end: {
                type: Number
            },
        },
        mediaId: {
            type: mongoose.Types.ObjectId,
        }
    },
    {
        timestamps: true, // REGISTRA TODO createdAt, updateAt
        versionKey: false,
    }
);

/**
 * Implementar metodo propio con relacion a storage
 */

TracksSchema.statics.findAllData = function () {
    const joinData = this.aggregate([ // TODO Tracks
        {
            $lookup: {
                from: "storages", // Hacemos relacion de tracks con storages -- tracks --> storages
                localField: "mediaId", // Tracks.mediaId 
                foreignField: "_id",  // Relacionamos con storages._id
                as: "foto",  // este es nuestro alias audio
            },
        }, {
            $unwind: "$foto"
        }
    ]);
    return joinData
};

TracksSchema.statics.findOneData = function (id) {
    const joinData = this.aggregate([ // TODO Tracks
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "storages", // Hacemos relacion de tracks con storages -- tracks --> storages
                localField: "mediaId", // Tracks.mediaId 
                foreignField: "_id",  // Relacionamos con storages._id
                as: "foto",  // este es nuestro alias audio
            },
        },
        {
            $unwind: "$foto"
        }
    ]);
    return joinData
};

TracksSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tracks", TracksSchema);