import dotenv from "dotenv";
import Route from "./routes/chatbotRoutes.js";
import express from "express";

const app = express();
const dotenvConfig = dotenv.config();

const PORT = process.env.PORT || 7777;

// Configurer le moteur de templates EJS
app.set("view engine", "ejs");

// Dossier contenant les fichiers EJS (par défaut "views")
app.set("views", "./public/views");

// static files
app.use(express.static("public"));

//Middleware méthode POST
app.use(express.urlencoded({ extended: true }));

app.use("/", Route);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
