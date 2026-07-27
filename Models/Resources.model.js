import mongoose from "mongoose";
import Tasks from "./Tasks.model.js";
const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  taskId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "Tasks ",
  },
  
});
 
const Resources = mongoose.model("Resources", resourceSchema);
export default Resources;