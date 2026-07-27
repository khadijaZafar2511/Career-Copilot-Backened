import express from "express"
import asyncHandler from "../../Utils/AsyncHandler.js";
import {
  projectForRoadmap,
  viewProjectDetail,
  submitProject,
  viewSubmittedProject,
  resubmitProject,
  allProjects,
  startProject,
} from "../../Controllers/Users.controller/Project.controller.js";
import { upload } from "../../Middleware/Multer.middleware.js";
const projectRouter = express.Router();
projectRouter.get("/all",asyncHandler(allProjects))
projectRouter.get(
  "/:roadmapid/view",
  asyncHandler(projectForRoadmap),
);
projectRouter.get("/:roadmapid/detail", asyncHandler(viewProjectDetail))
projectRouter.post("/:projectid/start",asyncHandler(startProject))
projectRouter.patch("/:projectid/submit",upload.single('file'), asyncHandler(submitProject));
projectRouter.get(
  "/:projectid/viewsubmission",
  asyncHandler(viewSubmittedProject),
);
projectRouter.patch("/:projectid/resubmission", asyncHandler(resubmitProject));

export default projectRouter