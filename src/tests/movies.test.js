const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
require("../models/index");

let id;

test("GET /movies debe retornar los estudiantes", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies debe crear un estudiante", async () => {
  const movie = {
    name: "Enter the Drag",
    image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQUfwAkjNnJNGkhWSivaE-Gm8kcZZSNiqx8UCKxrrB3YMu_leVs",
    synopsis:
      "Un experto en artes marciales es reclutado para entrar en la isla fortificada de un magnate del opio e infiltrarse en una operación de drogas.",
    releaseYear: 1973,
  };
  const res = await request(app).post("/movies").send(movie);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(movie.name);
  expect(res.body.id).toBeDefined();
});

test("UPDATE /movies debe actualizar un estudiante", async () => {
  const movie = {
    name: "Enter the Dragon",
  };
  const res = await request(app).put(`/movies/${id}`).send(movie);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movie.name);
});

test("POST /movies/:id/actors debe insertar los actors de un movies", async () => {
  const actor = await Actor.create({
    firstName: "Bruce",
    lastName: "Lee",
    nationality: "Estadounidense",
    image:
      "https://www.diariodesevilla.es/2022/11/23/salud/investigacion-tecnologia/Bruce-Lee_1741336215_171089381_667x375.jpg",
    birthday: "1973-07-30",
  });
  const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("POST /movies/:id/directors debe insertar los directors de un movies", async () => {
  const director = await Director.create({
    firstName: "Bruce",
    lastName: "Lee",
    nationality: "Estadounidense",
    image:
      "https://www.diariodesevilla.es/2022/11/23/salud/investigacion-tecnologia/Bruce-Lee_1741336215_171089381_667x375.jpg",
    birthday: "1973-07-30",
  });
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

const Genre = require("../models/Genre");
test("POST /movies/:id/genres debe insertar los genres de un movies", async () => {
  const genre = await Genre.create({
    name: "Actions",
  });
  const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("DELETE /movies debe eliminar un estudiante", async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.status).toBe(204);
});
