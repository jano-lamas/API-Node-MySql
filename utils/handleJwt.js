const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require('../utils/handlePropertiesEngine');
const propertiesKey = getProperties();

/**
 * Debes de pasar el objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user) => {

    const sign = jwt.sign(
        {
            [propertiesKey.id]: user[propertiesKey.id],
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h", // 1m es un minuto
        }
    )
        return sign;
}

/**
 * Debe de pasar el token de sesion el JWT
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
    try {
        
        return jwt.verify(tokenJwt, JWT_SECRET);
    } catch (error) {
        console.log("Error: " , error);
        return null;
    }
}

module.exports = { tokenSign, verifyToken };