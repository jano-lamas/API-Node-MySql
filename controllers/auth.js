const { matchedData } = require('express-validator');
const { encrypt, compare } = require('../utils/handlerPAssword');
const { tokenSign } = require('../utils/handleJwt');
const { handleHttpError } = require('../utils/handleErros');
const { usersModel } = require('../models');

/**
 * Este controlado es el encargo de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const passwordHash = await encrypt(req.password)
        const body = { ...req, password: passwordHash };
        const dataUser = await usersModel.create(body);
        dataUser.set('password', undefined, { strinct: false });  // seteamos para que no devolvamos nuestro password hasheado 

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.status(201);
        res.send({ data })
    } catch (error) {
        // handleHttpError(res,"ERROR_REGISTER_USER")
        console.log("Error:", error);
        res.send({ "Error": error });
    }
}
/**
 * Este controlador es el encargado de logear a una persona
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        // Primero buscamos el usuario en la BD y esto lo hacemos por email 
        const user = await usersModel.findOne({ where: {email: req.email }})//.select('password name role email'); // indicamos con .select que aplique un filtro y si traiga password, etc
        // Vamos hacer una validacion si no existe el usuarios
        if (!user) {
            handleHttpError(res, "USER_NOT_EXIST", 404);
            return;
        }

        const hashPassword = user.get('password'); // obtenemos el password hasheado del usuario

        // Ahora vamos a crear una constante y usamos nuestra funcion compare donde pasamos la pass encriptada y sin encriptar.
        const chek = await compare(req.password, hashPassword);  // esto devolvera tru o false

        // si devuelve false , entonces tiramos error de password invalid
        if (!chek) {
            handleHttpError(res, "PASSWORD_INVALID", 401);
            return;
        }
        //la propiedad de password la ponemos como undefined y que sea estricto para no mostrar el password
        user.set('password', undefined, {strict:false});
        // si pasa esto devolvemos un token de sesion y la data de usuario
        const data = {
            token: await tokenSign(user),
            user// esto lo podemos dejar asi ya que devolvemos el objeto con mismo nombre user
        }

        res.send({ data });


    } catch (error) {
        console.log("Error:", error);
        handleHttpError(res, "ERROR_LOGIN_USER")
        //  res.send({ "Error": error });
    }
}

module.exports = { registerCtrl, loginCtrl };