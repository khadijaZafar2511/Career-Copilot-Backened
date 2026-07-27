
import Milestone from "../../Models/Milestone.model.js";
import Tasks from "../../Models/Tasks.model.js";
import UserTasks from "../../Models/User.models/TasksProgress.model.js";
import UserRoadmap from "../../Models/User.models/UserRoadmap.model.js";
import ApiError from "../../Utils/ApiError.js";



const updateMilestoneProgress = async (userId,userRoadmapId,milestoneId) => {
   
     const userRoadmap = await UserRoadmap.findOne({ userId, _id: userRoadmapId, status: "active" })
    if (!userRoadmap) {
        throw new ApiError(404,"userRoadmap with id not exist")
    }
    const roadmapId = userRoadmap.roadmapId;
    const milestone = await Milestone.findOne({ _id: milestoneId, roadmapId })
    if (!milestone) {
        throw new ApiError(404,"milestone with this id has not found")
    }
    let totalTasks = await Tasks.countDocuments({
      milestoneId: milestone._id,
    });
    let completedTasks = await UserTasks.countDocuments({
      userId,
      userRoadmapId,
      milestoneId,
    });
  let milestoneProgress;
    if (totalTasks !== 0) {
         milestoneProgress = (completedTasks / totalTasks) * 100;
        
    }
    else {
     milestoneProgress = 0;
      completedTasks = 0;
      totalTasks=0
    }
  return { milestoneProgress, completedTasks, totalTasks };

    
}

export { updateMilestoneProgress };