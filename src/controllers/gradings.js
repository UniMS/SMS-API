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
