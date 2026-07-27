import mongoose from "mongoose";
import Tasks from "./Tasks.model.js";
import Roadmap from "./Roadmap.model.js"
const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  roadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roadmap",
  },
  order: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  estimatedDuration: {
    type: String,
    required: true,
  },
 
});

const Milestone = mongoose.model("Milestone", milestoneSchema);
export default Milestone;