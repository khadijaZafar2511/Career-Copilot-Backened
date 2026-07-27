import Projects from "../../Models/Projects.model.js";


const getProject = async () => {
    
    const projects = await Projects.find().populate("roadmapId","title slug");
    
    //   if (!projects) {
    //     throw new ApiError(404, "Project fro this roadmap has not found!!");
    // }
    
    return projects;
}

export {getProject}