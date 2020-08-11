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

router.get(
  "/exam-results/academic-year/:academicYearId/attendance-year/:attendanceYearId/major/:majorId/count",
  statistics.getStudentsCountBySubjectAndGrade
);

router.get(
  "/grades/academic-year/:academicYearId/attendance-year/:attendanceYearId/major/:majorId/count",
  statistics.getStudentsCountBySubjectAndGrade
);

router.get(
  "/academic-year/:academicYearId/pass-fail-rate",
  statistics.getPassFailRateInAcademicYear
);

router.get(
  "/academic-year/:academicYearId/attendance-year/:attendanceYearId/pass-fail-rate",
  statistics.getPassFailRateForAttendanceAndAcademicYear
);

router.get(
  "/students/academic-year/:academicYearId/townships/:townshipId",
  statistics.getStudentsByTownshipIdAndAcademicYearId
);
router.get(
  "/students/academic-year/:academicYearId/regions/:regionId",
  statistics.getStudentsByRegionIdAndAcademicYearId
);

module.exports = router;
