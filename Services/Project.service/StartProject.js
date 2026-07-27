import UserProject from "../../Models/User.models/ProjectProgress.model.js";
import UserRoadmap from "../../Models/User.models/UserRoadmap.model.js";
import { viewSubmittedProject } from "../../Utils/User.helper/SubmittedProject.js"
import ApiError from "../../Utils/ApiError.js"
const getStartProject = async (userId, projectId) => {
    const { submittedProject,roadmapId } = await viewSubmittedProject(
      userId,
      projectId,
    );
      if (submittedProject) {
        throw new ApiError(400, "this project has already submiited");
  }
    const userRoadmap = await UserRoadmap.findOne({ userId, roadmapId, status: "active", progress:100 })
  if (!userRoadmap) {
    throw new ApiError(404, "no active roadmap has found for this project to submit ")
  }
   const startedProject = await UserProject.findOne({
              userId,
              projectId,
              userRoadmapId:userRoadmap._id,
              status: "in_progress",
            }).populate("projectId", "title description");
 
  if (startedProject) {
    return startedProject;
}
  
      const startProject = await UserProject.create({
        userId,
        projectId,
        userRoadmapId:userRoadmap._id,
        status: "in_progress",
      });

      return startProject;
}

export {getStartProject}