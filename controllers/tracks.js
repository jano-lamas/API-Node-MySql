const { matchedData, body } = require('express-validator');
const res = require('express/lib/response');
const { tracksModel } = require('../models');
const { use } = require('../routes/tracks');
const { handleHttpError } = require('../utils/handleErros');


/**
 * Obtener lista de la base de datos!
 */
const getItems = async (req, res) => {
    try {
        const user = req.user;
        console.log("User: " , user);
        const data = await tracksModel.find({});
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEMS');
    }
};

/**
 * Obtener un detalle de la base de datos!
 */
const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req // Esto es igual a const{id} =req.params
        const data = await tracksModel.findById(id);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEM');
    }
};

/**
 * Crear un detalle 
 */
const createItem = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await tracksModel.create(body);
        res.send({ data });
    } catch (error) {
        console.log("Error: " , error);
        handleHttpError(res, 'ERROR_POST_ITEMS');
    }
};

/**
 * Modificar un detalle 
 */
const updateItems = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req); // Esto devuelve {id:1},{todo el body}
        const data = await tracksModel.findOneAndUpdate(
            id, body
        );
        res.send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR_UPDATE_ITEMS');
    }
};

/**
 * Eliminar un detalle 
 */
const deleteItems = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req // Esto es igual a const{id} =req.params
        const data = await tracksModel.delete({ _id: id }); // metodo deleteOne borra de forma permanente & delete solo hace borrado logico
        res.send({ data });
    } catch (error) {
        console.log("error", error)
        handleHttpError(res, 'ERROR_DELETE_ITEM');
    }
};

/**
 * Eliminar todos los detalles 
 */
const deleteAllItems = async (req, res) => {
    try {
        const data = await tracksModel.deleteAllItems({});
        res.send({ data });
    } catch (error) {
        console.log("error", error)
        handleHttpError(res, 'ERROR_DELETE_ITEM');
    }
};


module.exports = { getItems, getItem, createItem, updateItems, deleteItems, deleteAllItems };