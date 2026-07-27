import Tasks from "../../Models/Tasks.model.js";
import Milestone from "../../Models/Milestone.model.js";
import UserTasks from "../../Models/User.models/TasksProgress.model.js";
const getNextTask = async (activeRoadmap) => {
  const lastCompletedTask = await UserTasks.findOne({
    userId: activeRoadmap.userId,
    userRoadmapId: activeRoadmap._id,
    milestoneId: activeRoadmap.currentMilestone,
  }).sort({
    completedAt: -1,
  });

  let order = 1;

  if (lastCompletedTask) {
    const task = await Tasks.findById(lastCompletedTask.taskId);
    order = task.order + 1;
  }

  let nextTask = await Tasks.find({
    milestoneId: activeRoadmap.currentMilestone,
    order: { $gte: order },
  });

  if (nextTask.length!==0) {
    return nextTask.slice(0,4);
  }

  // milestone finished
  const nextMilestone = await Milestone.findOne({
    roadmapId: activeRoadmap.roadmapId,
    order: activeRoadmap.currentMilestone.order + 1,
  });

  if (!nextMilestone) {
    activeRoadmap.currentMilestone.status = "completed"
    activeRoadmap.currentMilestone=null
    await activeRoadmap.save()
    return null;
  }

  return Tasks.findOne({
    milestoneId: nextMilestone._id,
    order: 1,
  });
};

export { getNextTask };