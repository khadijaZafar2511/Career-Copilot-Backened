import Resources from "../../Models/Resources.model.js"


const oneResource = async (resourceId) => {
     if (!resourceId) {
       throw new ApiError(400, "Resource ID is required");
     }
    const resource = await Resources.findById(resourceId);
    if (!resource) {
        throw new ApiError(404, "No resource found with this ID.");
    }
    return resource;
};
  export {oneResource}