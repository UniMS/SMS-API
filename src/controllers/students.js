const { Op } = require("sequelize");
const models = require("../database/models");
const catchAsync = require("../middlewares/catchAsync");

exports.searchByCompleteRollNumber = catchAsync(async (req, res) => {
  const student = await models.Enrollment.findOne({
    where: {
      academicYearId: req.params.academicYearId,
      rollNo: req.params.rollNo,
    },
    include: [
      { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    ],
  });

  if (!student)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.searchByRollNumber = catchAsync(async (req, res) => {
  const student = await models.Enrollment.findOne({
    where: {
      academicYearId: req.params.academicYearId,
      majorId: req.params.majorId,
      attendanceYearId: req.params.attendanceYearId,
      rollNo: {
        [Op.like]: `%${req.params.rollNo}%`,
      },
    },
    include: [
      { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    ],
  });

  if (!student)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.searchByNRC = catchAsync(async (req, res) => {
  const student = await models.Student.findOne({
    where: { nrc: req.params.nrc },
    include: [
      { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    ],
  });

  if (!student)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.searchByEntranceNo = catchAsync(async (req, res) => {
  const student = await models.Student.findOne({
    where: { entranceNo: req.params.entranceNo },
    include: [
      { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    ],
  });

  if (!student)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.searchByName = catchAsync(async (req, res) => {
  const student = await models.Enrollment.findAll({
    where: {
      academicYearId: req.params.academicYearId,
      majorId: req.params.majorId,
      attendanceYearId: req.params.attendanceYearId,
    },
    include: [
      {
        model: models.Student,
        as: "student",
        where: {
          nameEn: {
            [Op.like]: `%${req.params.name}`,
          },
        },
      },
      {
        model: models.Degree,
        as: "degree",
      },
      {
        model: models.AcademicYear,
        as: "academicYear",
      },
      {
        model: models.AttendanceYear,
        as: "attendanceYear",
      },
      {
        model: models.Status,
        as: "status",
      },
      {
        model: models.Major,
        as: "major",
      },
    ],
  });

  if (!student)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.getAcademicHistories = catchAsync(async (req, res) => {
  const histories = await models.Enrollment.findAll({
    where: {
      studentId: req.params.studentId,
    },
    include: [
      { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    ],
  });

  if (!histories.length > 0)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });
  return res.status(200).json({
    status: "success",
    data: {
      histories,
    },
  });
});

exports.getParent = catchAsync(async (req, res) => {
  const parent = await models.Parent.findAll({
    where: {
      studentId: req.params.studentId,
    },
    include: [
      { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    ],
  });

  if (!parent)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });
  return res.status(200).json({
    status: "success",
    data: {
      parent,
    },
  });
});

// Filter students by academic-year, major and attendance-year
exports.filterStudents = catchAsync(async (req, res) => {
  const students = await models.Enrollment.findAll({
    where: {
      academicYearId: req.params.academicYearId,
      majorId: req.params.majorId,
      attendanceYearId: req.params.attendanceYearId,
    },
    include: [
      { all: true, attributes: { exclude: ["createdAt", "updatedAt"] } },
    ],
  });

  if (!students.length > 0)
    return res.status(404).json({
      status: "fail",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      students,
    },
  });
});

exports.deleteStudent = catchAsync(async (req, res) => {
  await models.Student.destroy({
    where: {
      studentId: req.params.studentId,
    },
  });
  return res.status(200).json({
    status: "success",
  });
});
