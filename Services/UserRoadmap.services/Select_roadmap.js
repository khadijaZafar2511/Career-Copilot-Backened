import Roadmap from "../../Models/Roadmap.model.js";
import UserRoadmap from "../../Models/User.models/UserRoadmap.model.js";
import ApiError from "../../Utils/ApiError.js";
import createUserRoadmapService from "./Create_UserRoadmap.js";
import User from "../../Models/User.models/User.model.js"

const selectRoadmapService =async (userId,roadmapId) => {
     
          
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(404, "Account not found or has been deactivated");
        }
  
            const roadmap = await Roadmap.findById(roadmapId)
            if (!roadmap) {
                throw new ApiError(404, "this roadmap not exist")
  }
 ;
           
          const userRoadmap = await UserRoadmap.findOne({
            userId,
            roadmapId,
         
          });
   const activeRoadmap = await UserRoadmap.findOne({
     userId,
     status: "active",
   });
  if (!userRoadmap) {
    
    if (activeRoadmap) {
      activeRoadmap.status = "paused";
      await activeRoadmap.save();
    }
     const userRoadmapInstance = createUserRoadmapService(
             roadmapId,
             userId,
    );
    return userRoadmapInstance;
  }
  else {
     if (!(userRoadmap.status === "active")) {
    
       userRoadmap.status = "active";
       if (activeRoadmap) {
           activeRoadmap.status = "paused";
           await activeRoadmap.save();
       }
     
       await userRoadmap.save();
    }
    return userRoadmap;
  }
 
       
          
        
}

export default selectRoadmapService;