const express = require("express");
const router = express.Router();
const students = require("../controllers/students");
const {
  uploadStudentImages,
  uploadParentImages,
} = require("../middlewares/uploadImages");

const resizeImages = require("../middlewares/resizeImages");

const multer = require("multer");
const upload = multer({ dest: "tmp/csv/" });

router.route("/csv").post(upload.single("file"), students.importWithCSV);

/**
 * * verified
 * @filterStudents filters students according to academic year, major and attendance yera.
 *
 * @params academicYearId, majorId, attendanceYearId
 */
router.get(
  "/academic-year/:academicYearId",
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
 * ! needs error handling in utils/uploadImage
 * @updateStudent updates student information.
 *
 * @middleware uploadStudentImages inside /src/middlewares/uploadImages
 * @middleware resizeImages inside /src/middlewares/uploadImages
 *
 * @params studentId
 */
router.put(
  "/:studentId",
  uploadStudentImages,
  resizeImages,
  students.updateStudent
);

/**
 * * verified
 * @getAttendanceHistories get attendance history of a student.
 *
 * @params studentId
 */
router.get("/:studentId/attendance-history", students.getAttendanceHistories);

/**
 * * verified
 * @getParent gets parent information with the given studentId.
 *
 * @params studentId
 */
router.get("/:studentId/parents", students.getParent);

/**
 * ! needs error handling in utils/uploadImage
 * @updateParent updates parent information.
 *
 * @middleware uploadParentImages inside /src/middlewares/uploadImages
 * @middleware resizeImages inside /src/middlewares/uploadImages
 *
 * @params parentId
 */
router.put(
  "/:parentId/parent",
  uploadParentImages,
  resizeImages,
  students.updateParent
);

module.exports = router;
