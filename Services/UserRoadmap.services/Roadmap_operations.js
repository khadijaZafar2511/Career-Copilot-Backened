import createUserRoadmapService  from "./Create_UserRoadmap.js";
import UserRoadmap from "../../Models/User.models/UserRoadmap.model.js";
import ApiError from "../../Utils/ApiError.js";
const pauseRoadmapService  =async (userId, userRoadmapId) => {
        const userRoadmap = await UserRoadmap.findOne({ userId, _id:userRoadmapId ,status:"active"}).populate("roadmapId","title icon description");
        if (!userRoadmap) {
          throw new ApiError(404, "No active roadmap found for this user.");
        }
       
        
        userRoadmap.status = "paused";
        await userRoadmap.save()
        
    return userRoadmap;
}

const resumeRoadmapService  =async (userId, userRoadmapId) => {
    
        let userRoadmap = await UserRoadmap.findOne({
           userId,
           _id:userRoadmapId,
           status: { $in: ["paused", "dropped"] },
         })
           .populate("roadmapId")
           .populate("currentMilestone");
         if (!userRoadmap) {
           throw new ApiError(404, "No paused roadmap found for this user.");
    }
    if (userRoadmap.status === "dropped") {
  userRoadmap= createUserRoadmapService (userRoadmap.roadmapId,userId)
       
    }
    const roadmapToPause = await UserRoadmap.findOne({ userId, status: "active" })
    if (roadmapToPause) {
      roadmapToPause.status = "paused";
       await roadmapToPause.save();
    }
   
         userRoadmap.status = "active";
    await userRoadmap.save();
   
    return userRoadmap;
    
      
}


const deselectRoadmapService  = async(userId, roadmapId) => {
     const userRoadmap = await UserRoadmap.findOne({ userId, roadmapId}).populate("roadmapId","title icon description")
    if (!userRoadmap) {
      throw new ApiError(404,"roadmap with this user has not found")
    }
    if (userRoadmap.status === "dropped") {
      throw new ApiError(400,"this roadmap has already deselected")
    }
    userRoadmap.status = "dropped"
    await userRoadmap.save();
    return userRoadmap;
}

export {pauseRoadmapService ,resumeRoadmapService , deselectRoadmapService } ;