import mongoose from "mongoose";
import Roadmap from "./Roadmap.model.js";
import Milestone from "./Milestone.model.js";
import ProjectTasks from "./ProjectTaks.model.js";
import ProjectResource from "./ProjectResource.model.js";
const projectSchema = new mongoose.Schema(
  {
    roadmapId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roadmap",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },

    level: {
      type: String,
      enum: ["Junior", "Mid", "Senior"],
      required: true,
    },

    estimatedDuration: {
      value: Number,
      unit: {
        type: String,
        enum: ["hours", "days", "weeks"],
      },
    },

    techStack: [String],

    tags: [String],

    skillsYouWillPractice: [String],

    learningOutcomes: [String],

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);
 
const Projects = mongoose.model("Projects", projectSchema);
export default Projects;