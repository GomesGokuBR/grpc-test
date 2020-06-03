const { Router } = require('express');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const router = Router();

router.get('/user/:id', UserController.show);
router.get('/user', UserController.store);
router.post('/sessions', SessionController.store);

module.exports = router;