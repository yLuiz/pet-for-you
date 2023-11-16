const multer = require('multer');
const path = require('path');

const imageRegex = /\.(jpg|jpeg|png|webp|jfif|bmp|tiff)$/

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";
    if(req.baseUrl.includes("users")) {
      folder = "users";
    } else if(req.baseUrl.includes("pets")) {
      folder = "pets";
    }

    cb(null, `public/images/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname));
  }
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if(!file.originalname.match(imageRegex)) {

      return cb('Por favor, envie apenas arquivos de jpg, jpeg, png, webp, jfif, bmp ou tiff');
    }

    cb(undefined, true);
  }
})

module.exports = { imageUpload };