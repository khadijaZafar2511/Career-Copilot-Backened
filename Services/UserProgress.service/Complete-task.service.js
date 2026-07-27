import UserTasks from "../../Models/User.models/TasksProgress.model.js";
import ApiError from "../../Utils/ApiError.js";
import ApiResponse from "../../Utils/ApiResponse.js";
import Tasks from "../../Models/Tasks.model.js";
import UserRoadmap from "../../Models/User.models/UserRoadmap.model.js";
import Milestone from "../../Models/Milestone.model.js";
import Quiz from "../../Models/Quiz.model.js";
import QuizAttempt from "../../Models/User.models/QuizAttempt.model.js";


const completeTaskService = async (userId, taskId, userRoadmapId) => {
  const userRoadmap = await UserRoadmap.findOne({ userId, _id: userRoadmapId, status: "active" }).populate("currentMilestone")
  if (!userRoadmap) {
    throw new ApiError(404,"this roadmap belong to this user has not found")
  }
 
const roadmapId=userRoadmap.roadmapId

          const completedTask = await UserTasks.findOne({
            userId,
            userRoadmapId,
            taskId,
            status: "completed",
          });
          if (completedTask) {
              throw new ApiError(400,"this task has already marked as completed")
          }
  const task = await Tasks.findById(taskId)
  if (!task) {
    throw new ApiError(404, "task with id has not found")
  }
          const milestoneId = task.milestoneId;
  const milestone = await Milestone.findById(milestoneId);
  if (!milestone) {
    throw new ApiError(404,"milestone belongs to taks has not found")
  }
  if (!(milestone.roadmapId.toString() === roadmapId.toString()))
  {
    throw new ApiError(
      400,
      "The provided task does not belong to this user's roadmap.",
    );
  }
  let taskOrder = task.order;
    if (taskOrder > 1) {
      const order = task.order - 1;
      const prevTask = await Tasks.findOne({ milestoneId, order });
      if (prevTask) {
        const userPrevTask = await UserTasks.findOne({
          userId,
          userRoadmapId,
          taskId: prevTask._id,
          status:"completed"
        });
        if (!userPrevTask) {
          throw new ApiError(
            400,
            "Complete the previous task before continuing.",
          );
        }
      }
  }
   
  
          const taskCompleted = await UserTasks.create({
            userId,
            taskId,
              userRoadmapId,
            status: "completed",
             completedAt: Date.now()
          });
          if (!taskCompleted) {
            throw new ApiError(400, "tasks has not completed successfully")
            
  }
  if (taskOrder === 1) {
     
    userRoadmap.currentMilestone.status = "active";
  
  }

  const nextTask = await Tasks.findOne({ milestoneId, order: taskOrder + 1 })
  // if (!nextTask) {
  //   const quiz = await QuizAttempt.findOne({userId, milestoneId, status: "completed" })
  //   if (quiz) {
  //      userRoadmap.currentMilestone.status = "completed";
  //      const nextMilestoneOrder = userRoadmap.currentMilestone.order + 1;
  //      const nextMilestone = await Milestone.findOne({
  //        order: nextMilestoneOrder,
  //        roadmapId,
  //      });

  //      if (!nextMilestone) {
  //        userRoadmap.status = "completed";
  //        userRoadmap.completedAt = new Date();
  //        userRoadmap.progress = 100;
  //      } else {
  //        nextMilestone.status = "not_started";
  //        await nextMilestone.save();
  //        userRoadmap.currentMilestone = nextMilestone;
  //      }
  //   }
   
  // }
    await userRoadmap.save();
  return taskCompleted;
        
    
}




export default completeTaskService;
