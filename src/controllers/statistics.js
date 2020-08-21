const _ = require("lodash");
const models = require("../database/models");
const catchAsync = require("../utils/catchAsync");

/*
--------------------------------------------
Student Count Statistics
--------------------------------------------
*/

// total students in each academic year + attendance year + major
exports.getStudentsCountByAcademicYearAttendanceYearAndMajor = catchAsync(
  async (req, res) => {
    const studentsCount = await models.Enrollment.count({
      where: {
        academicYearId: req.query.academicYearId,
        attendanceYearId: req.query.attendanceYearId,
        majorId: req.query.majorId,
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
Township/Region Statistics
--------------------------------------------
*/

// students by academic year + attendance year + major + township
exports.getStudentsByTownshipAcademicYearAttendanceYearAndMajor = catchAsync(
  async (req, res) => {
    const townships = await models.Township.findAll({
      where: {
        townshipId: req.params.townshipId,
      },
      attributes: ["name"],
      include: [
        {
          model: models.Student,
          as: "students",
          attributes: ["studentId","nameMm", "nameEn","nrc"],
          include: [
            {
              model: models.Parent,
              as: "parent",
              attributes: ["fatherNameMm", "fatherNameEn", "fatherNrc"],
            },
            {
              model: models.Enrollment,
              as: "enrollment",
              attributes: ["rollNo"],
              where: {
                academicYearId: req.query.academicYearId,
                attendanceYearId: req.query.attendanceYearId,
                majorId: req.query.majorId,
              },
            },
          ],
        },
      ],
    });

    if (!townships)
      return res.status(404).json({
        status: "fail",
        message: "No data!",
      });

    return res.status(200).json({
      status: "success",
      data: {
        townships,
      },
    });
  }
);

// students by academic year + attendance year + major + region
exports.getStudentsByRegionAcademicYearAttendanceYearAndMajor = catchAsync(
  async (req, res) => {
    const regions = await models.Region.findAll({
      where: { regionId: req.params.regionId },
      attributes: ["name"],
      include: [
        {
          model: models.Township,
          as: "township",
          required: true,
          attributes: ["name"],    
          include: [
            {
              model: models.Student,
              as: "students",
              attributes: ["studentId","nameMm", "nameEn","nrc"],
              include: [
                {
                  model: models.Parent,
                  as: "parent",
                  attributes: ["fatherNameMm", "fatherNameEn", "fatherNrc"],
                },
                {
                  model: models.Enrollment,
                  as: "enrollment",
                  attributes: ["rollNo"],
                  where: {
                    academicYearId: req.query.academicYearId,
                    attendanceYearId: req.query.attendanceYearId,
                    majorId: req.query.majorId,
                  },
                },
              ],
            },
          ]
        },
      ],
    });

    const results = _.compact(regions[0].township.map(t => {
      if (t.students.length === 0) delete t;
      else return t;
    }));

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

/*
--------------------------------------------
Religion/Ethnicity/Gender Statistics
--------------------------------------------
*/

// students by academic year + attendance year + major + religion
exports.getStudentsByReligionAcademicYearAttendanceYearAndMajor = catchAsync(
  async (req, res) => {
    const religions = await models.Religion.findAll({
      where: {
        religionId: req.params.religionId,
      },
      attributes: ["name"],
      include: [
        {
          model: models.Student,
          as: "student",
          attributes: ["studentId","nameMm", "nameEn","nrc"],
          include: [
            {
              model: models.Parent,
              as: "parent",
              attributes: ["fatherNameMm", "fatherNameEn", "fatherNrc"],
            },
            {
              model: models.Enrollment,
              as: "enrollment",
              attributes: ["rollNo"],
              where: {
                academicYearId: req.query.academicYearId,
                attendanceYearId: req.query.attendanceYearId,
                majorId: req.query.majorId,
              },
            },
          ],
        },
      ],
    });

    if (!religions)
      return res.status(404).json({
        status: "fail",
        message: "No data!",
      });

    return res.status(200).json({
      status: "success",
      data: {
        religions,
      },
    });
  }
);

// students by academic year + attendance year + major + ethnicity
exports.getStudentsByEthnicityAcademicYearAttendanceYearAndMajor = catchAsync(
  async (req, res) => {
    const ethnicity = await models.Student.findAll({
      attributes: ["studentId","nameMm", "nameEn","nrc","gender"],
      where: {
        gender: req.params.gender,
      },
      include: [
        {
          model: models.Parent,
          as: "parent",
          attributes: ["fatherNameMm", "fatherNameEn", "fatherNrc"],
        },
        {
          model: models.Enrollment,
          as: "enrollment",
          attributes: ["rollNo"],
          where: {
            academicYearId: req.query.academicYearId,
            attendanceYearId: req.query.attendanceYearId,
            majorId: req.query.majorId,
          },
        },
      ],
    });

    if (!gender)
      return res.status(404).json({
        status: "fail",
        message: "No data!",
      });

    return res.status(200).json({
      status: "success",
      data: {
        gender,
      },
    });
  }
);

// students by academic year + attendance year + major + gender
exports.getStudentsByGenderAcademicYearAttendanceYearAndMajor = catchAsync(
  async (req, res) => {
    const gender = await models.Student.findAll({
      attributes: ["studentId","nameMm", "nameEn","nrc","gender"],
      where: {
        gender: req.params.gender,
      },
      include: [
        {
          model: models.Parent,
          as: "parent",
          attributes: ["fatherNameMm", "fatherNameEn", "fatherNrc"],
        },
        {
          model: models.Enrollment,
          as: "enrollment",
          attributes: ["rollNo"],
          where: {
            academicYearId: req.query.academicYearId,
            attendanceYearId: req.query.attendanceYearId,
            majorId: req.query.majorId,
          },
        },
      ],
    });

    if (!gender)
      return res.status(404).json({
        status: "fail",
        message: "No data!",
      });

    return res.status(200).json({
      status: "success",
      data: {
        gender,
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

// get pass/fail rate for academic year (2019-2020)
exports.getPassFailRateForAcademicYear = catchAsync(async (req, res) => {
  // get academic year for response
  const academicYear = await models.AcademicYear.findOne({
    where: {
      academicYearId: req.params.academicYearId,
    },
    attributes: ["name"],
  });

  if (!academicYear)
    return res.status(404).json({
      status: "fail",
      message: "Invalid input",
    });

  // get enrollments for given academic year
  const enrollments = await models.Enrollment.findAll({
    where: {
      academicYearId: req.params.academicYearId,
    },
    attributes: ["enrollmentId"],
  });

  // get all remarks for all enrollments
  const remarks = await Promise.all(
    enrollments.map(async (enrollment) => {
      return await models.Grading.count({
        where: {
          enrollmentId: enrollment.enrollmentId,
          remarkId: 1, // fail
        },
        distinct: true,
        col: "enrollmentId",
      });
    })
  );

  const failRate = _.round(
    (_.compact(remarks).length / enrollments.length) * 100,
    2
  );
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

// get pass/fail rate for academic year + major (2019-2020, ICT, get all ICT attendance year)
exports.getPassFailRateForAcademicYearAndMajor = catchAsync(
  async (req, res) => {
    // get enrollments for given academic year and major
    const enrollments = await models.Enrollment.findAll({
      where: {
        academicYearId: req.params.academicYearId,
        majorId: req.params.majorId,
      },
      include: [
        {
          model: models.AttendanceYear,
          as: "attendanceYear",
          attributes: ["name"],
        },
      ],
      raw: true,
    });

    const groupedEnrollments = _.mapValues(
      _.groupBy(enrollments, "attendanceYear.name"),
      (enrollmentList) =>
        enrollmentList
          .map((enrollment) =>
            _.omit(enrollment, ["attendanceYearId", "attendanceYear.name"])
          )
          .map((enrollment) => {
            return enrollment.enrollmentId;
          })
    );

    // get all remarks for all enrollments
    const promises = _.keys(groupedEnrollments).map(async (attendanceYear) => {
      let result = await Promise.all(
        groupedEnrollments[attendanceYear].map(async (enrollmentId) => {
          return await models.Grading.count({
            where: {
              enrollmentId,
              remarkId: 1, // fail
            },
            distinct: true,
            col: "enrollmentId",
          });
        })
      );
      const failRate = _.round(
        (_.compact(result).length / result.length) * 100,
        2
      );
      const passRate = 100 - failRate;
      return { [attendanceYear]: { failRate, passRate } };
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

// get pass/fail rate for academic year + attendance year (2019-2020, first year, get all major of first year)
exports.getPassFailRateForAcademicYearAndAttendanceYear = catchAsync(
  async (req, res) => {
    // get enrollments for given academic year and attendance year
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
              remarkId: 1, // fail
            },
            distinct: true,
            col: "enrollmentId",
          });
        })
      );
      const failRate = _.round(
        (_.compact(result).length / result.length) * 100,
        2
      );
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

// get pass/fail rate for academic year | major | attendance year (2019-2020, ICT, first year)
exports.getPassFailRateForAcademicYearAttendanceYearAndMajor = catchAsync(
  async (req, res) => {

    // get enrollments for given academic year and major
    const enrollments = await models.Enrollment.findAll({
      where: {
        academicYearId: req.query.academicYearId,
        majorId: req.query.majorId,
        attendanceYearId: req.query.attendanceYearId,
      },
      attributes: ["enrollmentId"],
    });

    // get all remarks for all enrollments
    const uniqueRemarkCount = [];

    const promises = enrollments.map(async (enrollment) => {
      const result = await models.Grading.count({
        where: {
          enrollmentId: enrollment.enrollmentId,
          remarkId: 1, // fail
        },
        distinct: true,
        col: "enrollmentId",
      });

      uniqueRemarkCount.push(result);
    });

    await Promise.all(promises);

    const failRate = _.round(
      (_.compact(uniqueRemarkCount).length / uniqueRemarkCount.length) * 100,
      2
    );
    const passRate = 100 - failRate;

    if (enrollments.length <= 0)
      return res.status(404).json({
        status: "fail",
        message: "No data!",
      });

    return res.status(200).json({
      status: "success",
      data: {
        major,
        attendanceYear,
        failRate,
        passRate,
      },
    });
  }
);
