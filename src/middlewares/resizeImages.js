const _ = require("lodash");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const getPrefix = require("../utils/prefixUploadImages");

module.exports = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  await Promise.all(
    _.values(req.files).map(async (file) => {
      let { fieldname, buffer } = file[0];

      const prefix = getPrefix(req.originalUrl, fieldname);

      const fileName = `${prefix}-${
        req.params.studentId || req.params.parentId
      }-${Date.now()}-${_.uniqueId()}.jpeg`;

      await sharp(buffer)
        .toFormat("jpeg")
        .jpeg({ quality: 70 })
        .toFile(`public/images/${fileName}`);

      req.body[fieldname] = fileName;
    })
  );

  next();
});
