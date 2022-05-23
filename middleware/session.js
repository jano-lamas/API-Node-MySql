const { verifyToken } = require('../utils/handleJwt');
const { handleHttpError } = require('../utils/handleErros');
const { usersModel } = require('../models');
const getProperties = require('../utils/handlePropertiesEngine');
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
    try {
        //vamos a capturar un token que es la autorizacion , que sacamos del encabezado 
        if (!req.headers.authorization) {
            handleHttpError(res, "NEED_SESSION", 401);
            return
        }

        var token = req.headers.authorization //TODO Bearer 232sad3asd...
        token = token.split(' ').pop(); // aca indicamos que nos separe el strin por el espacio y nos dejamos solo el token sin el Bearer
        console.log("token: ", token);
        const dataToken = await verifyToken(token);

        if (!dataToken) {
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
            return
        }

        const query = {
            [propertiesKey.id]: dataToken[propertiesKey.id]
        }

        const user = await usersModel.findOne(query);
        req.user = user;
        next();
    } catch (error) {
        handleHttpError(res, "NOT_SESSION", 401);
    }
}

module.exports = authMiddleware;