import mongoose from "mongoose";
import  Milestone  from "./Milestone.model.js" 
const quizOptionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },

    isCorrect: {
      type: Boolean,
      required: true,
      default: false,
    },
    mark: {
      type: Number,
      required:true
    }
  },
);

const quizQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    explanation: {
      type: String,
    },

    options: {
      type: [quizOptionSchema],
      validate: [
        (options) => options.length >= 2,
        "Each question must have at least two options.",
      ],
    },
  }
);

const quizSchema = new mongoose.Schema(
  {
    milestoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Milestone",
      required: true,
   
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    passingScore: {
      type: Number,
      required: true,
      default: 70,
      min: 0,
      max: 100,
    },

    estimatedTime: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: ["minutes", "hours"],
        default: "minutes",
      },
    },

    questions: {
      type: [quizQuestionSchema],
      validate: [
        (questions) => questions.length > 0,
        "Quiz must contain at least one question.",
      ],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
