const { Op } = require("sequelize");
const models = require("../database/models");
const catchAsync = require("../middlewares/catchAsync");

exports.searchByCompleteRollNo = catchAsync(async (req, res) => {
  const enrollment = await models.Enrollment.findOne({
    where: {
      academicYearId: req.params.academicYearId,
      rollNo: req.params.rollNo,
    },
    attributes: ["enrollmentId"],
  });

  if (!enrollment)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  const examResults = await models.ExamResult.findAll({
    where: {
      enrollmentId: enrollment.enrollmentId,
    },
    include: [
      {
        all: true,
        nested: true,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });

  if (!examResults)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      examResults,
    },
  });
});

exports.searchByRollNo = catchAsync(async (req, res) => {
  const enrollment = await models.Enrollment.findOne({
    where: {
      academicYearId: req.params.academicYearId,
      majorId: req.params.majorId,
      attendanceYearId: req.params.attendanceYearId,
      rollNo: {
        [Op.like]: `%${req.params.rollNo}%`,
      },
    },
    attributes: ["enrollmentId"],
  });

  if (!enrollment)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  const examResults = await models.ExamResult.findAll({
    where: {
      enrollmentId: enrollment.enrollmentId,
    },
    include: [
      {
        all: true,
        nested: true,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });

  if (!examResults)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      examResults,
    },
  });
});

exports.filterExamResults = catchAsync(async (req, res) => {
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

  const examResults = await models.ExamResult.findAll({
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

  if (!examResults)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      examResults,
    },
  });
});

exports.filterExamResultsByRemark = catchAsync(async (req, res) => {
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
      message: "No data d!",
    });

  const examResults = await models.ExamResult.findAll({
    where: {
      examId: exam.examId,
      remarkId: req.params.remarkId,
    },
    include: [
      {
        all: true,
        nested: true,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });

  if (!examResults)
    return res.status(404).json({
      status: "fail",
      message: "No data e!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      examResults,
    },
  });
});
