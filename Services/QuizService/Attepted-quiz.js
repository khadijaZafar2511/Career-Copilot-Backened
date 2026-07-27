import QuizAttempt from "../../Models/User.models/QuizAttempt.model.js";
import ApiError from "../../Utils/ApiError.js";


const attemptedQuizes = async(userId) => {
      
  const attemptedQuizesByUser = await QuizAttempt.find({ userId }).sort({
    completedAt: -1,
  }).populate("roadmapId","title").populate("quizId","title");
    return attemptedQuizesByUser;
}



const oneAttemptedQuiz = async (userId,quizId) => {
   
    const attemptedQuiz = await QuizAttempt.findOne({ userId, _id: quizId });
    if (!attemptedQuiz) {
        throw new ApiError(404, "attempted quiz  has not found");
      }
    return attemptedQuiz;
}

export {attemptedQuizes, oneAttemptedQuiz}