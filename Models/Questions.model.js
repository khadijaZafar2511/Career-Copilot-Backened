import mongoose from "mongoose ";

const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },

    careerMappings: [
      {
        careerPathId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "CareerPath",
          required: true,
        },

        weight: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { _id: false },
);

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["single_choice", "multiple_choice"],
      default: "single_choice",
    },

    order: {
      type: Number,
      required: true,
    },

    options: {
      type: [optionSchema],
      validate: [
        (arr) => arr.length >= 2,
        "A question must have at least two options.",
      ],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Questions = mongoose.model("Questions", questionSchema)
 
export default Questions;
