import { getCurrentMilestone } from "../../Utils/User.helper/GetCurrentMilestone.js";
import { getactiveRoadmap } from "../../Utils/User.helper/GetActiveRoadmap.js";
import { getNextTask } from "../../Utils/User.helper/GetNextTask.js";
import { updateRoadmapProgress } from "./RoadmapProgress.service.js";
const getDashboardStats = async (userId) => {
  const activeRoadmap = await getActiveRoadmap(userId);

  const [
    currentMilestone,
    nextTask,
    roadmapProgress,
    completedRoadmaps,
    pausedRoadmaps,
  ] = await Promise.all([
    getCurrentMilestone(userId),
    getNextTask(userId),
    updateRoadmapProgress(userId, activeRoadmap._id),
    UserRoadmap.find({
      userId,
      status: "completed",
    }).populate("roadmapId", "title icon description"),

    UserRoadmap.find({
      userId,
      status: "paused",
    }).populate("roadmapId", "title icon description"),
  ]);

  return {
    activeRoadmap,
    currentMilestone,
    nextTask,

    roadmapProgress: roadmapProgress.progress,
    completedTasks: roadmapProgress.completedTasks,
    totalTasks: roadmapProgress.totalTasks,

    completedRoadmaps,
    pausedRoadmaps,
  };
};
export { getDashboardStats };