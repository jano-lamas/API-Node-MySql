const express = require('express');
const { registerCtrl, loginCtrl } = require('../controllers/auth');
const { validatorRegister, validatorLogin } = require('../validators/auth');
const router = express.Router();



// TODO http://localhost:3005/api/auth/login
// TODO http://localhost:3005/api/auth/register


/**
 * Route register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          sumary: "Registrar nuevo usuario"
 *          description: "Esta ruta es para registrar un nuevo usuario"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                  '201':
 *                      description: "Usuario registrado de manera correcta"
 *                  '403':
 *                      description: "Error por validacion"
 *              
 */                    
router.post('/register', validatorRegister, registerCtrl);

router.post('/login', validatorLogin, loginCtrl);


module.exports = router;