require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');
const openApiconfiguration = require('./docs/swagger');
const morganBody = require("morgan-body");
const loggerStream = require("./utils/handleLogger");
const dbConnectNoSql = require("./config/mongo");
const { dbConnectMySql } = require("./config/mysql");



const app = express();

const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function (req, res) {
        return res.statusCode < 400
    }
})
const port = process.env.PORT || 3005;

/**
 * Definir tura de documentacion
 */
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(openApiconfiguration))


/**
 * Aqui invocamos a las rutaa!!
 */

app.use("/api", require("./routes"))

if (NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Tu app esta lista por http://localhost:${port}/ `)
    });
}

(ENGINE_DB === 'nosql') ? dbConnectNoSql() : dbConnectMySql();

module.exports = app;