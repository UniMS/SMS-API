const express = require("express");
const router = express.Router();
const statistics = require("../controllers/statistics");

/*
--------------------------------------------
Student Grading Statistics
--------------------------------------------
*/
router.get(
  "/grades/academic-year/:academicYearId/attendance-year/:attendanceYearId/major/:majorId/count",
  statistics.getStudentsCountBySubjectAndGrade
);

router.get(
  "/academic-year/:academicYearId/pass-fail-rate",
  statistics.getPassFailRateForAcademicYear
);

router.get(
  "/academic-year/:academicYearId/major/:majorId/pass-fail-rate",
  statistics.getPassFailRateForAcademicYearAndMajor
);

router.get(
  "/academic-year/:academicYearId/attendance-year/:attendanceYearId/pass-fail-rate",
  statistics.getPassFailRateForAcademicYearAndAttendanceYear
);

router.get(
  "/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/pass-fail-rate",
  statistics.getPassFailRateForAcademicYearAttendanceYearAndMajor
);

/*
--------------------------------------------
Student Count Statistics
--------------------------------------------
*/

router.get(
  "/students/count?",
  statistics.getStudentsCountByAcademicYearAttendanceYearAndMajor
);

/*
--------------------------------------------
Township/Region Statistics
--------------------------------------------
*/

router.get(
  "/students/townships/:townshipId",
  statistics.getStudentsByTownshipAcademicYearAttendanceYearAndMajor
);

router.get(
  "/students/regions/:regionId",
  statistics.getStudentsByRegionAcademicYearAttendanceYearAndMajor
);

/*
--------------------------------------------
Religion/Ethnicity/Gender Statistics
--------------------------------------------
*/

router.get(
  "/students/religions/:religionId",
  statistics.getStudentsByReligionAcademicYearAttendanceYearAndMajor
);

router.get(
  "/students/gender/:gender",
  statistics.getStudentsByGenderAcademicYearAttendanceYearAndMajor
);

module.exports = router;
