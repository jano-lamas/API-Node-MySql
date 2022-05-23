const express = require('express');
const { registerCtrl, loginCtrl } = require('../controllers/auth');
const { validatorRegister, validatorLogin } = require('../validators/auth');
const router = express.Router();



// TODO http://localhost:3005/api/auth/login
// TODO http://localhost:3005/api/auth/register

router.post('/register', validatorRegister, registerCtrl);

router.post('/login', validatorLogin, loginCtrl);


module.exports = router;