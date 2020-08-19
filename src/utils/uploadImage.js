const multer = require("multer");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, `public/images/present`);
//   },
//   filename: function (req, file, cb) {
//     const extension = file.mimetype.split("/")[1];

//     const fieldName = file.fieldname;
//     let type;
//     if (fieldName === "photo") type = "student";
//     else if (fieldName === "nrcFront") type = "nrc-front";
//     else if (fieldName === "nrcBack") type = "nrc-back";
//     else if (fieldName === "wardRecommendationLetter") type = "ward";
//     else if (fieldName === "policeRecommendationLetter") type = "police";

//     cb(null, `${type}-${req.params.studentId}-${Date.now()}.${extension}`);
//   },
// });

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
