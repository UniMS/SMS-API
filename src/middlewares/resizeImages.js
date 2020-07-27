const _ = require("lodash");
const faker = require("faker");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
module.exports = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    _.values(req.files).map(async (file, index) => {
      let name = `image-${faker.random.uuid()}.jpeg`;
      let { fieldname, buffer } = file[0];
      let width = fieldname === "photo" ? 500 : 640;
      let height = fieldname === "photo" ? 500 : 320;
      await sharp(buffer)
        .resize(width, height)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/${name}`);
      req.body[fieldname] = name;
    })
  );
  next();
});
