import mongoose from "mongoose";
import User from "./User.model.js"
import Quiz from "../Quiz.model.js"
import  Milestone from "../Milestone.model.js"
const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    selectedOption: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const quizAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    milestoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Milestone",
      required: true,
    },

    score: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    correctAnswers: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
    },
    attemptNumber: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["submitted", "pending", "completed"],
    },

    answers: {
      type: [answerSchema],
      default: [],
    },

    startedAt: {
      type: Date,
      required: true,
    },

    completedAt: {
      type: Date,
    },

    timeTaken: {
      type: Number, // seconds
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const QuizAttempt = mongoose.model("QuizAttempt", quizAttemptSchema);

export default QuizAttempt;
