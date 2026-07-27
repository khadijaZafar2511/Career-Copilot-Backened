import UserRoadmap from "../../Models/User.models/UserRoadmap.model.js";
import Milestone from "../../Models/Milestone.model.js"
import ApiError from "../../Utils/ApiError.js";
const createUserRoadmapService  = async(roadmapId, userId) => {
      const currentMilestone = await Milestone.findOne({
          roadmapId,
          order: 1,
        });
        if (!currentMilestone) {
          throw new ApiError(
            404,
            "current milestone not found for the specified roadmap",
          );
      }
 const  userRoadmap = await UserRoadmap.create({
        userId,
        roadmapId,
        currentMilestone: currentMilestone._id,
     });
      if (!userRoadmap) {
        throw new ApiError(400, "error in creating roadmap");
    }
  return userRoadmap;
  
}

export default createUserRoadmapService ;