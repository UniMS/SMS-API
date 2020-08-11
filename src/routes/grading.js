const express = require("express");
const router = express.Router();
const gradings = require("../controllers/gradings");

router.get(
  "/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId",
  gradings.filterGradings
);

router.put("/:gradingId", gradings.updateGrading);
router.delete("/:gradingId", gradings.deleteGrading);

router.get("/students/:studentId", gradings.getGradingsByStudentId);

module.exports = router;
