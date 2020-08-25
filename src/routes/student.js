const express = require('express');
const router = express.Router();
const office = require('../middlewares/office');
const hod = require('../middlewares/hod');
const students = require('../controllers/students');
const {
  uploadStudentImages,
  uploadParentImages,
} = require('../middlewares/uploadImages');

const resizeImages = require('../middlewares/resizeImages');

const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });

router
  .route('/csv')
  .post(upload.single('file'), office, students.importWithCSV);

/**
 * * verified
 * @filterStudents filters students according to academic year, major and attendance yera.
 *
 * @params academicYearId, majorId, attendanceYearId
 */
router.get('/academic-year/:academicYearId', hod, students.filterStudents);

/**
 * * verified
 * @getStudent gets a student with the given studentId.
 *
 * @params studentId
 */
router.get('/:studentId', hod, students.getStudent);

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
  '/:studentId',
  office,
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
router.get(
  '/:studentId/attendance-history',
  hod,
  students.getAttendanceHistories
);

/**
 * * verified
 * @getParent gets parent information with the given studentId.
 *
 * @params studentId
 */
router.get('/:studentId/parents', hod, students.getParent);

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
  '/:parentId/parent',
  office,
  uploadParentImages,
  resizeImages,
  students.updateParent
);

module.exports = router;
