const { check, validationResult } = require("express-validator");
const validateResult = require("../utils/handlerValidator");

const validatorCreateItem = [
    check("name")
    .exists()
    .notEmpty()
    .isLength({min:5, max:100}),
    check("album")
    .exists()
    .notEmpty(),
    check("cover")
    .exists()
    .notEmpty(),
    check("artist.name")
    .exists()
    .notEmpty(),
    check("artist.nickname")
    .exists()
    .notEmpty(),
    check("artist.nationality")
    .exists()
    .notEmpty(),
    check("duration.start")
    .exists()
    .notEmpty(),
    check("duration.end")
    .exists()
    .notEmpty(),
    check("mediaId")
    .exists()
    .notEmpty(),
    (req,res,next) => validateResult(req,res,next)
]

const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty(),
    (req,res,next) => validateResult(req,res,next)
]

module.exports = { validatorCreateItem, validatorGetItem };