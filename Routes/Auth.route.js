import express from "express";
import {
  registerController,
  authController,
  logoutController,
  accessTokenController,
  oathController,
} from "../Controllers/Auth.controller.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import validateData from "../Middleware/Validation.middleware.js"
import LoginSchema from "../ValidationSchemas/Login.schema.js"
import signupSchema from "../ValidationSchemas/Signup.schema.js"
const authRouter = express.Router();

authRouter.post("/login",validateData(LoginSchema), asyncHandler(authController));
authRouter.post("/register", validateData( signupSchema), asyncHandler(registerController));
authRouter.post("/logout",  asyncHandler(logoutController));
authRouter.post("/refresh-token", asyncHandler(accessTokenController));
authRouter.get("/oath",  asyncHandler(oathController));

export default authRouter;