
import mongoose from "mongoose"
import UserTasks from "../../Models/User.models/TasksProgress.model.js";
import ApiError from "../../Utils/ApiError.js";
import ApiResponse from "../../Utils/ApiResponse.js";
import Tasks from "../../Models/Tasks.model.js"
import completeTaskService from "../../Services/UserProgress.service/Complete-task.service.js"
import { updateRoadmapProgress } from "../../Services/UserProgress.service/RoadmapProgress.service.js"
import { updateMilestoneProgress } from "../../Services/UserProgress.service/MilestoneProgress.service.js"
import { getDashboardStats } from "../../Services/UserProgress.service/DashboardProgress.service.js";
const completeTask = async (req, res) => {
    
        const taskId = new mongoose.Types.ObjectId(req.params?.id);
        const userRoadmapId = new mongoose.Types.ObjectId(req.params?.userRoadmapid);
        const userId = new mongoose.Types.ObjectId(req.user?._id);
        const taskCompleted = await completeTaskService(userId,taskId,userRoadmapId)
        const response = new ApiResponse(200,taskCompleted, "task has marked completed successfully ")
        res.status(response.statusCode).json(response);
  
};


const getRoadmapProgress = async (req, res) => {

      const userRoadmapId = new mongoose.Types.ObjectId(req.params?.userRoadmapid);
        const userId = new mongoose.Types.ObjectId(req.user?._id);
  const { roadmapProgress, completedTasks, totalTasks } = await updateRoadmapProgress(userId, userRoadmapId);
 
  
  const response = new ApiResponse(200, { roadmapProgress,completedTasks, totalTasks }, "roadmap progress")
  res.status(response.statusCode).json(response)
};

const getMilestoneProgress = async (req, res) => {
  const userRoadmapId = new mongoose.Types.ObjectId(req.params?.userRoadmapid);
  const userId = new mongoose.Types.ObjectId(req.user?._id);
  const milestoneId=new mongoose.Types.ObjectId(req.params?.milestoneid)
  const { milestoneProgress, completedTasks, totalTasks } =
    await updateMilestoneProgress(userId, userRoadmapId, milestoneId);

  const response = new ApiResponse(
    200,
    { milestoneProgress, completedTasks, totalTasks }," milestonse progress"
  );
  res.status(response.statusCode).json(response);
};

const getDashboardProgress = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user?._id);
    
  const  {
    activeRoadmap,
    currentMilestone,
    nextTask,
    roadmapProgress,
    completedTasks,
    totalTasks,
    completedRoadmaps,
    pausedRoadmaps,
  } =
    await updatedDashboardProgress(userId);
   const response = new ApiResponse(
     200,
     {
       activeRoadmap,
       currentMilestone,
       nextTask,
       roadmapProgress,
       completedTasks,
       totalTasks,
       completedRoadmaps,
       pausedRoadmaps,
     },
     " dashboard progress",
   );
   res.status(response.statusCode).json(response);
};

export { getDashboardProgress, getRoadmapProgress, getMilestoneProgress,completeTask };