const { OpenAI } = require("openai");

class AIService {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
  }

  /**
   * Prepares a conversation with dynamic roles: system, assistant, and user.
   * @param {Array} messages - An array of message objects with `role` and `content`.
   * @returns {Array} - Formatted messages for OpenAI's API.
   */
  prepareConversation(messages) {
    return messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
  }

  /**
   * Generates a response based on a conversation context with roles.
   * @param {Array} messages - Array of conversation messages with roles.
   * @returns {Promise<string>} - The assistant's response.
   */
  async generateResponse(messages) {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: this.prepareConversation(messages),
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.9,
        presence_penalty: 0.5,
        frequency_penalty: 0.3,
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error generating response:", error);
      throw new Error("Failed to generate response");
    }
  }

  /**
   * Generates a learning path for a young developer.
   * @param {string} topic - The software engineering topic (e.g., DevOps, Backend).
   * @returns {Promise<string>} - A detailed learning path.
   */
  async generateLearningPath(topic) {
    const messages = [
      {
        role: "system",
        content: `You are a software engineering mentor specializing in educating young developers. Provide a detailed learning path for the topic: "${topic}".`,
      },
      {
        role: "user",
        content: "What are the steps I should follow to master this topic?",
      },
    ];

    return this.generateResponse(messages);
  }

  /**
   * Generates project ideas.
   * @param {string} topic - The software engineering topic (e.g., Frontend, DevOps).
   * @returns {Promise<string>} - A list of project ideas.
   */
  async generateProjectIdeas(topic) {
    const messages = [
      {
        role: "system",
        content: `You are an experienced software engineer. Suggest five practical project ideas for the topic: "${topic}".`,
      },
      {
        role: "user",
        content: "What projects can I build to practice this topic?",
      },
    ];

    return this.generateResponse(messages);
  }

  /**
   * Generates a skill roadmap.
   * @param {string} topic - The software engineering topic (e.g., Backend Development).
   * @returns {Promise<string>} - A concise roadmap.
   */
  async generateSkillRoadmap(topic) {
    const messages = [
      {
        role: "system",
        content: `You are an educational assistant. Create a skill roadmap for the topic: "${topic}".`,
      },
      {
        role: "user",
        content: "What skills should I focus on to become proficient?",
      },
    ];

    return this.generateResponse(messages);
  }

  /**
   * Facilitates role-based conversation to allow dynamic interactions.
   * @param {Array} conversation - An array of messages with roles (system, user, assistant).
   * @returns {Promise<string>} - The assistant's response to the conversation.
   */
  async engageConversation(conversation) {
    return this.generateResponse(conversation);
  }

  /**
   * Generates a follow-up response using the completions API.
   * @param {string} prompt - The prompt or context for the follow-up.
   * @param {Object} options - Additional parameters for the completions API.
   * @returns {Promise<string>} - The assistant's follow-up response.
   */
  async generateFollowUp(prompt, options = {}) {
    console.log("Prompt for follow-up:", prompt);
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant providing follow-up prompts based on the user's input. Respond in an object-friendly format. Respond in point form with a -",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 200,
        top_p: 0.9,
        presence_penalty: 0.5,
        frequency_penalty: 0.3,
      });
      const followUpText = response.choices[0].message.content.trim();
      const followUpArray = followUpText
        .split("\n") 
        .map((item) => item.trim()) 
        .filter((item) => item.startsWith("-")) 
        .map((item) => item.slice(2)); 

      return followUpArray; 
    } catch (error) {
      console.error("Error generating follow-up:", error);
      throw new Error("Failed to generate follow-up response");
    }
  }
}

module.exports = AIService;
