import ApiError from "../../Utils/ApiError.js";
import { getQuiz } from "../../Utils/User.helper/FindRoadmapQuiz.js";
import QuizAttempt from "../../Models/User.models/QuizAttempt.model.js";
import { getSubmittedQuiz } from "../../Utils/User.helper/SubmitQuiz.js";
import Milestone from "../../Models/Milestone.model.js";
import Roadmap from "../../Models/Roadmap.model.js";
import UserRoadmap from "../../Models/User.models/UserRoadmap.model.js"; 
import UserTasks from "../../Models/User.models/TasksProgress.model.js";
import Tasks from "../../Models/Tasks.model.js";
import UserProject from "../../Models/User.models/ProjectProgress.model.js"
const attemptedQuiz = async (userId, milestoneId,userAnswers) => {
  const quiz = await getQuiz(milestoneId);
  const quizAttempt = await QuizAttempt.findOne({
    userId,
    quizId: quiz._id,
      milestoneId,
  });
  if (!quizAttempt || !quiz) {
    throw new ApiError(404, "user has not strted quiz yet");
  }
  const {
    finalScorePercentage,
    correctAnswerCount,
    totalObtainMarks,
    totalPossibleMark,
    selectedOptions,
  } = await getSubmittedQuiz(userId, milestoneId, userAnswers, quiz);
 
  quizAttempt.score = totalObtainMarks;
  quizAttempt.completedAt = new Date();
  if (!(quizAttempt.status === "completed")) {
    quizAttempt.attemptNumber = 1;
  }
  else {
    quizAttempt.attemptNumber += 1;
  }
  quizAttempt.status = "completed";
  quizAttempt.timeTaken = Math.floor(
    (quizAttempt.completedAt - quizAttempt.startedAt) / 1000,
  );
  quizAttempt.totalQuestions = quiz.questions.length;
  quizAttempt.answers = selectedOptions;
  quizAttempt.correctAnswers = correctAnswerCount;

  await quizAttempt.save();
  const milestone = await Milestone.findById(milestoneId)
  const roadmapId=milestone?.roadmapId
  const userRoadmap = await UserRoadmap.findOne({ userId, roadmapId, status: "active" }).populate("currentMilestone")
  if ( totalObtainMarks >= (( totalPossibleMark)*0.7)) {
    // const tasks = await Tasks.find({ milestoneId })
    // const taskIds=tasks.map(task=>task._id)
    // const usertasks = await UserTasks.find({ taskId: { $in: taskIds }, status: "completed" })
    // if(usertasks.length===taskIds.length){
    const isMatch =
      userRoadmap.currentMilestone._id.toString() ===
      quiz.milestoneId.toString();

    if (isMatch) {
      userRoadmap.currentMilestone.status = "completed"; 
      const nextMilestoneOrder = userRoadmap.currentMilestone.order + 1;
      const nextMilestone = await Milestone.findOne({
        order: nextMilestoneOrder,
        roadmapId,
      });
       const userProject = await UserProject.findOne({
         userId,
         userRoadmapId: userRoadmap._id,
         status: "submitted",
       });
       if (!nextMilestone && userProject) {
         userRoadmap.status = "completed";
         userRoadmap.completedAt = new Date();
         userRoadmap.progress = 100;
       } else if (nextMilestone) {
         nextMilestone.status = "not_started";
         await nextMilestone.save();
         userRoadmap.currentMilestone = nextMilestone;
       }
    }


    // console.log(userRoadmap)
 
  
   
    await userRoadmap.save()}
  // }
  return quizAttempt;
};

export {attemptedQuiz}