const models = require("../database/models");
const catchAsync = require("../utils/catchAsync");

/*
--------------------------------------------
Sdutent Statistics
--------------------------------------------
*/

exports.getStudentsCountByAcademicYear = catchAsync(async (req, res) => {
  const studentsCount = await models.Enrollment.count({
    where: {
      academicYearId: req.params.academicYearId,
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
});

exports.getStudentsCountByAcademicYearAndMajor = catchAsync(
  async (req, res) => {
    const studentsCount = await models.Enrollment.count({
      where: {
        academicYearId: req.params.academicYearId,
        majorId: req.params.majorId,
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
