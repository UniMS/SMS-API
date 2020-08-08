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

exports.getStudentsCountBySubjectAndGrade = catchAsync(async (req, res) => {
  const { subjectId } = await models.Subject.findOne({
    where: {
      name: {
        [Op.like]: `%${req.params.name}%`,
      },
    },
  });
  const { courseId } = await models.Course.findOne({
    subjectId: subjectId,
    majorId: req.params.majorId,
  });
  const gradings = await models.Grading.findAll({
    where: {
      courseId,
      gradeId: req.params.gradeId,
    },
  });
  if (!gradings) {
    res.status(404).send({
      status: "fail",
    });
  }
  res.status(200).send({
    status: "success",
    count: gradings.length,
  });
});

exports.getStudentGPA = catchAsync(async (req, res, next) => {
  const enrollemnt = await models.Enrollment.findOne({
    where: {
      studentId: req.params.studentId,
      attendanceYearId: req.params.attendanceYearId,
    },
    include: [
      {
        model: models.Grading,
        as: "grading",
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.status(200).send({
    status: "success",
    enrollemnt,
  });
});
