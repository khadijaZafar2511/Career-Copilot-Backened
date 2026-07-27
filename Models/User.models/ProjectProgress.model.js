import mongoose from "mongoose"
import UserRoadmap from "./UserRoadmap.model.js";
import Tasks from "../Tasks.model.js";
import Projects from "../Projects.model.js"
import User from "./User.model.js"
const userProjectTaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projects",
  },
  userRoadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRoadmap",
  },
  githubUrl: {
    type: String,
  },
  submittedAt: Date,
  submissionNotes: {
    type: String,
  },
  submissionTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  file: {
    type: String,
  },
  status: {
    type: String,
    enum: ["accepted", "in_progress", "not_started", "submitted"],
    default: "locked",
  },

  completedAt: Date,
});

const UserProject = mongoose.model("UserProject", userProjectTaskSchema);
export default UserProject;