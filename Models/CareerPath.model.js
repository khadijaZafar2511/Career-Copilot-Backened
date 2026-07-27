import mongoose from "mongoose"
import Roadmap from "./Roadmap.model.js";
const careerSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  category: { type: String, required: true },
  icon: { type: String, required: true },

  difficultyLevel: { type: String, required: true },

  estimatedDuration: { type: String, required: true },
  averageSalary: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "USD", // Optional: sets a fallback currency
    },
  },
  requiredSkills: {
    type: [String],
    required: true,
    default: [],
  },
  jobGrowth: {
    type: String,
    required: true,
  },
  roadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Roadmap"
  }
});

const CareerPath = mongoose.model("CareerPath", careerSchema)

export default CareerPath;