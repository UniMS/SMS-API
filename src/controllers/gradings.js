const models = require("../database/models");
const catchAsync = require("../utils/catchAsync");

exports.filterGradings = catchAsync(async (req, res) => {
  const exam = await models.Exam.findOne({
    where: {
      academicYearId: req.params.academicYearId,
      majorId: req.params.majorId,
      attendanceYearId: req.params.attendanceYearId,
    },
    attributes: ["examId"],
  });

  if (!exam)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  const gradings = await models.Grading.findAll({
    where: {
      examId: exam.examId,
    },
    include: [
      {
        all: true,
        nested: true,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });

  if (!gradings)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      gradings,
    },
  });
});

exports.updateGrading = catchAsync(async (req, res) => {
  const grading = await models.Grading.update(req.body, {
    where: {
      gradingId: req.params.gradingId,
    },
  });
  return res.status(200).json({
    status: "success",
    data: {
      grading,
    },
  });
});

exports.deleteGrading = catchAsync(async (req, res) => {
  const grading = await models.Grading.destroy({
    where: {
      gradingId: req.params.gradingId,
    },
  });

  return res.status(200).json({
    status: "success",
    data: {
      grading,
    },
  });
});

exports.getGradingsByStudentId = catchAsync(async (req, res) => {
  const enrollments = await models.Enrollment.findAll({
    where: { studentId: req.params.studentId },
    include: [
      {
        model: models.AcademicYear,
        as: "academicYear",
        attributes: ["name"],
      },
      {
        model: models.AttendanceYear,
        as: "attendanceYear",
        attributes: ["name"],
      },
      {
        model: models.Degree,
        as: "degree",
        attributes: ["name", "description"],
      },
    ],
    attributes: ["enrollmentId", "academicYearId", "attendanceYearId"],
  });

  const results = enrollments.map(async (enrollment) => {
    let gradings = await models.Grading.findAll({
      where: {
        enrollmentId: enrollment.enrollmentId,
      },
      include: [
        {
          all: true,
        },
      ],
    });

    return {
      attendanceYear: enrollment.attendanceYear.name,
      academicYear: enrollment.academicYear.name,
      degree: enrollment.degree,
      gradings,
    };
  });

  const gradings = await Promise.all(results);

  if (gradings.length <= 0)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      gradings,
    },
  });
});
