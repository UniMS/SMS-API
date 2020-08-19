const express = require("express");
const router = express.Router();
const gradings = require("../controllers/gradings");

router.get(
  "/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId",
  gradings.filterGradings
);

/*
--------------------------------------------
GPA
--------------------------------------------
*/
router.get(
  "/academic-year/:academicYearId/roll-no/:rollNo/gpa",
  gradings.getFinalYearGPA
);

router.get(
  "/academic-year/:academicYearId/roll-no/:rollNo/cumulative-gpa",
  gradings.getCumulativeGPA
);

/*
--------------------------------------------
Grading Document
--------------------------------------------
*/
router.get(
  "/degree/:degreeId/from/:fromAcademicYearId/to/:toAcademicYearId/roll-no/:rollNo",
  gradings.generateGradings
);
// 1 year - x year -> /degree/1/from/1/to/4/roll-no/4IST-44/all-marks
// x year - x year -> /degree/1/from/2/to/4/roll-no/4IST-44/all-marks
// 2 year          -> /degree/1/from/2/to/2/roll-no/3IST-33/all-marks

/*
--------------------------------------------
Marks Certificate
--------------------------------------------
*/
router.get(
  "/degree/:degreeId/from/:fromAcademicYearId/to/:toAcademicYearId/roll-no/:rollNo/all-marks",
  gradings.generateMarks
);
// 1 year - x year -> /degree/1/from/1/to/4/roll-no/4IST-44/all-marks
// x year - x year -> /degree/1/from/2/to/4/roll-no/4IST-44/all-marks
// 2 year          -> /degree/1/from/2/to/2/roll-no/3IST-33/all-marks
/*
--------------------------------------------
Basic CRUD
--------------------------------------------
*/
router.get("/students/:studentId", gradings.getGradingsByStudentId);

module.exports = router;
