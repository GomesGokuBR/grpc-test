const { Router } = require('express');

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';

const router = Router();

router.get('/user/:id', UserController.show);
router.get('/user', UserController.store);
router.post('/sessions', SessionController.store);

module.exports = router;