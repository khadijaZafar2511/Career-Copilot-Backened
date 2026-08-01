import Projects from "../../Models/Projects.model.js";
import ApiError from "../../Utils/ApiError.js";
import ProjectTasks from "../../Models/ProjectTaks.model.js";
import ProjectResource from "../../Models/ProjectResource.model.js";
import UserProject from "../../Models/User.models/ProjectProgress.model.js";
const getProjectDetail = async (userId,roadmapId) => {

//  console.log("rodmap",roadmapId)
  const projectDetail = await Projects.aggregate([
    {
      $match: { roadmapId: roadmapId },
    },
    {
      $lookup: {
        from: "projecttasks",
        localField: "_id",
        foreignField: "projectId",
        pipeline: [
          {
            $lookup: {
              from: "projectresources",
              localField: "_id",
              foreignField: "taskId",
              as: "resources",
            },
          }
        ],
        as: 'tasks'
      }
    }
  ]);
// console.log(projectDetail)
  const userProject = await UserProject.findOne({
    userId,
    projectId: projectDetail[0]._id,
  });
  // console.log(userProject)

  if (userProject ) {
    projectDetail[0].status = userProject.status;
  }
 if (!projectDetail || projectDetail.length === 0) {
   throw new ApiError(404, "Details for this project have not been found");
 }

  return projectDetail[0];
};

export { getProjectDetail };
