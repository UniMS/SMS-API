const express = require("express");

const router = express.Router();

router.post("/login");
router.route("/").get().post();
router.route("/:userId").get().patch().delete();

module.exports = router;
