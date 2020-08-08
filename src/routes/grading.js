const express = require("express");
const router = express.Router();
const gradings = require("../controllers/gradings");

router.get(
  "/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId",
  gradings.filterGradings
);

router.get(
  "/grade/:gradeId/subject/:name/major/:majorId/students-count",
  gradings.getStudentsCountBySubjectAndGrade
);

router.get(
  "/:studentId/attendance-year/:attendanceYearId/student-gpa",
  gradings.getStudentGPA
);

module.exports = router;
