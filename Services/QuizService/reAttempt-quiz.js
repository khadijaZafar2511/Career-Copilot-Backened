import { getQuiz } from "../../Utils/User.helper/FindRoadmapQuiz.js";
import { getSubmittedQuiz } from "../../Utils/User.helper/SubmitQuiz.js";
import { startQuiz } from "../../Controllers/Users.controller/Quiz.controller.js";
import QuizAttempt from "../../Models/User.models/QuizAttempt.model.js";

const reAttemptedQuiz = async (userId, quizId) => {
  
  const attemptedQuiz = await QuizAttempt.findOne({
    userId,
    _id: quizId,
    status: "completed",
  });
    if (!attemptedQuiz) {
      throw new ApiError(
        400,
        "Cannot reattempt a quiz that has never been attempted or found.",
      );
    }
  const milestoneId = attemptedQuiz.milestoneId;
  const quiz = await getQuiz(milestoneId);

  const quizStarted = await startedQuiz(userId,milestoneId);

  return quizStarted;
};

export { reAttemptedQuiz };
