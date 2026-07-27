import mongoose from "mongoose";
import ApiResponse from "../../Utils/ApiResponse.js"
import { getProjectDetail } from "../../Services/Project.service/GetProjectDetail.js"
import { getRoadmapProject } from "../../Services/Project.service/GetRoadmapProject.js";
import { getReSubmittedProject } from "../../Services/Project.service/ResubmitProject.js"
import { getSubmittedProjectDetail } from "../../Services/Project.service/GetSubmittedProject.js"
import { getProject } from "../../Services/Project.service/GetAllProjects.js"
import { getStartProject } from "../../Services/Project.service/StartProject.js"
import { getSubmittedProject } from "../../Services/Project.service/SubmitProject.js"
const projectForRoadmap = async (req, res) => {
  const roadmapId = new mongoose.Types.ObjectId(req.params?.roadmapid)

    const project = await getRoadmapProject(roadmapId);
    const response = new ApiResponse(
      200,
      project,
      "Project details retrieved successfully.",
    );
    res.status(response.statusCode).json(response)
}
const allProjects = async (req, res) => {

  const project = await getProject();
  const response = new ApiResponse(
    200,
    project,
    "Project details retrieved successfully.",
  );
  res.status(response.statusCode).json(response);
};


const viewProjectDetail = async (req, res) => {
  const roadmapId = new mongoose.Types.ObjectId(req.params?.roadmapid);
   const userId = new mongoose.Types.ObjectId(req.user?._id);
const projectDetail = await getProjectDetail(userId,roadmapId)
      const response = new ApiResponse(
        200,
        projectDetail,
        "Project for this roadmap has found",
      );
      res.status(response.statusCode).json(response);
};


const submitProject = async (req, res) => {
      const submissionDetails = req.body;
 const userId = new mongoose.Types.ObjectId(req.user?._id);
  const projectId = new mongoose.Types.ObjectId(req.params?.projectid);
   const fileBuffer = req.file ? req.file.buffer : null;
    const submittedProject = await getSubmittedProject(userId, projectId, submissionDetails, fileBuffer);
    const response = new ApiResponse(200, submittedProject, "your project has submitted successfully!!")
    res.status(response.statusCode).json(response)
};

const viewSubmittedProject = async (req, res) => {
 const userId = new mongoose.Types.ObjectId(req.user?._id);
    const projectId = new mongoose.Types.ObjectId(req.params?.projectid);
    const submittedProjectDetail = await getSubmittedProjectDetail(userId, projectId);
     const response = new ApiResponse(
       200,
       submittedProjectDetail,
       "Details for your submitted project!",
     );
     res.status(response.statusCode).json(response);
};

const resubmitProject = async (req, res) => {
       const submissionDetails = req.body;
       const userId = new mongoose.Types.ObjectId(req.user?._id);
       const projectId = new mongoose.Types.ObjectId(req.params?.projectid);
       const reSubmittedProject = await getReSubmittedProject(
         userId,
         projectId,
         submissionDetails,
       );
       const response = new ApiResponse(
         200,
         reSubmittedProject,
         "your project has resubmitted successfully!!",
       );
       res.status(response.statusCode).json(response);
};

const startProject = async (req, res) => {
         const userId = new mongoose.Types.ObjectId(req.user?._id);
  const projectId = new mongoose.Types.ObjectId(req.params?.projectid);
  const startedProject = await getStartProject(userId, projectId);
    const response = new ApiResponse(
      200,
      startedProject,
      "your project has started successfully!!",
    );
    res.status(response.statusCode).json(response);
}

export {
  startProject,
  allProjects,
  projectForRoadmap,
  viewProjectDetail,
  submitProject,
  viewSubmittedProject,
  resubmitProject,
};