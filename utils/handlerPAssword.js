const bcryptjs = require('bcryptjs');

/**
 * contraseña sin enciptar : hola.01
 */

const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10); //Esto devuelve la version encriptada de nuestro pass  : "43ooode.$EFEfeffef"
    return hash;
}
/**
 * Pasar contraseña sin encriptar y pasar contraseña encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async (passwordPlain, hashPassword) => {

    return await bcryptjs.compare(passwordPlain, hashPassword);
}

module.exports = { encrypt, compare };