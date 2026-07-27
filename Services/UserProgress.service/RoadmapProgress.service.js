import Milestone from "../../Models/Milestone.model.js";
import Tasks from "../../Models/Tasks.model.js";
import UserProject from "../../Models/User.models/ProjectProgress.model.js";
import UserTasks from "../../Models/User.models/TasksProgress.model.js";
import UserRoadmap from "../../Models/User.models/UserRoadmap.model.js";
import ApiError from "../../Utils/ApiError.js";

const updateRoadmapProgress = async (userId, userRoadmapId) => {
  const userRoadmap = await UserRoadmap.findOne({
    userId,
    _id: userRoadmapId,
    status:{ $in:["active","completed","paused"]},
  });
  if (!userRoadmap) {
    throw new ApiError(404, "userRoadmap with id not exist");
  }
  let completedTasks = await UserTasks.countDocuments({
    userId,
    userRoadmapId,
  });
  const roadmapId = userRoadmap.roadmapId;
  const milestoneIds = await Milestone.distinct("_id", { roadmapId });
  if (milestoneIds.length === 0) {
    throw new ApiError(400, "roadmap without milestone is invalid");
  }
  let totalTasks = await Tasks.countDocuments({
    milestoneId: { $in: milestoneIds },
  });
  let roadmapProgress;
  if (totalTasks !== 0) {
    roadmapProgress = Math.round((completedTasks / totalTasks) * 100);
  } else {
    roadmapProgress = 0;
    completedTasks = 0;
    totalTasks = 0;
  }
  userRoadmap.progress = roadmapProgress;
  const userProject = await UserProject.findOne({ userId, userRoadmapId, status: "submitted" })
  
  if (roadmapProgress === 100 && userProject) {
    userRoadmap.status = "completed";
  }
  await userRoadmap.save();
  return { roadmapProgress, completedTasks, totalTasks };
};
export { updateRoadmapProgress };
