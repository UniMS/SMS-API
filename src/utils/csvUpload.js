const multer = require("multer");
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("file")) cb(null, true);
  cb(new Error("Only CSV files are allowed"), false);
};

const csvUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = csvUpload;
