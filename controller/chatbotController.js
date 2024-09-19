import run from "../utils/chatbot.js";

let conversationHistory = []; // Liste pour stocker les messages et réponses

const chat = (req, res) => {
  return res.render("chatbot", { conversation: conversationHistory });
};

const ask = async (req, res) => {
  const userQuestion = req.body.question;
  const chatbotAnswer = await run(req.body.question);
  const textAnswer = await chatbotAnswer.response.text();

  // Ajouter le nouveau message et réponse à la liste des conversations
  conversationHistory.push({ question: userQuestion, answer: textAnswer });

  return res.render("chatbot", { conversation: conversationHistory });
};

export default { chat, ask };
