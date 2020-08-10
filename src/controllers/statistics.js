const { Op } = require("sequelize");
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
