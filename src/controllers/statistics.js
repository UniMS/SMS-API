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
      // include: [
      //   {
      //     model: models.Major,
      //     as: "major",
      //     attributes: ["name"],
      //   },
      // ],
      // attributes: [
      //   "enrollmentId",
      //   "status",
      //   [Sequelize.fn("MIN", Sequelize.col("majorId")), "majorId"],
      // ],
      attributes: [
        "enrollmentId",
        "majorId",
        [models.sequelize.fn("MIN", `Enrollment.majorId`), "majorId"],
      ],
      include: [
        {
          model: models.Major,
          as: "major",
          attributes: ["name"],
        },
      ],
      group: "majorId",
    });

    // const enrollments = await models.sequelize.query(
    //   `
    // SELECT MIN(enrollment_id) AS enrollmentId, MIN(major_id) AS majorId
    // FROM enrollments
    // WHERE academic_year_id = 1 AND attendance_year_id = 5 GROUP BY major_id;`,
    //   { type: models.sequelize.QueryTypes.SELECT }
    // );

    // const aaa = enrollments.map((enrollment) => {
    //   if (enrollment.majorId === 1)
    //     return [enrollment.major.name].push(enrollment.enrollmentId);
    // });

    // const filteredEnrollments = majors.map((major, index) => {
    //   const obj = enrollments.filter((enrollment) => {
    //     return enrollment.majorId == index + 1 ? enrollment.enrollmentId : "";
    //   });

    //   if (obj.length > 0) {
    //     return { [major.name]: obj };
    //   }
    // });
    return res.status(200).json({
      status: "success",
      data: {
        enrollments,
        // aaa,
        // enroll,
        // filteredEnrollments,
      },
    });
  }
);
/*

enrollments = [
  {
    "ict": [1, 2, 3]
  }, 
  {
    "ece": [1, 2, 3]
  }
]

*/
