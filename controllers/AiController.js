const AIService = require("../services/AiService");
const aiService = new AIService(process.env.OPENAI_API_KEY);

exports.getLearningPath = async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    const learningPath = await aiService.generateLearningPath(topic);
    res.json({ success: true, data: learningPath });
  } catch (error) {
    console.error(
      "Error in getLearningPath:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({
        error: error.response?.data?.error?.message || "Internal Server Error",
      });
  }
};

exports.getProjectIdeas = async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    const projectIdeas = await aiService.generateProjectIdeas(topic);
    res.json({ success: true, data: projectIdeas });
  } catch (error) {
    console.error(
      "Error in getProjectIdeas:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({
        error: error.response?.data?.error?.message || "Internal Server Error",
      });
  }
};

exports.getSkillRoadmap = async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    const skillRoadmap = await aiService.generateSkillRoadmap(topic);
    res.json({ success: true, data: skillRoadmap });
  } catch (error) {
    console.error(
      "Error in getSkillRoadmap:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({
        error: error.response?.data?.error?.message || "Internal Server Error",
      });
  }
};

exports.getFollowUp = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required for follow-up" });
  }

  try {
    const followUps = await aiService.generateFollowUp(prompt);
    res.json({ success: true, prompts: followUps });
  } catch (error) {
    console.error("Error in getFollowUp:", error);
    res.status(500).json({ error: error.message });
  }
};


