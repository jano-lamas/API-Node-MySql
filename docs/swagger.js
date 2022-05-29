const swaggerJsdoc = require('swagger-jsdoc');

/**
 * {
 *  url: "https://staging.gigantic-server.com/v1",
 *  description:"Staging server",
 * }
 */

/**
 * API Config Info
 */
const swaggerDefination = {
    openapi: "3.0.0",
    info: {
        title: "Documentacion de mi API",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:3005/api"
        }
    ],
    components: {
        securitySchemes:{
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        },
        schemas: {
            authLogin: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string"
                    },
                },
            },
            authRegister: {
                type: "object",
                required: ["email", "password", "age", "name"],
                properties: {
                    name: {
                        type: "string",
                    },
                    age: {
                        type: "integer",
                    },
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string"
                    },
                },
            },
            tracks: {
                type: "object",
                require: ["name", "albun,"],
                properties: {
                    name: {
                        type: "string"
                    },
                    album: {
                        type: "string"
                    },
                    cover: {
                        type: "string"
                    },
                    artist: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            nickname: {
                                type: "string"
                            },
                            nationality: {
                                type: "string"
                            }
                        }
                    },
                    duration: {
                        type: "object",
                        properties: {
                            start: {
                                type: "integer"
                            },
                            end: {
                                type: "integer"
                            }
                        }
                    },
                    mediaId: {
                        type: "string"
                    }
                }
            },
            storage: {
                type: "object",
                properties: {
                    url: {
                        type: "string",
                    },
                    filename: {
                        type: "string",
                    },
                },
            }
        }
    }
}
/**
 * Options
 */
const options = {
    swaggerDefinition: swaggerDefination,
    apis: [
        "./routes/*.js"
    ]
};

const openApiconfiguration = swaggerJsdoc(options);

module.exports = openApiconfiguration;