const multer = require("multer");

const multerStorage = multer.memoryStorage();
const multerImageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new Error("Only images are allowed"), false);
};

const uploadImage = multer({
  storage: multerStorage,
  fileFilter: multerImageFilter,
});

module.exports = uploadImage;
