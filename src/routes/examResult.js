const express = require("express");
const router = express.Router();
const examResults = require("../controllers/examResults");

router.route("/").get(examResults.getAllExamResults);

router.get("/:examResultId", examResults.getExamResult);

router.get(
  "/academic-year/:academicYearId/roll-no/:rollNo",
  examResults.searchByCompleteRollNo
);
router.get(
  "/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/roll-no/:rollNo",
  examResults.searchByRollNo
);
router.get(
  "/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId",
  examResults.filterExamResults
);
router.get(
  "/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/remark/:remarkId",
  examResults.filterExamResultsByRemark
);

module.exports = router;
