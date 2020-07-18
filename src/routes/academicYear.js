const express = require("express");
const router = express.Router();
const academicYear = require("../controllers/academicYears");

router.get("/", academicYear.findAll);

module.exports = router;
