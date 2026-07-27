import express from "express";
import asyncHandler from "../../Utils/AsyncHandler.js";
import {roadmapQuiz,startQuiz,submitQuiz,quizAttempts,oneQuizAttempt,reAttemptQuiz} from "../../Controllers/Users.controller/Quiz.controller.js"
const quizRouter = express.Router()

quizRouter.get("/:milestoneid", asyncHandler(roadmapQuiz));
quizRouter.post("/:milestoneid/start", asyncHandler(startQuiz));
quizRouter.post("/:milestoneid/submit", asyncHandler(submitQuiz));  
quizRouter.get("/attempts", asyncHandler(quizAttempts));
quizRouter.get("/attempts/:attemptedQuizId", asyncHandler(oneQuizAttempt));
quizRouter.patch(
  "/:attemptedQuizId/reAttempt",
  asyncHandler(reAttemptQuiz),
);


export default quizRouter;
