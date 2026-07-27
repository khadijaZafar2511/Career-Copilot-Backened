import UserRoadmap from "../../Models/User.models/UserRoadmap.model.js";

const getactiveRoadmap = async (userId) => {
     const userRoadmap = await UserRoadmap.findOne({ userId, status: "active" })
       .populate("currentMilestone")
       .populate("roadmapId");
          if (!userRoadmap) {
            throw new ApiError(404,"no active roadmap found for this user")
        }
        return userRoadmap;
}

export { getactiveRoadmap };




