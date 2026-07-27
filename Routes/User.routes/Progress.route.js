import express from "express";
import asyncHandler from "../../Utils/AsyncHandler.js";
import {
  getDashboardProgress,
  getRoadmapProgress,
  getMilestoneProgress,
  completeTask,

} from "../../Controllers/Users.controller/UserProgress.controller.js";
const progressRouter = express.Router()


progressRouter.post("/complete/userRoadmap/:userRoadmapid/task/:id", asyncHandler(completeTask))
progressRouter.get("/roadmap-progress/:userRoadmapid", asyncHandler(getRoadmapProgress))
progressRouter.get( "/milestone-progress/:userRoadmapid/:milestoneid",asyncHandler( getMilestoneProgress));
progressRouter.get("/dashboard-progress", asyncHandler(getDashboardProgress))


export default progressRouter;