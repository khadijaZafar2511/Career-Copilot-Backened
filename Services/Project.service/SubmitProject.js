
import ApiError from "../../Utils/ApiError.js"
import UserProject from "../../Models/User.models/ProjectProgress.model.js";
import { viewSubmittedProject }from "../../Utils/User.helper/SubmittedProject.js"
import {uploadStreamToCloudinary } from "../cloudinary.service.js"
import UserRoadmap from "../../Models/User.models/UserRoadmap.model.js";

const getSubmittedProject = async (userId, projectId, submissionDetails,fileBuffer) => {
 
const { submittedProject, roadmapId } = await viewSubmittedProject(
  userId,
  projectId,
  );

  if (submittedProject) {
    throw new ApiError(400, "this project has already submiited");
  }
  const userRoadmap = await UserRoadmap.findOne({ userId, roadmapId, status: "active",progress:100 })
  if (!userRoadmap) {
    throw new ApiError(404,"no active roadmap with 100 progress  has found for this project to submit ")
  }
      const startedProject = await UserProject.findOne({
        userId,
        projectId,
        userRoadmapId:userRoadmap._id,
        status: "in_progress",
      }).populate("projectId", "title description");
      if (!startedProject) {
        throw new ApiError(404, "you have not started project yet to submit");
  }
 

  if (fileBuffer) {
    const cldResult = await uploadStreamToCloudinary(fileBuffer);

     if (!cldResult?.secure_url) {
       throw new ApiError(500, "Cloudinary stream processing failed.");
    }

    startedProject.file = cldResult.secure_url ? cldResult.secure_url : "";
  }
  startedProject.githubUrl = submissionDetails.url?submissionDetails.url:"";
  startedProject.submittedAt = new Date();
  startedProject.submissionNotes = submissionDetails.notes;
  startedProject.description = submissionDetails.description;
  startedProject.status = "submitted";
  userRoadmap.status = "completed";

  await startedProject.save()
   await userRoadmap.save();
  return startedProject;
};

export { getSubmittedProject };
