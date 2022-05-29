const request = require("supertest");
const app = require("../app");
const { usersModel } = require('../models');

const testAuthLogin = {
    email: "test@test.com",
    password: "1234567"
}

const testAuthRegister = {
    name: "Ian Ezequiel",
    age: "23",
    email: "test@test.gmail",
    password: "1234567"
}

/**
 * Esto se va a ejecutar antes de las pruebas
 */
beforeAll( async () => {
    await usersModel.deleteMany(); // Esto en mongo db elimina todala coleccion de usuarios
})

describe("[AUTH] esta es la prueba de /api/auth", () => {
    test("Esto deberia de retornar 404", async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send(testAuthLogin)

        expect(response.statusCode).toEqual(404)
    })

    test("Esto deberia de retornar 201", async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send(testAuthRegister)

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("data.token");
    })
})