import { viewSubmittedProject } from "../../Utils/User.helper/SubmittedProject.js"

const getSubmittedProjectDetail = async (userId,projectId) => {
    const projectDetail = await viewSubmittedProject(userId, projectId)
    return projectDetail
}

export {getSubmittedProjectDetail}