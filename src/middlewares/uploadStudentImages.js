const uploadImage = require("../utils/uploadImage");

const uploadFields = [
  { name: "nrcFront", maxCount: 1 },
  { name: "nrcBack", maxCount: 1 },
  { name: "photo", maxCount: 1 },
  { name: "wardRecommendationLetter", maxCount: 1 },
  { name: "policeRecommendationLetter", maxCount: 1 },
];

module.exports = uploadImage.fields(uploadFields);
