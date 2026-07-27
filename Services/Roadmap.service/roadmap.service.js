import  Milestone  from "../../Models/Milestone.model.js"
import Tasks  from "../../Models/Tasks.model.js"
import Resources from "../../Models/Resources.model.js"
import  UserRoadmap  from "../../Models/User.models/UserRoadmap.model.js"
import Roadmap from "../../Models/Roadmap.model.js"
import { buildRoadmapResponse } from "../../Utils/User.helper/BuildRoadmapRes.js"
import {updateRoadmapProgress} from "../../Services/UserProgress.service/RoadmapProgress.service.js"
import { getNextTask } from "../../Utils/User.helper/GetNextTask.js"
import ApiError from "../../Utils/ApiError.js"
import UserTasks from "../../Models/User.models/TasksProgress.model.js"
import Quiz from "../../Models/Quiz.model.js"
import QuizAttempt from "../../Models/User.models/QuizAttempt.model.js"
export const getRoadmapDetail = async (roadmapId, userId) => {
 const roadmap = await Roadmap.findById(roadmapId).lean();
  if (!roadmap) {
    throw new ApiError(404, "Roadmap has not been found");
  }
  // Step 1: Query Milestones sequentially first to discover children IDs safely
  const milestones = await Milestone.find({ roadmapId })
    .sort({ order: 1 })
    .lean();
  const milestoneIds = milestones.map((m) => m._id);
  // const quizes = await Quiz.find({ milestoneId: { $in: milestoneIds } });
  // const quizIds = quizzes.map((quiz) => quiz._id);
  // const userQuizes = await QuizAttempt.find({userId, quizId: { $in: quizIds },status: "completed"  })
  // Step 2: Fetch tasks and core user progress in parallel to reduce database lag
  const [tasks, userRoadmap] = await Promise.all([
    Tasks.find({ milestoneId: { $in: milestoneIds } })
      .sort({ order: 1 })
      .lean(),
    userId
      ? UserRoadmap.findOne({
          userId,
          roadmapId,
          status: { $in: ["active","completed","paused"] },
        }).populate("currentMilestone")
      : null,
  ]);

  // Step 3: Concurrently batch secondary user records and task assets
  const taskIds = tasks.map((t) => t._id);

  const [resources, userTasks] = await Promise.all([
    Resources.find({ taskId: { $in: taskIds } }).lean(),
    userRoadmap
      ? UserTasks.find({ userId, userRoadmapId: userRoadmap._id }).lean()
      : [],
  ]);
   
    
  let roadmapProgress = 0;
    let  completedTasks=0
  let totalTasks = tasks.length;
  let nextTask = null;
  let status = "paused";
  if (userRoadmap) {
   
   const  userRoadmapId = userRoadmap._id;
        const progress =
          await updateRoadmapProgress(userId, userRoadmapId);
    roadmapProgress = progress.roadmapProgress;
    completedTasks = progress.completedTasks;
    totalTasks = progress.totalTasks;
  }

    // Step 4: Inject clean dataset arrays straight into the formatter helper

    const roadmapResponse =await buildRoadmapResponse({
        userId,
    roadmap,
    milestones,
    tasks,
    resources,
    userRoadmap: userRoadmap||"",
    userTasks,
});

    if (userRoadmap && userRoadmap.status === "active") {
       nextTask =await getNextTask(userRoadmap);
  }
 // roadmapProgress = roadmapProgress ? roadmapProgress : 0;
  // completedTasks = completedTasks ? completedTasks : 0;
  // tot

   return {
     ...roadmapResponse,
     roadmapProgress,
     completedTasks,
     totalTasks, // && userRoadmap.status === "active"
     status: userRoadmap? userRoadmap.status: "not_started",
     ...(userRoadmap && {
      //  status: userRoadmap.status,
       nextTask,
       currentMilestone: userRoadmap.currentMilestone,
     }),
   };
};
