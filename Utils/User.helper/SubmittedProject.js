import ApiError from "../ApiError.js";
import Projects from "../../Models/Projects.model.js";
import Roadmap from "../../Models/Roadmap.model.js";
import UserProject from "../../Models/User.models/ProjectProgress.model.js";
import UserRoadmap from "../../Models/User.models/UserRoadmap.model.js";


const viewSubmittedProject = async (userId, projectId) => {
  // 1. Validation guards: Block execution immediately if criteria are missing
  if (!userId || !projectId) {
    throw new ApiError(400, "User ID and Project ID are required parameters.");
  }

  // 2. Query Project using .lean() to bypass heavy Mongoose instance wrappers
  const project = await Projects.findById(projectId).lean();
  if (!project) {
    throw new ApiError(404, "Project with this ID was not found.");
  }

  const roadmapId = project.roadmapId;

  // 3. Find active tracking profile
  const userRoadmap = await UserRoadmap.findOne({
    userId,
    roadmapId,
    status: "completed",
  }).lean();

  // 4. Branch Logic: Safe Fallback layout if tracker doesn't exist
  if (!userRoadmap) {
    return {
      submittedProject: null,
      userRoadmapId: null,
      roadmapId,
    };
  }

  const userRoadmapId = userRoadmap._id;

  // 5. Fetch submission metadata profile
  const submittedProject = await UserProject.findOne({
    userId,
    projectId,
    userRoadmapId,
    status: "submitted",
  })
    .populate("projectId", "title description")
    .lean();

  return {
    submittedProject: submittedProject || null,
    userRoadmapId,
    roadmapId,
  };
};


export { viewSubmittedProject };