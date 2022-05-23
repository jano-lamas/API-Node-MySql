const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        age:{
            type: Number
        },
        email:{
            type: String,
            unique: true
        },
        password:{
            type: String,
            select: false // Esto es para que no devuelva nuestro password en la respuesta de creacion de usuario
        },
        role:{
            type: ["users", "admin"],
            default: "user"
        },
    },
    {
        timestamps:true, // REGISTRA TODO createdAt, updateAt
        versionKey:false,
    }
);
UserSchema.plugin(mongooseDelete, {overrideMethods: "all"});
module.exports = mongoose.model("users", UserSchema);