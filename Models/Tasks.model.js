import mongoose from "mongoose";
import Resources from "./Resources.model.js";
import Milestone from "./Milestone.model.js";
const tasksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      required: true,
    },
    milestoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Milestone",
      required: true,
    },

    estimatedDuration: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Tasks = mongoose.model("Tasks", tasksSchema);
export default Tasks;