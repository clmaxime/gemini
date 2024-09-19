import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Lire et analyser le fichier JSON
const intents = JSON.parse(fs.readFileSync('intents.json', 'utf8'));

function findIntent(question) {
  // Parcours les intents pour trouver une correspondance
  for (const intent of intents.intents) {
    for (const pattern of intent.patterns) {
      if (question.toLowerCase().includes(pattern.toLowerCase())) {
        return intent.response;
      }
    }
  }
  return null;
}

async function run(question) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const predefinedResponse = findIntent(question);

  if (predefinedResponse) {
    return { response: { text: () => predefinedResponse } };
  }

  const context = "Ton rôle est d'aider les utilisateurs concernant le service de livraison FastDeliv. Si l'utilisateur évoque un sujet qui ne concerne pas le service de livraison, informe-le que tu es exclusivement programmé pour répondre à des questions à ce sujet et reste toujours professionnel. Le contexte est que tu es un chatbot dédié au service client de FastDeliv, donc tes réponses doivent se limiter aux questions liées à ce service. Tes actions doivent se concentrer sur la gestion des demandes et des questions spécifiques à FastDeliv, en veillant à fournir des réponses claires, précises et adaptées aux besoins des utilisateurs.";

  const prompt = `Contexte : ${context} Question de l'utilisateur : ${question}`;

  const result = await model.generateContent(prompt);

  console.log("ChatbotAnswer", result.response.text());

  return result;
}

export default run;
