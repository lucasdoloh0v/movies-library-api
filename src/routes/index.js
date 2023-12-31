const { Router } = require("express");

const usersRoutes = require("./users.routes");
const movieNotesRoutes = require("./movieNotes.routes");
const movieTagsRoutes = require("./movieTags.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRouter);
routes.use("/movie-notes", movieNotesRoutes);
routes.use("/movie-tags", movieTagsRoutes);

module.exports = routes;
