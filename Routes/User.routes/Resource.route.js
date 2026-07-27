import express from "express";
import asyncHandler from "../../Utils/AsyncHandler.js";
import {
  getAllResources,
  getResourceDetail,
  getsearchedResources,
} from "../../Controllers/Users.controller/Resource.controller.js";
const resourceRouter = express.Router();

resourceRouter.get("/all-resources/:taskid", asyncHandler(getAllResources))
resourceRouter.get("/resource/:resourceid", asyncHandler(getResourceDetail))
resourceRouter.get("/resource/:userroadmapid/search", asyncHandler(getsearchedResources));
