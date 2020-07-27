exports.studentFields = [
  "entranceNo",
  "nameEn",
  "nameMm",
  "nrc",
  "nrcFront",
  "nrcBack",
  "gender",
  "birthday",
  "phone",
  "address",
  "hostelAddress",
  "photo",
  "wardRecommendationLetter",
  "policeRecommendationLetter",
  "townshipId",
  "religionId",
  "ethnicityId",
];

exports.parentFields = [
  "fatherNameMm",
  "fatherNameEn",
  "fatherNrc",
  "fatherNrcFront",
  "fatherNrcBack",
  "fatherJob",
  "fatherPhone",
  "motherNameMm",
  "motherNameEn",
  "motherNrc",
  "motherNrcFront",
  "motherNrcBack",
  "motherJob",
  "motherPhone",
  "parentAddress",
  "parentTownshipId",
];

exports.uploadFields = [
  { name: "nrcFront", maxCount: 1 },
  { name: "nrcBack", maxCount: 1 },
  { name: "photo", maxCount: 1 },
  { name: "fatherNrcFront", maxCount: 1 },
  { name: "fatherNrcBack", maxCount: 1 },
  { name: "motherNrcFront", maxCount: 1 },
  { name: "motherNrcBack", maxCount: 1 },
  { name: "wardRecommendationLetter", maxCount: 1 },
  { name: "policeRecommendationLetter", maxCount: 1 },
];
