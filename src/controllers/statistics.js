const _ = require("lodash");
const models = require("../database/models");
const catchAsync = require("../utils/catchAsync");
const majors = require("../data/majors");

const { Sequelize } = require("sequelize");

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

exports.getStudentsByTownshipIdAndAcademicYearId = catchAsync(
  async (req, res) => {
    const enrollments = await models.Enrollment.findAll({
      where: {
        academicYearId: req.params.academicYearId,
      },
      attributes: ["rollNo"],
      include: [
        {
          model: models.Student,
          as: "student",
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
          ],
        },
      ],
    });

    if (!enrollments)
      return res.status(404).json({
        status: "fail",
        message: "No data!",
      });

    return res.status(200).json({
      status: "success",
      data: {
        count: enrollments.length,
        enrollments,
      },
    });
  }
);

exports.getStudentsByRegionIdAndAcademicYearId = catchAsync(
  async (req, res) => {
    const enrollments = await models.Enrollment.findAll({
      where: {
        academicYearId: req.params.academicYearId,
      },
      attributes: ["rollNo"],
      include: [
        {
          model: models.Student,
          as: "student",
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: models.Township,
              as: "township",
              required: true,
              attributes: { exclude: ["createdAt", "updatedAt"] },
              include: [
                {
                  model: models.Region,
                  as: "region",
                  required: true,
                  where: { regionId: req.params.regionId },
                  attributes: { exclude: ["createdAt", "updatedAt"] },
                },
              ],
            },
          ],
        },
      ],
    });

    if (enrollments.length <= 0)
      return res.status(404).json({
        status: "fail",
        message: "No data!",
      });

    return res.status(200).json({
      status: "success",
      data: {
        count: enrollments.length,
        enrollments,
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

  const Model = { name: "Grading", id: "gradeId" };

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
  const remarks = await Promise.all(
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

  const failRate = (_.compact(remarks).length / enrollments.length) * 100;
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

exports.getPassFailRateForAttendanceAndAcademicYear = catchAsync(
  async (req, res) => {
    // get enrollments for given academic year
    const enrollments = await models.Enrollment.findAll({
      where: {
        academicYearId: req.params.academicYearId,
        attendanceYearId: req.params.attendanceYearId,
      },
      include: [
        {
          model: models.Major,
          as: "major",
          attributes: ["name"],
        },
      ],
      raw: true,
      attributes: ["enrollmentId", "majorId"],
    });

    const groupedEnrollments = _.mapValues(
      _.groupBy(enrollments, "major.name"),
      (enrollmentList) =>
        enrollmentList
          .map((enrollment) => _.omit(enrollment, ["majorId", "major.name"]))
          .map((enrollment) => {
            return enrollment.enrollmentId;
          })
    );

    // get all remarks for all enrollments
    const promises = _.keys(groupedEnrollments).map(async (major) => {
      let result = await Promise.all(
        groupedEnrollments[major].map(async (enrollmentId) => {
          return await models.Grading.count({
            where: {
              enrollmentId: enrollmentId,
              remarkId: 2,
            },
            distinct: true,
            col: "enrollmentId",
          });
        })
      );
      const failRate = (_.compact(result).length / result.length) * 100;
      const passRate = 100 - failRate;
      return { [major]: { failRate, passRate } };
    });

    const results = await Promise.all(promises);

    if (results.length <= 0)
      return res.status(404).json({
        status: "fail",
        message: "No data!",
      });

    return res.status(200).json({
      status: "success",
      data: {
        results,
      },
    });
  }
);
