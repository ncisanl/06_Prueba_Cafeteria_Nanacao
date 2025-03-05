const server = require("../index");
const request = require("supertest");

describe("GET - /cafes", () => {
  it("status code 200 y arreglo con al menos 1 objeto al obtener los cafes", async () => {
    const response = await request(server).get("/cafes");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(typeof response.body[0]).toBe("object");
  });
});

describe("GET - /cafes/:id", () => {
  it("status code 200 al buscar un café con su id", async () => {
    const response = await request(server).get("/cafes/1");
    expect(response.statusCode).toBe(200);
  });

  it("status code 404 al no encontrar un café con el id ingresado", async () => {
    const response = await request(server).get("/cafes/9");
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE - /cafes/:id", () => {
  it("status code 404 al intentar eliminar un café con un id que no existe", async () => {
    const tokenTest = "Bearer asd123";
    const response = await request(server)
      .delete("/cafes/6")
      .set("Authorization", tokenTest);

    expect(response.statusCode).toBe(404);
  });

  it("status code 400 al intentar eliminar un café y no se envia el token", async () => {
    const response = await request(server).delete("/cafes/6");

    expect(response.statusCode).toBe(400);
  });

  it("status code 201 al eliminar un café exitosamente", async () => {
    const tokenTest = "Bearer asd123";
    const response = await request(server)
      .delete("/cafes/4")
      .set("Authorization", tokenTest);

    expect(response.statusCode).toBe(201);
  });
});

describe("POST - /cafes", () => {
  it("status code 201 al agregar un café exitosamente", async () => {
    const bodyTest = { id: 5, nombre: "Frapuccino" };
    const response = await request(server).post("/cafes").send(bodyTest);

    expect(response.statusCode).toBe(201);
  });

  it("status code 400 al intentar agregar un café con un id ya existente", async () => {
    const bodyTest = { id: 3, nombre: "Chocolate" };
    const response = await request(server).post("/cafes").send(bodyTest);

    expect(response.statusCode).toBe(400);
  });
});

describe("PUT - /cafes/:id", () => {
  it("status code 400 al intentar actualizar un café y enviar un id diferente en las request y el body", async () => {
    const bodyTest = { id: 1, nombre: "Dulce de leche" };
    const response = await request(server).put("/cafes/2").send(bodyTest);

    expect(response.statusCode).toBe(400);
  });

  it("status code 404 al intentar actualizar un café y no encontrar el id", async () => {
    const bodyTest = { id: 8, nombre: "Dulce de leche" };
    const response = await request(server).put("/cafes/8").send(bodyTest);

    expect(response.statusCode).toBe(404);
  });

  it("status code 201 al actualizar un café exitosamente", async () => {
    const bodyTest = { id: 1, nombre: "Dulce de leche" };
    const response = await request(server).put("/cafes/1").send(bodyTest);

    expect(response.statusCode).toBe(201);
  });
});
