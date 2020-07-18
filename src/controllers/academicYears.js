const AcademicYear = require("../models").AcademicYear;
const catchAsync = require("../middlewares/catchAsync");

exports.findAll = catchAsync(async (req, res) => {
  const academicYears = await AcademicYear.findAll();

  return res.status(200).json({
    status: "success",
    data: {
      academicYears,
    },
  });
});
