const express = require("express");
const router = express.Router();
const gradings = require("../controllers/gradings");

router.get(
  "/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId",
  gradings.filterGradings
);

<<<<<<< HEAD
router.get(
  "/grade/:gradeId/subject/:name/major/:majorId/students-count",
  gradings.getStudentsCountBySubjectAndGrade
);

router.get(
  "/:studentId/attendance-year/:attendanceYearId/student-gpa",
  gradings.getStudentGPA
);
=======
router.put("/:gradingId", gradings.updateGrading);
router.delete("/:gradingId", gradings.deleteGrading);
>>>>>>> a06965982c543bd7d9db6f672266dd39ad85822a

module.exports = router;
