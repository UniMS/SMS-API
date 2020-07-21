const express = require("express");
const router = express.Router();
const roles = require("../controllers/roles");

router.get("/", roles.findAll);

module.exports = router;
