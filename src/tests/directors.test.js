const request = require("supertest");
const app = require("../app");
let id;

test("GET /directors debe retornar los estudiantes", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /directors debe crear un estudiante", async () => {
  const director = {
    firstName: "Bruce",
    lastName: " Lee",
    nationality: "Estadounidense",
    image:
      "https://www.diariodesevilla.es/2022/11/23/salud/investigacion-tecnologia/Bruce-Lee_1741336215_171089381_667x375.jpg",
    birthday: "1973-07-30",
  };
  const res = await request(app).post("/directors").send(director);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(director.firstName);
  expect(res.body.id).toBeDefined();
});

test("UPDATE /directors debe actualizar un estudiante", async () => {
  const director = {
    birthday: "1973-07-20",
  };
  const res = await request(app).put(`/directors/${id}`).send(director);
  expect(res.status).toBe(200);
  expect(res.body.birthday).toBe(director.birthday);
});

test("DELETE /directors debe eliminar un estudiante", async () => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.status).toBe(204);
});
