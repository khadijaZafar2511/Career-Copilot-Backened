import mongoose from "mongoose";
import User from "../../Models/User.models/User.model.js";
import ApiError from "../../Utils/ApiError.js";
import ApiResponse from "../../Utils/ApiResponse.js";
import isOnboardingComplete from "../../Utils/isOnBoardingComplete.js";
import {
  generateAccessTokenANDgenerateRefreshToken,
  cookieOptions,
} from "../Auth.controller.js";
import { toSafeObject } from "../../Services/Safe_object.js";

const meController = async (req, res) => {
  const userid = req.user._id;
  const user = await User.findById(userid, {
    password: 0,
    __v: 0,
    refreshToken: 0,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const response = new ApiResponse(200, user, "User has found");
  res.status(response.statusCode).json(response);
  
};

const profile = async (req, res) => {
  const data = req.body;
  const { fullname } = data;
  if (!fullname) {
    throw new ApiError(400, "You have not provided name yet"); // check for status code
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User has not found "); // check for message
  }
  user.fullname = fullname;
  await user.save();
  const response = new ApiResponse(
    200,
    user,
    "fullname has updated successfully!!",
  ); // check for status code
  res.status(response.statusCode).json(response);
};
const onBoarding = async (req, res) => {
  const data = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User has not found "); // check for message
  }
  user.career = data.career ? data.career : "";
  user.skillLevel = data.skillLevel ? data.skillLevel : "";
  user.targetPace = data.targetPace ? data.targetPace : "";
  user.timeline = data.timeline ? data.timeline : "";
  user.dailyReminder = data.dailyReminder ? data.dailyReminder : "";
  user.weeklyHours = data.weeklyHours ? data.weeklyHours : 0;
  user.onboardingCompleted = isOnboardingComplete(user); // after introducing zod we would remove it
  await user.save();
  const response = new ApiResponse(
    200,
    user,
    "onboarding has updated successfully!!",
  );
  res.status(response.statusCode).json(response);
};

const changePassword = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User has not found ");
  }
  const { currentPassword, newPassword, confirmPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new ApiError(400, "All fieds are required "); // after introducing zod we would remove it
  }
  if (newPassword === currentPassword) {
    throw new ApiError(
      400,
      "Your new password cannot be the same as your current password.",
    );
  }
  if (newPassword !== confirmPassword) {
    throw new ApiError(
      400,
      "New password and confirmation password do not match.Check confirm password",
    );
  }
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(
      401,
      "Your current password couldnot match with existing one !!",
    );
  }
  user.password = newPassword;
  user.refreshToken = null;
  await user.save();

  const response = new ApiResponse(
    200,
    "Password changed successfully. Please sign in again",
  );
  return res
    .status(response.statusCode)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(response);
};

export { meController, profile, onBoarding, changePassword };
