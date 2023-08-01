const request = require("supertest");
const app = require("../app");
let id;

test("GET /genres debe retornar los estudiantes", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /genres debe crear un estudiante", async () => {
  const genre = {
    name: "Martial Ats",
  };
  const res = await request(app).post("/genres").send(genre);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(genre.name);
  expect(res.body.id).toBeDefined();
});

test("UPDATE /genres debe actualizar un estudiante", async () => {
  const genre = {
    name: "Martial Arts",
  };
  const res = await request(app).put(`/genres/${id}`).send(genre);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(genre.name);
});

test("DELETE /genres debe eliminar un estudiante", async () => {
  const res = await request(app).delete(`/genres/${id}`);
  expect(res.status).toBe(204);
});
