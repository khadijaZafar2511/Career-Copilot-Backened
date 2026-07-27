import QuizAttempt from "../../Models/User.models/QuizAttempt.model.js";
import ApiError from "../../Utils/ApiError.js";
import { getQuiz } from "../../Utils/User.helper/FindRoadmapQuiz.js";
import UserTasks from "../../Models/User.models/TasksProgress.model.js";
import Tasks from "../../Models/Tasks.model.js";
const startedQuiz = async (userId, milestoneId) => {
     const tasks = await Tasks.find({ milestoneId })
      const taskIds = tasks.map(task => task._id)
      const usertasks = await UserTasks.find({ taskId: { $in: taskIds }, status: "completed" ,userId})
  if (usertasks.length < taskIds.length) {
      // console.log(usertasks.length, taskIds.length);
      throw  new ApiError(400,"complete your tasks before starting quiz")
     }
  const quiz = await getQuiz(milestoneId);
  const quizId = quiz._id;
  const alreadyAttempted = await QuizAttempt.findOne({
    userId,
    quizId,
    milestoneId,
   
  });
  if (alreadyAttempted) {
    return alreadyAttempted;
  }
  const quizAttempt = await QuizAttempt.create({
    userId,
    quizId,
    status: "pending",
    startedAt: new Date(),
    milestoneId,
  });
  if (!quizAttempt) {
    throw new ApiError(400, "there is an error while creating quiz");
  }
  return quizAttempt;
};

export { startedQuiz };
