import Milestone from "../../Models/Milestone.model.js";

const createGroupMap = (array, idKey) => {
  return array.reduce((acc, item) => {
    const key = item[idKey]?.toString();
    if (key) {
      acc[key] = acc[key] || [];
      acc[key].push(item);
    }
    return acc;
  }, {});
};

/**
 * Maps an array into a direct dictionary (one-to-one) using stringified keys.
 */
const createDirectMap = (array, idKey) => {
  return array.reduce((acc, item) => {
    const key = item[idKey]?.toString();
    if (key) acc[key] = item;
    return acc;
  }, {});
};

/**
 * Pure function to transform raw database metrics into an ordered roadmap tree.
 */
export const buildRoadmapResponse = async ({
  userId,
  roadmap,
  milestones,
  tasks,
  resources,
  userRoadmap,
  userTasks,
}) => {
  // 1. Structural Pre-Mapping (Removed unnecessary awaits since functions are synchronous)
  const resourceMap = createGroupMap(resources, "taskId");
  const tasksWithResources = tasks.map((task) => {
    const taskIdStr = task._id ? task._id.toString() : "";
    return {
      ...task,
      resources: resourceMap[taskIdStr] || [],
    };
  });

  const taskMap = createGroupMap(tasksWithResources, "milestoneId");
  let formattedMilestones = [];

  // BRANCH A: User is logged in and tracking progress
  if (userRoadmap) {
    const currentMilestone = userRoadmap.currentMilestone;
    const userTaskMap = createDirectMap(userTasks, "taskId");

    const calculateMilestoneStatus = (ms) => {
      if (!currentMilestone) return "not_started";
      if (ms._id?.toString() === currentMilestone._id?.toString()) {
        return currentMilestone.status || "in_progress";
      }
      return ms.order < currentMilestone.order ? "completed" : "locked";
    };

    const calculateTaskStatus = (task, milestoneStatus) => {
      const userTask = userTaskMap[task._id?.toString()];
      if (userTask) return userTask.status;
      return milestoneStatus === "in_progress" ||
        milestoneStatus === "incomplete"
        ? "incomplete"
        : "locked";
    };

    formattedMilestones = milestones.map((ms) => {
      let msStatus = calculateMilestoneStatus(ms);
      const msIdStr = ms._id ? ms._id.toString() : "";
      const rawTasks = taskMap[msIdStr] || [];

      // TRACKER: Assume all tasks are finished for this specific milestone
      let allTasksCompleted = true;

      const formattedTasks = rawTasks.map((task) => {
        const userTask = userTaskMap[task._id?.toString()];
        const taskStatus = calculateTaskStatus(task, msStatus);

        // If even one single task inside this milestone isn't complete, flip flag
        if (taskStatus !== "completed") {
          allTasksCompleted = false;
        }

        return {
          ...task,
          status: taskStatus,
          completedAt: userTask?.completedAt || null,
        };
      });

      // FIX: If milestone is active ("in_progress"), has tasks, and ALL of them are finished,
      // override and upgrade its status badge to "completed"
      if (
        msStatus === "in_progress" &&
        rawTasks.length > 0 &&
        allTasksCompleted
      ) {
        msStatus = "completed";
      }

      return {
        ...ms,
        status: msStatus,
        tasks: formattedTasks,
      };
    });
  }
  // BRANCH B: Guest View Default State
  else {
    formattedMilestones = milestones.map((ms, index) => {
      const msStatus = index === 0 ? "not_started" : "locked";
      const msIdStr = ms._id ? ms._id.toString() : "";
      const rawTasks = taskMap[msIdStr] || [];

      return {
        ...ms,
        status: msStatus,
        tasks: rawTasks.map((task) => ({
          ...task,
          status: msStatus === "not_started" ? "not_started" : "locked",
          completedAt: null,
        })),
      };
    });
  }

  return {
    ...roadmap,
    milestones: formattedMilestones,
  };
};
