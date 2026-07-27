import mongoose from "mongoose";
import selectRoadmapService from "../../Services/UserRoadmap.services/Select_roadmap.js";
import createUserRoadmapService from "../../Services/UserRoadmap.services/Create_UserRoadmap.js";
import {
  getRoadmapsService,
  getActiveRoadmapService,
} from "../../Services/UserRoadmap.services/Get_roadmap.js";
import {
  pauseRoadmapService,
  resumeRoadmapService,
} from "../../Services/UserRoadmap.services/Roadmap_operations.js";
import ApiResponse from "../../Utils/ApiResponse.js";
const selectRoadmap = async (req, res) => {
  // console.log(req.user._id)
  const userid = req.user?._id;
  const roadmapId = new mongoose.Types.ObjectId(req.params.id);
  const userRoadmapInstance = await selectRoadmapService(userid, roadmapId);
  const response = new ApiResponse(
    200,
    userRoadmapInstance,
    "Roadmap is selected successfully !!",
  );
  res.status(response.statusCode).json(response);
};

const getRoadmap = async (req, res) => {
  const userId = req.user?._id;

  const roadmaps = await getRoadmapsService(userId);

  const response = new ApiResponse(
    200,
    roadmaps,
    "these roadmaps belong to user",
  );
  res.status(response.statusCode).json(response);
};
const getActiveRoadmap = async (req, res) => {
  const userId = req.user?._id;

  const roadmap = await getActiveRoadmapService(userId);
  const response = new ApiResponse(200, roadmap, "roadmap has found ");
  res.status(response.statusCode).json(response);
};

const pauseRoadmap = async (req, res) => {
  const userId = req.user?._id;

  const userRoadmapId = new mongoose.Types.ObjectId(req.params?.id);
  const pausedRoadmap = await pauseRoadmapService(userId, userRoadmapId);
  const response = new ApiResponse(
    200,
    pausedRoadmap,
    "Roadmap has pused successfully !!",
  );
  res.status(response.statusCode).json(response);
};
const resumeRoadmap = async (req, res) => {
  const userId = req.user?._id;

  const userRoadmapId = new mongoose.Types.ObjectId(req.params?.id);
  const resumedRoadmap = await resumeRoadmapService(userId, userRoadmapId);

  const response = new ApiResponse(
    200,
    resumedRoadmap,
    "Roadmap has changed to active  successfully !!",
  );
  res.status(response.statusCode).json(response);
};

const deselectRoadmap = async (req, res) => {
  const userId = req.user?._id;
  const roadmapId = new mongoose.Types.ObjectId(req.params?.id);
  const deselectedRoadmap = await deselectRoadmapService(userId, roadmapId);
  const response = new ApiResponse(
    200,
    "Roadmap has deselected successfully !!",
  );
  res.status(response.statusCode).json(response);
};

export {
  selectRoadmap,
  getRoadmap,
  pauseRoadmap,
  resumeRoadmap,
  deselectRoadmap,
  getActiveRoadmap,
};
