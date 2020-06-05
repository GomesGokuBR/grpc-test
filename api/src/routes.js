const { Router } = require('express');

const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const PurchaseController = require('./controllers/PurchaseController');

const authMiddleware = require('./middlewares/auth');

const router = Router();

router.get('/user/:id', UserController.show);
router.post('/user', UserController.store);

router.post('/sessions', SessionController.store);

router.use(authMiddleware);

router.get('/purchase/:id', PurchaseController.show);
router.post('/purchases', PurchaseController.store);
router.get('/purchases', PurchaseController.index);


module.exports = router;