const { Router } = require('express');

const SessionsController = require('../controllers/SessionsController');
const ensureAuthenticated = require('../middlewares/ensureAthenticated');

const sessionsRouter = Router();

const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);
sessionsRouter.get('/', ensureAuthenticated, sessionsController.getUser);

module.exports = sessionsRouter