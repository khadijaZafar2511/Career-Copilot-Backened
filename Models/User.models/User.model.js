import mongoose from "mongoose";
import bcrypt from "bcrypt";
import ApiError from "../../Utils/ApiError.js"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    // resetPasswordToken: String,
    // resetPasswordExpire: Date,

    refreshToken: String,
    onboardingCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    skillLevel: { type: String },
    targetPace: { type: String },
    weeklyHours: { type: Number },
    timeline: { type: String },
    dailyReminder: { type: String },
    careerGoal: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if(!this.isModified("password") ) return ;
  try {
    const salt = await bcrypt.genSalt(10);
      this.password =await bcrypt.hash(this.password, salt);
    
  } catch (err) { 
    throw new ApiError(400,err);
   }
})

userSchema.methods.comparePassword = async function (currentPassword) {
  return await bcrypt.compare(currentPassword, this.password);
};

userSchema.methods.generateAccessToken =  function () {
 return jwt.sign({ _id: this._id, email: this.email ,fullname:this.fullname}, process.env.ACCESS_TOKEN, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY||"1d",
    });
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.REFRESH_TOKEN,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY|| "7d",
    },
  );
};

const User = mongoose.model("User", userSchema);
export default User;