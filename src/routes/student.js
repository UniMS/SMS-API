const express = require("express");
const router = express.Router();
const students = require("../controllers/students");

router.get("/:academicYear/:rollNo", students.searchByCompleteRollNumber);

module.exports = router;
