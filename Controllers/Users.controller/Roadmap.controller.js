import mongoose from "mongoose";
import Roadmap from "../../Models/Roadmap.model.js";
import ApiResponse from "../../Utils/ApiResponse.js";
import {getRoadmapDetail} from  "../../Services/Roadmap.service/roadmap.service.js"

const allRoadmaps = async (req,res) => {
    const roadmaps = await Roadmap.find();
    const response = new ApiResponse(200, roadmaps, "All available roadmaps data")
    res.status(response.statusCode).json(response);
}

const roadmapDetail = async (req, res) => {
   
  const userId = req.user?._id
    ? new mongoose.Types.ObjectId(req.user._id)
    : null;
  const roadmapId = new mongoose.Types.ObjectId(req.params?.roadmapId);
  const detailedRoadmap = await getRoadmapDetail(
    roadmapId,
    userId,
  );
const response=await new ApiResponse(200,detailedRoadmap,"roadmap have found successfully!!")
  return res.status(response.statusCode).json(response);
};





export { allRoadmaps, roadmapDetail };
  
      //  const matchedTask = userTasks.find(
      //    (usertask) => usertask.milestoneId === task.milestoneId,
      //  );


