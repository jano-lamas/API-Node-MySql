const multer = require('multer');
const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const {getItems, getItem, createItem, deleteItems, updateItems} = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");

/**
 * Route Get al storage
 * @openapi
 * /storage:
 *      get:
 *          tags:
 *              - storage
 *          sumary: "Listar archivos"
 *          description: "Obten todas las listas de los archivos"
 *          security:
 *              - bearerAuth: []
 *          responses:
 *                  '200':
 *                      description: "Retorna la listas de los archivos"
 *                      content:
 *                       aplication/json:
 *                        schema:
 *                          type: array
 *                          items:
 *                            $ref: '#/components/schemas/storage'
 *                  '403':
 *                      description: "Error por validacion"
 *              
 */    
router.get("/",getItems);

/**
 * Route detail from storage
 * @openapi
 * /storage/{id}:
 *      get:
 *          tags:
 *              - storage
 *          sumary: "Detalle storage"
 *          description: "Obten el detalle de una storage"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *          - name: id
 *            in: path
 *            description: ID de storage a retornar
 *            required: true
 *            schema:
 *              type: string  
 *          responses:
 *                  '200':
 *                      description: "Obten el detalle de una storage"
 *                      content:
 *                       aplication/json:
 *                        schema:
 *                          type: array
 *                          items:
 *                            $ref: '#/components/schemas/storage'
 *                  '403':
 *                      description: "Error por validacion"
 *              
 */ 
router.get("/:id", validatorGetItem, getItem);
router.delete("/:id", validatorGetItem, deleteItems);


/**
 * Route Upload file
 * @openapi
 * /storage:
 *      post:
 *          tags:
 *              - storage
 *          sumary: "upload file"
 *          description: "Subir un archivo"
 *          security:
 *              - bearerAuth: []
 *          responses:
 *                  '200':
 *                      description: "Retorna el objeto insertado en la coleccion"
 *                  '422':
 *                      description: "Error por validacion"
 *          requestBody:
 *            content:
 *             multipart/form-data:
 *               schema:
 *                 type: object
 *                 properties:
 *                   myfile:
 *                     type: string
 *                     format: binary    
 *              
 */ 
router.post("/", uploadMiddleware.single("myfile"), createItem);

module.exports = router;