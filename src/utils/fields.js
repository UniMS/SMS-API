/**
 * @student attributes
 */
exports.studentAttributes = [
  'nameEn',
  'nameMm',
  'nrc',
  'nrcFront',
  'nrcBack',
  'gender',
  'birthday',
  'phone',
  'entranceDate',
  'address',
  'hostelName',
  'hostelAddress',
  'photo',
  'wardRecommendationLetter',
  'policeRecommendationLetter',
  'townshipId',
  'religionId',
  'ethnicityId',
];

/**
 * @parent attributes
 */
exports.parentAttributes = [
  'fatherNameMm',
  'fatherNameEn',
  'fatherNrc',
  'fatherNrcFront',
  'fatherNrcBack',
  'fatherJob',
  'fatherPhone',
  'motherNameMm',
  'motherNameEn',
  'motherNrc',
  'motherNrcFront',
  'motherNrcBack',
  'motherJob',
  'motherPhone',
  'parentAddress',
  'parentTownshipId',
];

/**
 * @csv_student csv headers
 */
exports.csvStudentHeaders = [
  'rollNo',
  'nameEn',
  'nameMm',
  'nrc',
  'gender',
  'birthday',
  'phone',
  'religion',
  'ethnicity1',
  'ethnicity2',
  'region',
  'township',
  'entranceDate',
  'address',
  'hostelName',
  'hostelAddress',
  'fatherNameEn',
  'fatherNameMm',
  'fatherNrc',
  'fatherJob',
  'fatherPhone',
  'motherNameEn',
  'motherNameMm',
  'motherNrc',
  'motherJob',
  'motherPhone',
  'parentRegion',
  'parentTownship',
  'parentAddress',
  'contactAddress',
];

/**
 * @csv_student attributes
 */
exports.csvStudentAttributes = [
  'nameEn',
  'nameMm',
  'nrc',
  'gender',
  'birthday',
  'phone',
  'religion',
  'ethnicity1',
  'ethnicity2',
  'township',
  'entranceDate',
  'address',
  'hostelName',
  'hostelAddress',
];

/**
 * @csv_parent attributes
 */
exports.csvParentAttributes = [
  'fatherNameMm',
  'fatherNameEn',
  'fatherNrc',
  'fatherJob',
  'fatherPhone',
  'motherNameMm',
  'motherNameEn',
  'motherNrc',
  'motherJob',
  'motherPhone',
  'parentAddress',
  'parentTownship',
];

/**
 * csv @enrollment attributes
 */
exports.csvEnrollmentAttributes = [
  'academicYearId',
  'attendanceYearId',
  'majorId',
  'rollNo',
];

/**
 * Student @Image Attributes
 */
exports.studentImageAttributes = [
  'nrcFront',
  'nrcBack',
  'photo',
  'wardRecommendationLetter',
  'policeRecommendationLetter',
];

/**
 * Parent @Image Attributes
 */
exports.parentImageAttributes = [
  'fatherNrcFront',
  'fatherNrcBack',
  'motherNrcFront',
  'motherNrcBack',
];
