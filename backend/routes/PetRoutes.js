const PetController = require('../controllers/PetController');
const verifyToken = require('../helpers/verify-token');
const router = require('express').Router();
const { imageUpload } = require('../helpers/image-upload');

router.post(
  '/register', 
  verifyToken,
  imageUpload.array('images'),
  PetController.register
);
router.get('/', PetController.getAll);
router.get('/mypets', verifyToken, PetController.getAllUserPets);

module.exports = router;