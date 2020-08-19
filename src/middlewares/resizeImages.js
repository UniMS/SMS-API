const _ = require("lodash");
const faker = require("faker");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  await Promise.all(
    _.values(req.files).map(async (file) => {
      let { fieldname, buffer } = file[0];

      let type;
      if (fieldname === "photo") type = "student";
      else if (fieldname === "nrcFront") type = "nrc-front";
      else if (fieldname === "nrcBack") type = "nrc-back";
      else if (fieldname === "wardRecommendationLetter") type = "ward";
      else if (fieldname === "policeRecommendationLetter") type = "police";

      const fileName = `${type}-${req.params.studentId}-${Date.now()}.jpeg`;

      await sharp(buffer)
        .toFormat("jpeg")
        .jpeg({ quality: 70 })
        .toFile(`public/images/present/${fileName}`);

      req.body[fieldname] = fileName;
    })
  );

  next();
});
