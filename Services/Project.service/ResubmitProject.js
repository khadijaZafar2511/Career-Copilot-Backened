import ApiError from "../../Utils/ApiError.js";
import UserProject from "../../Models/User.models/ProjectProgress.model.js";
import { viewSubmittedProject } from "../../Utils/User.helper/SubmittedProject.js";

const getReSubmittedProject = async (userId, projectId, submissionDetails) => {
  const {submittedProject} = await viewSubmittedProject(
    userId,
    projectId,
  );
  if (!submittedProject) {
    throw new ApiError(404, "there is no submitted project to resubmit");
  }
  
   
  submittedProject.githubUrl = submissionDetails.githubUrl,
    submittedProject.submittedAt = new Date(),
    submittedProject.submissionNotes = submissionDetails.submissionNotes,
    submittedProject.status = "submitted",
    await submittedProject.save();

  return submittedProject;
};

export { getReSubmittedProject };
