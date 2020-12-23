const express = require('express');
const router = express.Router();
const statistics = require('../controllers/statistics');

/*
--------------------------------------------
Student Grading Statistics
--------------------------------------------
*/
router.get(
  '/grades/academic-year/:academicYearId/attendance-year/:attendanceYearId/major/:majorId/count',
  statistics.getStudentsCountBySubjectAndGrade
);

// router.get(
//   "/academic-year/:academicYearId/pass-fail-rate",
//   statistics.getPassFailRateForAcademicYear
// );

// router.get(
//   "/academic-year/:academicYearId/major/:majorId/pass-fail-rate",
//   statistics.getPassFailRateForAcademicYearAndMajor
// );

// router.get(
//   "/academic-year/:academicYearId/attendance-year/:attendanceYearId/pass-fail-rate",
//   statistics.getPassFailRateForAcademicYearAndAttendanceYear
// );

router.get(
  '/academic-year/:academicYearId/pass-fail-rate',
  statistics.getPassFailRateForAcademicYear
);

/*
--------------------------------------------
Student Count Statistics
--------------------------------------------
*/

router.get(
  '/students/count/academic-year/:academicYearId',
  statistics.getStudentsCountByAcademicYear
);

/*
--------------------------------------------
Township/Region Statistics
--------------------------------------------
*/

router.get(
  '/students/townships/:townshipId/academic-year/:academicYearId',
  statistics.getStudentsByTownshipAcademicYear
);

router.get(
  '/students/regions/:regionId/academic-year/:academicYearId',
  statistics.getStudentsByRegionAcademicYear
);

/*
--------------------------------------------
Religion/Ethnicity/Gender Statistics
--------------------------------------------
*/

router.get(
  '/students/religions/:religionId/academic-year/:academicYearId',
  statistics.getStudentsByReligion
);

router.get(
  '/students/ethnicity/academic-year/:academicYearId?',
  statistics.getStudentsByEthnicityAcademicYear
);

router.get(
  '/students/gender/:gender/academic-year/:academicYearId',
  statistics.getStudentsByGenderAcademicYear
);

module.exports = router;
