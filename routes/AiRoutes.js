const express = require("express");
const router = express.Router();
const aiController = require("../controllers/AiController");

// Routes
router.post("/learning-path", aiController.getLearningPath);
router.post("/project-ideas", aiController.getProjectIdeas);
router.post("/skill-roadmap", aiController.getSkillRoadmap);
router.post("/follow-up", aiController.getFollowUp);

module.exports = router;
