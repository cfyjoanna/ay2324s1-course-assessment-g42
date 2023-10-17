const express = require('express');
const router = express.Router();

const matchingController = require("../controllers/matching-controller.js");
const auth = require("../middleware/auth.js");

router.post("/sendMatch", auth, matchingController.publishMatchMessage);

module.exports = router;
