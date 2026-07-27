import mongoose from "mongoose"
import User from "./User.model.js";
import Roadmap from "../Roadmap.model.js";
import Milestone from "../Milestone.model.js"
import Projects from "../Projects.model.js";

const userRoadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roadmapId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roadmap",
      required: true,
    },
    currentMilestone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Milestone",
    },

    status: {
      type: String,
      enum: ["active", "paused", "completed", "dropped"],
      default: "active",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
    },

    lastAccessed: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
const UserRoadmap = mongoose.model("UserRoadmap", userRoadmapSchema);
export default UserRoadmap;