import mongoose from "mongoose"
import { allResources } from "../../Services/Resource.service/GetAllResources.service.js"
import { oneResource } from "../../Services/Resource.service/GetOneResource.service.js"
import {searchResources} from "../../Services/Resource.service/SearchResource.service.js"
import ApiResponse from "../../Utils/ApiResponse.js"

const getAllResources = async (req,res) => {
    const taskId = new mongoose.Types.ObjectId(req.params?.taskid); 
    const AllResources = await allResources(taskId);
    let response
    if (AllResources.length === 0) {
        response=new ApiResponse(200,AllResources,"no resource is associated with this taskid")
    } 
    response = new ApiResponse(
      200,
      AllResources,
      "resources  associated with this taskid",
    );
    res.status(response.statusCode).json(response)
}

const getResourceDetail = async (req, res) => {
  const resourceId = new mongoose.Types.ObjectId(req.params?.resourceid);
    const OneResources = await oneResource(resourceId);
     const response = new ApiResponse(
       200,
       OneResources,
       "resource based on id you provided",
     );
     res.status(response.statusCode).json(response)
};

const getsearchedResources = async (req, res) => {
    const userRoadmapId = new mongoose.Types.ObjectId(req.params?.userroadmapid);
    const { title = "", type = "" } = req.query;
    const searchedResources = await searchResources(title, type,userRoadmapId);
    const response=new ApiResponse(200,searchedResources,"result based on yor search ")
res.status(response.statusCode).json(response)
};


export { getAllResources, getResourceDetail, getsearchedResources };