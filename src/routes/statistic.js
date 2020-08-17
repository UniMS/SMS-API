const express = require("express");
const router = express.Router();
const statistics = require("../controllers/statistics");

/*
--------------------------------------------
Sdutent Grading Statistics
--------------------------------------------
*/
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
  "/students/academic-year/:academicYearId/townships/:townshipId",
  statistics.getStudentsByTownshipAndAcademicYear
);

router.get(
  "/students/academic-year/:academicYearId/major/:majorId/townships/:townshipId",
  statistics.getStudentsByTownshipAcademicYearAndMajor
);

router.get(
  "/students/academic-year/:academicYearId/attendance-year/:attendanceYearId/townships/:townshipId",
  statistics.getStudentsByTownshipAcademicYearAndAttendanceYear
);

router.get(
  "/students/academic-year/:academicYearId/regions/:regionId",
  statistics.getStudentsByRegionIdAndAcademicYearId
);

module.exports = router;
