const Router = require('express');
const router = new Router();
const Controller = require('./userController');
const authMiddleware = require('./middlewares/auth');
const userMiddleware = require('./middlewares/user');

router.post('/signup', userMiddleware, Controller.signup);
router.post('/login', Controller.login);
router.get('/', authMiddleware, Controller.get);
router.delete('/:userId', authMiddleware, Controller.delete);
router.put('/:userId', authMiddleware, userMiddleware, Controller.update);

module.exports = router;