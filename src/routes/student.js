const express = require("express");
const router = express.Router();
const students = require("../controllers/students");
const uploadImages = require("../middlewares/uploadImages");
const resizeImages = require("../middlewares/resizeImages");

const multer = require("multer");
const upload = multer({ dest: "tmp/csv/" });

router.route("/csv").post(upload.single("file"), students.importWithCSV);

/**
 * @filterStudents filters students according to academic year, major and attendance yera.
 *
 * @params academicYearId, majorId, attendanceYearId
 */
router.get(
  "/academic-year/:academicYearId/major/:majorId/attendance-year/:attendanceYearId",
  students.filterStudents
);

/**
 * * verified
 * @getStudent gets a student with the given studentId.
 *
 * @params studentId
 */
router.get("/:studentId", students.getStudent);

/**
 * * verified
 * @getParent gets parent information with the given studentId.
 *
 * @params studentId
 */
router.get("/:studentId/parents", students.getParent);

/**
 * * verified
 * @getAttendanceHistories get attendance history of a student.
 *
 * @params studentId
 */
router.get("/:studentId/attendance-history", students.getAttendanceHistories);

/**
 * @updateStudent updates student information.
 *
 * @params studentId
 */
router.put("/:studentId/student", students.updateStudent);

/**
 * @updateParent updates parent information.
 *
 * @params parentId
 */
router.put("/:parentId/parent", students.updateParent);

// ----------------------------------------------------------------------------

router.use(uploadImages, resizeImages);

module.exports = router;
