
import   Roadmap from "../../Models/Roadmap.model.js"
 import  Milestone from "../../Models/Milestone.model.js"
import Tasks from "../../Models/Tasks.model.js";
import Resources from "../../Models/Resources.model.js";
import Quiz from "../../Models/Quiz.model.js";
import Projects from "../../Models/Projects.model.js";
import ProjectResource from "../../Models/ProjectResource.model.js";
import ProjectTasks from "../../Models/ProjectTaks.model.js";
import { createOne } from "./factory.controller.js"; 

export const createRoadmap = createOne(Roadmap);
export const createMilestone = createOne(Milestone);
export const createTask = createOne(Tasks);
export const createResource = createOne(Resources);
export const createQuiz = createOne(Quiz);
export const createProject = createOne(Projects);
export const createProjectTask = createOne(ProjectTasks);
export const createProjectResource = createOne(ProjectResource);