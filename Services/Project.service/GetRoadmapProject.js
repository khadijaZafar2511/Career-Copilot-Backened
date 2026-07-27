import Projects from "../../Models/Projects.model.js";


const getRoadmapProject = async (roadmapId) => {
    
    const project = await Projects.find({ roadmapId }).populate("roadmapId","title slug");
    
      if (!project) {
        throw new ApiError(404, "Project fro this roadmap has not found!!");
    }
    
    return project;
}

export {getRoadmapProject}