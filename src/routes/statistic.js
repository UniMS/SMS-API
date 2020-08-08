const express = require("express");
const router = express.Router();
const statistics = require("../controllers/statistics");

/*
--------------------------------------------
Sdutent Statistics
--------------------------------------------
*/
router.get(
  "/students/academic-year/:academicYearId/count",
  statistics.getStudentsCountByAcademicYear
);

router.get(
  "/students/academic-year/:academicYearId/major/:majorId/count",
  statistics.getStudentsCountByAcademicYearAndMajor
);

module.exports = router;
