import mongoose from "mongoose";
import Milestone from "./Milestone.model.js";
import CareerPath from "./CareerPath.model.js";
const roadmapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  estimatedDuration: { type: String, required: true },
  tags: {
    type: [String],
    required: true,
    default: [],
  },
  icon: {
    type: String,
    required: true,
    trim: true,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "CareerPath" },
  version: {
    type: Number,
    required: true,
    default: 1,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isLatest: {
    type: Boolean,
    default: false,
  },
});

const Roadmap = mongoose.model("Roadmap", roadmapSchema)

export default Roadmap;