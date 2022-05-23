const fs = require('fs');
const { matchedData } = require('express-validator');
const { storageModel } = require('../models');
const { handleHttpError } = require("../utils/handleErros");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Obtener lista de la base de datos!
 */
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({});
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEMS");
    }
};

/**
 * Obtener un detalle de la base de datos!
 */
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await storageModel.findById(id);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEM");
    }
};

/**
 * Crear un detalle 
 */
const createItem = async (req, res) => {
    try {
        const { body, file } = req;
        console.log("file: ", file);

        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData);
        res.send({ data });
    } catch (error) {
        console.log("Error:", error);
    }
};

/**
 * Modificar un detalle 
 */
const updateItems = (req, res) => {

};

/**
 * Eliminar un detalle 
 */
const deleteItems = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await storageModel.findById(id);
        await storageModel.deleteOne({id});
        const {filename} = data;
        const filePath = `${MEDIA_PATH}/${filename}`;
        fs.unlinkSync(filePath);

        const dataRes = {
            filePath,
            deleted:1
        };
        res.send({ dataRes });
    } catch (error) {
        console.log("Error: " , error);
        handleHttpError(res, "ERROR_DELETE_ITEM");
    }
};

/**
 * Eliminar todos los detalles 
 */
const deleteAllItems = (req, res) => {

};


module.exports = { getItems, getItem, createItem, updateItems, deleteItems, deleteAllItems };