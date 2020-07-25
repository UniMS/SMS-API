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
      models.Degree,
      models.AcademicYear,
      models.AttendanceYear,
      models.Status,
      models.Major,
      models.Student,
    ],
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
        [Op.like]: `%${req.params.rollNo}`,
      },
    },
    include: [
      models.Degree,
      models.AcademicYear,
      models.AttendanceYear,
      models.Status,
      models.Major,
      models.Student,
    ],
  });

  if (!student)
    return res.status(404).json({
      status: "success",
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
    include: [models.Township, models.Religion, models.Ethnicity],
  });

  if (!student)
    return res.status(404).json({
      status: "success",
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
    include: [models.Township, models.Religion, models.Ethnicity],
  });

  if (!student)
    return res.status(404).json({
      status: "success",
      message: "No data!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});
