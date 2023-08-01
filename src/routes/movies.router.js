const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setMovieGenres,
  setMovieActors,
  setMovieDirectors,
} = require("../controllers/movies.controllers");
const express = require("express");

const moviesRouter = express.Router();
moviesRouter.route("/").get(getAll).post(create);
moviesRouter.route("/:id").get(getOne).delete(remove).put(update);
moviesRouter.route("/:id/genres").post(setMovieGenres);
moviesRouter.route("/:id/actors").post(setMovieActors);
moviesRouter.route("/:id/directors").post(setMovieDirectors);

module.exports = moviesRouter;
