import Resources from "../../Models/Resources.model.js"


const allResources = async (taskId) => {
     if (!taskId) {
       throw new ApiError(400, "Task ID is required");
     }
    const resources = await Resources.find({ taskId })
    return resources;
}

export { allResources };