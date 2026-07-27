import mongoose from "mongoose";
import Projects from "./Projects.model.js";
const projectTaskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      required: true,
    },

   type: {
  type: String,
  enum: [
    "planning",
    "research",
    "design",
    "setup",
    "coding",
    "refactoring",
    "testing",
    "debugging",
    "optimization",
    "security",
    "deployment",
    "documentation",
    "review"
  ],
},

    estimatedTime: {
      value: Number,
      unit: {
        type: String,
        enum: ["minutes", "hours"],
      },
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
    },

    learningObjectives: [String],

    acceptanceCriteria: [String],

    hints: [String],

    challenge: {
      type: String,
    },

    // dependencies: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "ProjectTask",
    //   },
    // ],

    isRequired: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const ProjectTasks = mongoose.model("ProjectTasks", projectTaskSchema)

export default ProjectTasks;