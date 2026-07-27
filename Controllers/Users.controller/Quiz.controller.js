import mongoose from "mongoose";
import { getQuiz } from "../../Utils/User.helper/FindRoadmapQuiz.js";
import { reAttemptedQuiz } from "../../Services/QuizService/reAttempt-quiz.js"
import {attemptedQuizes, oneAttemptedQuiz}  from "../../Services/QuizService/Attepted-quiz.js"
import { attemptedQuiz } from "../../Services/QuizService/submit-quiz.js";
import { startedQuiz } from "../../Services/QuizService/Start-quiz.js"
import ApiResponse from "../../Utils/ApiResponse.js"
const roadmapQuiz = async (req, res) => {
  const milestoneId = new mongoose.Types.ObjectId(req.params?.milestoneid);
  const quiz = await getQuiz(milestoneId);
  const response = new ApiResponse(200, quiz, "quiz you have requested for");
  res.status(response.statusCode).json(response);
};

const startQuiz = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user?._id);
 const milestoneId = new mongoose.Types.ObjectId(req.params?.milestoneid);
  const quizStarted = await startedQuiz(userId, milestoneId);
  const response = new ApiResponse(200, quizStarted, "Quiz started!");
  res.status(response.statusCode).json(response);
};


const submitQuiz = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user?._id);
  const userAnswers = req.body;
  const milestoneId = new mongoose.Types.ObjectId(req.params?.milestoneid);
   const quiz = await getQuiz(milestoneId);
  const submittedQuiz = await attemptedQuiz(userId, milestoneId, userAnswers,quiz);
  const response = new ApiResponse(
    200,
    submittedQuiz,
    "Quiz submitted successfully!!",
  );
  res.status(response.statusCode).json(response);
};



const quizAttempts = async (req, res) => {
  let response;
  const userId = new mongoose.Types.ObjectId(req.user?._id);
  const attemptedQuizesByUser = await attemptedQuizes(userId)
    if (attemptedQuizesByUser.length === 0) {
      response = new ApiResponse(
        200,
        attemptedQuizesByUser,
        "you have attempted any quiz yet",
      );
    } else {
      response = new ApiResponse(
        200,
        attemptedQuizesByUser,
        "your attepted quizzes",
      );
    }
  res.status(response.statusCode).json(response);
};
const oneQuizAttempt = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user?._id);
  const quizId = new mongoose.Types.ObjectId(req.params?.attemptedQuizId);
  const attemptedQuiz = await oneAttemptedQuiz(userId, quizId);
  
  const response = new ApiResponse(200, attemptedQuiz, "your attepted quiz");

  res.status(response.statusCode).json(response);
};



const reAttemptQuiz = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user?._id);
  const quizId = new mongoose.Types.ObjectId(req.params?.attemptedQuizId);

  const quizAttempt = await reAttemptedQuiz(userId, quizId);
  const response = new ApiResponse(
    200,
    quizAttempt,
    "Quiz reAttempted  successfully!!",
  );
  res.status(response.statusCode).json(response);
};

export {
  roadmapQuiz,
  startQuiz,
  submitQuiz,
  quizAttempts,
  oneQuizAttempt,
  reAttemptQuiz,
};
