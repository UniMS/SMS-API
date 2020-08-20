const uploadImage = require("../utils/uploadImage");

const studentImageAttributes = [
  { name: "nrcFront", maxCount: 1 },
  { name: "nrcBack", maxCount: 1 },
  { name: "photo", maxCount: 1 },
  { name: "wardRecommendationLetter", maxCount: 1 },
  { name: "policeRecommendationLetter", maxCount: 1 },
];

const parentImageAttributes = [
  { name: "fatherNrcFront", maxCount: 1 },
  { name: "fatherNrcBack", maxCount: 1 },
  { name: "motherNrcFront", maxCount: 1 },
  { name: "motherNrcBack", maxCount: 1 },
];

exports.uploadParentImages = uploadImage.fields(parentImageAttributes);
exports.uploadStudentImages = uploadImage.fields(studentImageAttributes);
