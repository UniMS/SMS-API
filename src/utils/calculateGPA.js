const _ = require("lodash");

module.exports = function (gradings) {
  let totalPoint = 0;

  gradings.map((grading) => {
    const grade = grading.grading.grade.name;
    let point = 0;

    if (grade === "A+" || grade === "A") point = 5;
    else if (grade === "A-" || grade === "B+") point = 4.5;
    else if (grade === "B") point = 4;
    else if (grade === "B-" || grade === "C+") point = 3.5;
    else if (grade === "C") point = 3;
    else if (grade === "C-") point = 2.5;

    totalPoint += point;
  });

  const finalYearGPA = _.round(totalPoint / gradings.length, 1);

  return finalYearGPA;
};
