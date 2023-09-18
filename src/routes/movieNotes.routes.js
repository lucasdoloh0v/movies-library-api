const { Router } = require("express");

const MovieNotesController = require("../controllers/MovieNotesController");
const ensureAuthenticated = require("../middlewares/ensureAthenticated");

const movieNotesRoutes = Router();

const movieNotesController = new MovieNotesController();

movieNotesRoutes.post("/", ensureAuthenticated, movieNotesController.create);
movieNotesRoutes.get("/:id", ensureAuthenticated, movieNotesController.readOne);
movieNotesRoutes.get("/", ensureAuthenticated, movieNotesController.searchNotes);
movieNotesRoutes.delete("/:id", ensureAuthenticated, movieNotesController.delete);

module.exports = movieNotesRoutes;
