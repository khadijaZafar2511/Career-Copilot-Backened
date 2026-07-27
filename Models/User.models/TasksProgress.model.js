import mongoose from "mongoose"
import UserRoadmap from "./UserRoadmap.model.js";
import Tasks from "../Tasks.model.js";
import User from "./User.model.js";
import Milestone from "../Milestone.model.js";
const UserTasksSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userRoadmapId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserRoadmap",
    },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Tasks" },
    milestoneId: { type: mongoose.Schema.Types.ObjectId, ref: "Milestone" },

    status: {
      type: String,
      enum: ["pending", "active", "completed"],
    },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const UserTasks = mongoose.model("UserTasks", UserTasksSchema);
export default UserTasks;