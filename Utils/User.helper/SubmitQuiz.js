import { getQuiz } from "./FindRoadmapQuiz.js";
import QuizAttempt from "../../Models/User.models/QuizAttempt.model.js";

const getSubmittedQuiz = async (userId, milestoneId, userAnswers, quiz) => {
  let totalObtainMarks = 0;
  let totalPossibleMark = 0;
  let selectedOptions = [];
  let correctAnswerCount = 0;

  quiz.questions.forEach((question) => {
    const correctOption = question.options.find(
      (option) => option.isCorrect === true,
    );
    totalPossibleMark += correctOption ? correctOption.mark : 0;
    const userSubmission = userAnswers.find(
      (answer) => answer.questionId === question._id.toString(),
    );
    const isCorrect = userSubmission.option === correctOption.text;
    if (isCorrect) {
      totalObtainMarks += correctOption ? correctOption.mark : 0;
      correctAnswerCount += 1;
    }
    selectedOptions.push({
      questionId: question._id,
      selectedOption: userSubmission.option,
    });

  
  })

  const finalScorePercentage = (totalObtainMarks / totalPossibleMark) * 100;

  return {
    finalScorePercentage,
    correctAnswerCount,
    totalObtainMarks,
    totalPossibleMark,
    selectedOptions,
  };
};

export { getSubmittedQuiz };
