
// Routes/AdminRoutes.js
import express from "express";
import * as adminController from "../../Controllers/Admin.controller/handler.controller.js";

const adminRouter = express.Router();

// Core Roadmap & Learning Paths
adminRouter.post("/roadmaps", adminController.createRoadmap);
adminRouter.post("/milestones", adminController.createMilestone);
adminRouter.post("/tasks", adminController.createTask);
adminRouter.post("/resources", adminController.createResource);
adminRouter.post("/quizzes", adminController.createQuiz);

// Project Management Tracks
adminRouter.post("/projects", adminController.createProject);
adminRouter.post("/project-tasks", adminController.createProjectTask);
adminRouter.post("/project-resources", adminController.createProjectResource);

export default adminRouter;
