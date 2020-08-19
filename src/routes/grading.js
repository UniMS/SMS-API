const express = require("express");
const router = express.Router();
const gradings = require("../controllers/gradings");

/**
--------------------------------------------
Filter Gradings
--------------------------------------------
 * @filterGradings returns lists of gradings which is respect to given academic year, major and attendance year.
 */
router.get(
  "/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId",
  gradings.filterGradings
);

/**
--------------------------------------------
Final Year GPA
--------------------------------------------
 * @getFinalYearGPA generates final year GAP.
 */
router.get(
  "/academic-year/:academicYearId/roll-no/:rollNo/gpa",
  gradings.getFinalYearGPA
);

/**
--------------------------------------------
CumulativeGPA
--------------------------------------------
 * @getCumulativeGPA generates cumulative GAP which is all-academic-year-GPA.
 */
router.get(
  "/academic-year/:academicYearId/roll-no/:rollNo/cumulative-gpa",
  gradings.getCumulativeGPA
);

/**
--------------------------------------------
Grading Document
--------------------------------------------
 * @generateGradings generates grading document.
 * * 1 - for from-academic-year to to-academic-year -> /degree/1/from/2/to/4/roll-no/4IST-44
 * * 2 - for x-academic-year                        -> /degree/1/from/2/to/2/roll-no/3IST-33
 */
router.get(
  "/degree/:degreeId/from/:fromAcademicYearId/to/:toAcademicYearId/roll-no/:rollNo",
  gradings.generateGradings
);

/**
--------------------------------------------
Marks Certificate
--------------------------------------------
 * @generateMarks generates mark certificate.
 * * 1 - for from-academic-year to to-academic-year -> /degree/1/from/2/to/4/roll-no/4IST-44/all-marks
 * * 2 - for x-academic-year                        -> /degree/1/from/2/to/2/roll-no/3IST-33/all-marks
 */
router.get(
  "/degree/:degreeId/from/:fromAcademicYearId/to/:toAcademicYearId/roll-no/:rollNo/all-marks",
  gradings.generateMarks
);

module.exports = router;
