import mongoose from "mongoose";
import Projects from "./Projects.model.js";
const projectResourceSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectTask",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    topic: String,

    type: {
      type: String,
      enum: ["documentation", "video", "article", "github", "course", "tool"],
    },

    platform: String,

    url: String,

    isFree: Boolean,

    iconUrl: String,

    order: Number,
  },
  {
    timestamps: true,
  },
);
const ProjectResource = mongoose.model(
  "ProjectResource",
  projectResourceSchema,
);

export default ProjectResource;