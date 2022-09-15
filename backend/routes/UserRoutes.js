const UserController = require('../controllers/UserController');
const router = require('express').Router();

const verifyToken = require('../helpers/verify-token');

router.post('/register', verifyToken, UserController.register);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);
router.get('/:id', verifyToken, UserController.getUserById);
router.patch('/edit/:id', verifyToken, UserController.updateUser);



module.exports = router;