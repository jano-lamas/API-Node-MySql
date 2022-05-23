const { check, validationResult } = require("express-validator");
const validateResult = require("../utils/handlerValidator");


const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty(),
    (req,res,next) => validateResult(req,res,next)
]

module.exports = { validatorGetItem };