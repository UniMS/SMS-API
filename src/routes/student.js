const express = require("express");
const router = express.Router();
const students = require("../controllers/students");
const uploadImages = require("../middlewares/uploadImages");
const resizeImages = require("../middlewares/resizeImages");

const multer = require("multer");
const upload = multer({ dest: "tmp/csv/" });

router.route("/csv").post(upload.single("file"), students.importWithCSV);

router.get(
  "/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId",
  students.filterStudents
);

router.get("/:studentId", students.getStudent);
<<<<<<< HEAD
=======
<<<<<<< HEAD

router.get("/:studentId/parents", students.getParent);

router.get("/townships/:townshipId", students.getStudentsByTownshipId);
router.get("/regions/:regionId", students.getStudentsByRegionId);

router.get("/:studentId/grading", students.getGradingByStudentId);

// ----------------------------------------------------------------------------
router.route("/").post(uploadImages, resizeImages, students.addStudent);

=======
>>>>>>> e57c92eb9ca326f044919d5b3602846a6bdcffa1
router.get(
  "/academic-year/:academicYearId/students-count",
  students.getStudentsCountByAcademicYear
);
router.get(
  "/academic-year/:academicYearId/major/:majorId/students-count",
  students.getStudentsCountByMajorAndAcademicYear
);
router.get(
  "/grade/:gradeId/subject/:name/major/:majorId/students-count",
  students.getStudentsCountBySubjectAndGrade
);
router.get(
  "/:studentId/attendance-year/:attendanceYearId/student-gpa",
  students.getStudentGPA
);
>>>>>>> a06965982c543bd7d9db6f672266dd39ad85822a

router.get("/:studentId/parents", students.getParent);
router.get("/townships/:townshipId", students.getStudentsByTownshipId);
router.get("/regions/:regionId", students.getStudentsByRegionId);

router.route("/").post(uploadImages, resizeImages, students.addStudent);

router.get("/:studentId/attendance-history", students.getAcademicHistories);

module.exports = router;
