const express = require("express");
const router = express.Router();
const { validatorCreateItem, validatorGetItem } = require ("../validators/tracks");
const {getItems, getItem, createItem, updateItems, deleteItems, deleteAllItems} = require("../controllers/tracks");
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');



// TODO http://localhost/tracks GET,POST,DELETE,PUT

router.get("/",authMiddleware,checkRol(["admin", "user"]), getItems);
router.post("/",authMiddleware, checkRol(["admin", "user"]), validatorCreateItem,  createItem);
router.delete("/",authMiddleware, deleteAllItems);
router.get("/:id",authMiddleware, validatorGetItem, getItem);
router.put("/:id",authMiddleware, validatorGetItem, validatorCreateItem, updateItems);
router.delete("/:id",authMiddleware, validatorGetItem, deleteItems);



module.exports = router;