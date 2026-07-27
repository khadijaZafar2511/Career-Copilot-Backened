import UserRoadmap from "../../Models/User.models/UserRoadmap.model.js";
import { getRoadmapDetail } from "../Roadmap.service/roadmap.service.js"
import ApiError from "../../Utils/ApiError.js";
const getRoadmapsService  = async(userId) => {
  
    
        const roadmaps = await UserRoadmap.find({ userId })
          .populate("roadmapId")
    .populate("currentMilestone", "title");
  // console.log(roadmaps)
    return roadmaps;
     
}


const getActiveRoadmapService = async (userId) => {
  const roadmap = await UserRoadmap.findOne({ userId,status:"active" })
  if (!roadmap) {
    throw new ApiError(404, "No active Roadmap has found");
  }
  const roadmapId = roadmap.roadmapId;
    const detailedRoadmap = await getRoadmapDetail(
      roadmapId,
      userId,
    );
  return detailedRoadmap;
};
export { getRoadmapsService, getActiveRoadmapService };