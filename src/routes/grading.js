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
Basic CRUD
--------------------------------------------
*/
router.get("/students/:studentId", gradings.getGradingsByStudentId);
router.put("/:gradingId", gradings.updateGrading);
router.delete("/:gradingId", gradings.deleteGrading);

module.exports = router;
