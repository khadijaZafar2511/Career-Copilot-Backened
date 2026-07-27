import express from "express";
import {
  meController,
  onBoarding,
  profile,
  changePassword,
} from "../../Controllers/Users.controller/User.controller.js";
import asyncHandler from "../../Utils/AsyncHandler.js";
import validateData from "../../Middleware/Validation.middleware.js";
import onboardingSchema from "../../ValidationSchemas/Onboarding.schema.js";
import changePasswordSchema from "../../ValidationSchemas/Changepassword.schema.js";
const userRouter = express.Router();

userRouter.get("/me", asyncHandler(meController));
userRouter.patch("/profile", asyncHandler(profile));
userRouter.post(
  "/onboarding",
  validateData(onboardingSchema),
  asyncHandler(onBoarding),
);
userRouter.patch(
  "/changePassword",
  validateData(changePasswordSchema),
  asyncHandler(changePassword),
);

export default userRouter;
