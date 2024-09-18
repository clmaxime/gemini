import express from "express";
import chatbotController from "../controller/chatbotController.js";

const router = express.Router();

router.get("/", chatbotController.chat);

router.post("/ask", chatbotController.ask);

export default router;
