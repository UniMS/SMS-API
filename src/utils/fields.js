exports.studentAttributes = [
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

exports.studentImageAttributes = [
  "nrcFront",
  "nrcBack",
  "photo",
  "wardRecommendationLetter",
  "policeRecommendationLetter",
];

exports.parentAttributes = [
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

exports.parentImageAttributes = [
  "fatherNrcFront",
  "fatherNrcBack",
  "motherNrcFront",
  "motherNrcBack",
];

exports.enrollmentFields = [
  "degreeId",
  "majorId",
  "academicYearId",
  "attendanceYearId",
  "rollNo",
  "remarkId",
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

exports.csvStudentDataEntryFields = [
  "rollNo",
  "nameEn",
  "nameMm",
  "nrc",
  "gender",
  "birthday",
  "phone",
  "religionId",
  "ethnicityId",
  "regionId",
  "townshipId",
  "address",
  "hostelAddress",
  "fatherNameEn",
  "fatherNameMm",
  "fatherNrc",
  "fatherJob",
  "fatherPhone",
  "motherNameEn",
  "motherNameMm",
  "motherNrc",
  "motherJob",
  "motherPhone",
  "parentRegionId",
  "parentTownshipId",
  "parentAddress",
];
