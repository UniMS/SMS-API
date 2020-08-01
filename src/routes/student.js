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

router.get("/:studentId/parents", students.getParent);

// ----------------------------------------------------------------------------
router.route("/").post(uploadImages, resizeImages, students.addStudent);

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

router.get("/:studentId/attendance-history", students.getAcademicHistories);

module.exports = router;
