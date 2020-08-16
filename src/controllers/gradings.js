const _ = require("lodash");
const models = require("../database/models");
const catchAsync = require("../utils/catchAsync");
const calculateGPA = require("../utils/calculateGPA");

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

  const subjects = await models.Course.findAll({
    where: {
      academicYearId: req.params.academicYearId,
      majorId: req.params.majorId,
      attendanceYearId: req.params.attendanceYearId,
    },
    attributes: [],
    include: [
      {
        model: models.Subject,
        as: "subject",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });

  const gradings = await models.Grading.findAll({
    where: {
      examId: exam.examId,
    },
    attributes: ["gradingId"],
    include: [
      {
        model: models.Enrollment,
        as: "enrollment",
        attributes: ["enrollmentId", "rollNo"],
      },
      {
        model: models.Grade,
        as: "grade",
        attributes: ["name"],
      },
    ],
    raw: true,
    nest: true,
  });

  const enrollmentById = {};
  const gradesByEnrollmentId = {};

  gradings.forEach((grading) => {
    if (!gradesByEnrollmentId[grading.enrollment.enrollmentId]) {
      gradesByEnrollmentId[grading.enrollment.enrollmentId] = [
        grading.grade.name,
      ];
    } else {
      gradesByEnrollmentId[grading.enrollment.enrollmentId].push(
        grading.grade.name
      );
    }

    if (!enrollmentById[grading.enrollment.enrollmentId]) {
      enrollmentById[grading.enrollment.enrollmentId] = {
        ...grading.enrollment,
      };
    }
  });

  const result = {
    gradings: Object.values(enrollmentById).map((enrollment) => ({
      ...enrollment,
      grades: gradesByEnrollmentId[enrollment.enrollmentId],
    })),
  };

  if (!result)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      subjects,
      result,
    },
  });
});

exports.getFinalYearGPA = catchAsync(async (req, res) => {
  const gradings = await models.Enrollment.findAll({
    where: {
      academicYearId: req.params.academicYearId,
      rollNo: req.params.rollNo,
    },
    attributes: ["enrollmentId"],
    include: [
      {
        model: models.Grading,
        as: "grading",
        attributes: ["gradeId"],
        include: [{ model: models.Grade, as: "grade", attributes: ["name"] }],
      },
    ],
  });

  const finalYearGPA = calculateGPA(gradings);

  if (!gradings)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      finalYearGPA,
    },
  });
});

exports.getCumulativeGPA = catchAsync(async (req, res) => {
  // get studentId where matches with given roll-no and academic year
  const { studentId } = await models.Enrollment.findOne({
    where: {
      academicYearId: req.params.academicYearId,
      rollNo: req.params.rollNo,
    },
    attributes: ["studentId"],
  });

  // get enrollments where studentId
  const enrollments = await models.Enrollment.findAll({
    where: {
      studentId,
    },
    attributes: ["enrollmentId"],
  });

  return res.status(200).json({
    status: "success",
    data: {
      studentId,
      enrollments,
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
