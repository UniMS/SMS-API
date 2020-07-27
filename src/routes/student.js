const express = require("express");
const router = express.Router();
const students = require("../controllers/students");
const uploadImages = require("../middlewares/uploadImages");
const resizeImages = require("../middlewares/resizeImages");

router
  .route("/")
  .get(students.getStudents)
  .post(uploadImages, resizeImages, students.addStudent);

router.get(
  "/academic-year/:academicYearId/roll-no/:rollNo",
  students.searchByCompleteRollNumber
);

router.get("/nrc/:nrc", students.searchByNRC);
router.get("/entrance-no/:entranceNo", students.searchByEntranceNo);

router.get(
  "/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/roll-no/:rollNo",
  students.searchByRollNumber
);

router.get(
  "/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId/name/:name",
  students.searchByName
);

router.get(
  "/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId",
  students.filterStudents
);

router.get("/:studentId/attendance-history", students.getAcademicHistories);
router.get("/:studentId/parents", students.getParent);

module.exports = router;
