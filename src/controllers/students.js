const models = require("../database/models");
const catchAsync = require("../middlewares/catchAsync");

exports.searchByCompleteRollNumber = catchAsync(async (req, res) => {
  const academicYear = await models.AcademicYear.findOne({
    where: { name: req.params.academicYear },
    attributes: ["academicYearId"],
  });

  if (!academicYear)
    return res.status(404).json({
      status: "success",
      message: "Unknown academic year.",
    });

  const student = await models.Enrollment.findOne({
    where: {
      academicYearId: academicYear.academicYearId,
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
