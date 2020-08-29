const _ = require('lodash');
const getGPAPoint = require('./getGPAPoint');

module.exports = function (gradings) {
  let totalPoint = 0;

  if (gradings.constructor !== Array)
    throw new Error(`Expected to get an array, got ${typeof gradings}.`);

  gradings.forEach((grading) => {
    const grade = grading.grading.grade.name;
    const point = getGPAPoint(grade);
    totalPoint += point;
  });

  const finalYearGPA = _.round(totalPoint / gradings.length, 1);

  return finalYearGPA;
};
