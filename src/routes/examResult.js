const express = require("express");
const router = express.Router();
const examResults = require("../controllers/examResults");

router.get(
  "/academic-year/:academicYearId/roll-no/:rollNo",
  examResults.searchByCompleteRollNo
);
router.get(
  "/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/roll-no/:rollNo",
  examResults.searchByRollNo
);

module.exports = router;
