import express from "express"
import asyncHandler from "../Utils/AsyncHandler.js"
import UserInfo  from "../Controllers/Users.controller/UserInfo.js";
const meRouter = express.Router()

meRouter.get("/me", asyncHandler(UserInfo));

export default meRouter;