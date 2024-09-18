import run from "../utils/chatbot.js";

const chat = (req, res) => {

  return res.render("chatbot");
};

const ask = async (req, res) => {
  console.log(req.body.question);

  const userQuestion = req.body.question;
  const chatbotAnswer = await run(req.body.question);
  const textAnswer = await chatbotAnswer.response.text();

  return res.render("chatbot", { answer: textAnswer, question: userQuestion });
};

export default { chat, ask };
