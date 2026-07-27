import express from "express";
import asyncHandler from "../../Utils/AsyncHandler.js";
import {allRoadmaps,roadmapDetail} from "../../Controllers/Users.controller/Roadmap.controller.js"
const roadmapRouter = express.Router()

roadmapRouter.get("/roadmaps", asyncHandler(allRoadmaps));
roadmapRouter.get("/roadmaps/:roadmapId", asyncHandler(roadmapDetail));


export default roadmapRouter



