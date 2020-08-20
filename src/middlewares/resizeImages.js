const _ = require("lodash");
const faker = require("faker");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");

module.exports = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  await Promise.all(
    _.values(req.files).map(async (file) => {
      let { fieldname, buffer } = file[0];

      let prefix;
      if (fieldname === "nrcFront") prefix = "nrc-front";
      else if (fieldname === "nrcBack") prefix = "nrc-back";
      else if (fieldname === "photo") prefix = "student";
      else if (fieldname === "wardRecommendationLetter") prefix = "ward";
      else if (fieldname === "policeRecommendationLetter") prefix = "police";

      const fileName = `${prefix}-${req.params.studentId}-${Date.now()}.jpeg`;

      await sharp(buffer)
        .toFormat("jpeg")
        .jpeg({ quality: 70 })
        .toFile(`public/images/present/${fileName}`);

      req.body[fieldname] = fileName;
    })
  );

  next();
});
