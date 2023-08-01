const request = require("supertest");
const app = require("../app");
let id;
test("GET /actors debe retornar los estudiantes", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});
test("POST /actors debe crear un estudiante", async () => {
  const actor = {
    firstName: "Bruce",
    lastName: " Lee",
    nationality: "Estadounidense",
    image:
      "https://www.diariodesevilla.es/2022/11/23/salud/investigacion-tecnologia/Bruce-Lee_1741336215_171089381_667x375.jpg",
    birthday: "1973-07-30",
  };
  const res = await request(app).post("/actors").send(actor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(actor.firstName);
  expect(res.body.id).toBeDefined();
});
test("UPDATE /actors debe actualizar un estudiante", async () => {
  const actor = {
    birthday: "1973-07-20",
  };
  const res = await request(app).put(`/actors/${id}`).send(actor);
  expect(res.status).toBe(200);
  expect(res.body.birthday).toBe(actor.birthday);
});
test("DELETE /actors debe eliminar un estudiante", async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});
