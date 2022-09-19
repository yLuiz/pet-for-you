const UserController = require('../controllers/UserController');
const router = require('express').Router();
const { imageUpload } = require('../helpers/image-upload');

const verifyToken = require('../helpers/verify-token');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);
router.get('/:id', verifyToken, UserController.getUserById);
router.patch(
  '/edit/:id',
  verifyToken,
  imageUpload.single('image'),
  UserController.updateUser
);



module.exports = router;