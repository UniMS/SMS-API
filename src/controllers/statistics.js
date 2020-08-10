const _ = require("lodash");
const models = require("../database/models");
const catchAsync = require("../utils/catchAsync");

/*
--------------------------------------------
Sdutent Statistics
--------------------------------------------
*/

exports.getStudentsCountByAcademicYear = catchAsync(async (req, res) => {
  const studentsCount = await models.Enrollment.count({
    where: {
      academicYearId: req.params.academicYearId,
    },
  });

  if (!studentsCount) {
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });
  }

  return res.status(200).send({
    status: "success",
    data: {
      count: studentsCount,
    },
  });
});

exports.getStudentsCountByAcademicYearAndMajor = catchAsync(
  async (req, res) => {
    const studentsCount = await models.Enrollment.count({
      where: {
        academicYearId: req.params.academicYearId,
        majorId: req.params.majorId,
      },
    });

    if (!studentsCount) {
      return res.status(404).json({
        status: "fail",
        message: "No data!",
      });
    }

    return res.status(200).send({
      status: "success",
      data: {
        count: studentsCount,
      },
    });
  }
);

/*
--------------------------------------------
Grading and ExamResult Statistics
--------------------------------------------
*/
/* View students count who gets specific grades in each subject for each major
- 2019-2020 6th year -> IST -> AI -> A+ -> 20 
- 2019-2020 6th year -> IST -> AI -> A  -> 35 ...
*/
exports.getStudentsCountBySubjectAndGrade = catchAsync(async (req, res) => {
  const courses = await models.Course.findAll({
    where: {
      academicYearId: req.params.academicYearId,
      attendanceYearId: req.params.attendanceYearId,
      majorId: req.params.majorId,
    },
    attributes: ["courseId"],
  });

  const Model =
    req.originalUrl.split("/")[3] === "grades"
      ? { name: "Grading", id: "gradeId" }
      : { name: "ExamResult", id: "examResultId" };

  const promises = courses.map(async (course) => {
    return await models[Model.name].findAll({
      where: {
        courseId: course.courseId,
      },
      attributes: [
        "gradeId",
        [models.sequelize.fn("COUNT", `${Model.name}.${Model.id}`), "count"],
      ],
      include: [
        {
          model: models.Grade,
          as: "grade",
          attributes: ["name"],
        },
      ],
      group: ["gradeId"],
    });
  });

  const results = await Promise.all(promises);

  return res.status(200).send({
    status: "success",
    data: results,
  });
});

exports.getPassFailRateInAcademicYear = catchAsync(async (req, res) => {
  // get enrollments for given academic year
  const enrollments = await models.Enrollment.findAll({
    where: {
      academicYearId: req.params.academicYearId,
    },
    attributes: ["enrollmentId"],
  });

  const academicYear = await models.AcademicYear.findOne({
    where: {
      academicYearId: req.params.academicYearId,
    },
    attributes: ["name"],
  });

  // get all remarks for all enrollments
  const remarkCount = await Promise.all(
    enrollments.map(async (enrollment) => {
      return await models.Grading.count({
        where: {
          enrollmentId: enrollment.enrollmentId,
          remarkId: 2,
        },
        distinct: true,
        col: "enrollmentId",
      });
    })
  );

  const failRate = (_.compact(remarkCount).length / enrollments.length) * 100;
  const passRate = 100 - failRate;

  if (!passRate && !failRate)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      academicYear: academicYear.name,
      failRate,
      passRate,
    },
  });
});
