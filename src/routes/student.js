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
router.get("/townships/:townshipId", students.getStudentsByTownshipId);
router.get("/regions/:regionId", students.getStudentsByRegionId);

router.route("/").post(uploadImages, resizeImages, students.addStudent);

router.get("/:studentId/attendance-history", students.getAcademicHistories);

module.exports = router;
