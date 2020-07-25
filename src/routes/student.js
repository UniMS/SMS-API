const express = require("express");
const router = express.Router();
const students = require("../controllers/students");

router.get(
  "/academic-year/:academicYear/roll-no/:rollNo",
  students.searchByCompleteRollNumber
);
router.get("/nrc/:nrc", students.searchByNRC);

module.exports = router;
