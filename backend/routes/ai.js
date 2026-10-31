const express = require("express");
const router = express.Router();

const aiController = require("../controllers/aiController");

router.post("/questions", aiController.generateQuestions);

module.exports = router;