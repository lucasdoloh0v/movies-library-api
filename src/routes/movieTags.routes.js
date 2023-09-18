const { Router } = require("express");

const MovieTagsController = require("../controllers/MovieTagsController");
const ensureAuthenticated = require("../middlewares/ensureAthenticated");

const movieTagsRoutes = Router();

const movieTagsController = new MovieTagsController();

movieTagsRoutes.get("/",ensureAuthenticated, movieTagsController.readTagsByUser);

module.exports = movieTagsRoutes;
