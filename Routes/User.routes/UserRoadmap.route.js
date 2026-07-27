import express from "express";
import {
  selectRoadmap,
  getRoadmap,
  pauseRoadmap,
  resumeRoadmap,
  deselectRoadmap,
  getActiveRoadmap,
} from "../../Controllers/Users.controller/UserRoadmpa.cotroller.js";
import {
  roadmapDetail,
} from "../../Controllers/Users.controller/Roadmap.controller.js";
import asyncHandler from "../../Utils/AsyncHandler.js";

const userRoadmapRouter = express.Router()

userRoadmapRouter.post("/:id/select", asyncHandler(selectRoadmap));
userRoadmapRouter.get("/all", asyncHandler(getRoadmap));
userRoadmapRouter.get("/active", asyncHandler(getActiveRoadmap));

userRoadmapRouter.patch("/:id/pause", asyncHandler(pauseRoadmap));
userRoadmapRouter.patch("/:id/resume", asyncHandler(resumeRoadmap));
userRoadmapRouter.patch("/:id/deselect",asyncHandler(deselectRoadmap));



export default userRoadmapRouter;