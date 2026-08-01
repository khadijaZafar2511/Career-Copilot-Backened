import express from "express";

import { chatWithAI } from "../controllers/ai.controller.js";

const aiRouter = express.Router();

aiRouter.post("/chat", chatWithAI);

export default aiRouter;
