import "dotenv/config";

import { GoogleGenerativeAI } from "@google/generative-ai";

import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function run(question) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = question;

  const result = await model.generateContent(prompt);

  console.log("ChatbotAnswer", result.response.text());

  return result;
}

export default run;