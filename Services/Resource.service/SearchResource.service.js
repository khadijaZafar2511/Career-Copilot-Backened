import Milestone from "../../Models/Milestone.model.js";
import Resources from "../../Models/Resources.model.js"
import ApiError from "../../Utils/ApiError.js";
import UserRoadmap from "../../Models/UserRoadmap.model.js";
import Milestone from "../../Models/Milestone.model.js";
import Tasks from "../../Models/Tasks.model.js"
import Roadmap from "../../Models/Roadmap.model.js";
import mongoose from "mongoose";


const searchResources = async (title = "", type = "", userRoadmapId) => {
  if (!userRoadmapId) {
    throw new ApiError(400, "User Roadmap ID is required");
  }

  const userRoadmap = await UserRoadmap.findById(userRoadmapId);
  if (!userRoadmap) {
    throw new ApiError(404, "Roadmap with this ID was not found");
  }
  const roadmap = await Roadmap.findById(userRoadmap.roadmapId);
  if (!roadmap) {
    
    throw new ApiError (404, "roadmap has not found")
  }
  const targetRoadmapId = new mongoose.Types.ObjectId(userRoadmap.roadmapId);
  const matchConditions = {};

  if (title && title.trim()) {
    matchConditions.title = { $regex: title.trim(), $options: "i" };
  }

  if (type && type.trim()) {
    matchConditions.type = { $regex: type.trim(), $options: "i" };
  }

  const searchedResources = await Milestone.aggregate([
    {
      $match: { roadmapId: targetRoadmapId },
    },
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "milestoneId",
        as: "tasks",
      },
    },
    {
      $unwind: "$tasks",
    },
    {
      $lookup: {
        from: "resources",
        localField: "tasks._id",
        foreignField: "taskId",
        as: "resourceDetails",
      },
    },
    {
      $unwind: "$resourceDetails",
    },
    {
      $replaceRoot: { newRoot: "$resourceDetails" },
    },
    {
      $match: matchConditions,
    },
  ]);

  return searchedResources;
};


export { searchResources };



