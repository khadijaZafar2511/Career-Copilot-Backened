import User from "../Models/User.models/User.model.js";
import ApiError from   "../Utils/ApiError.js"
import ApiResponse from "../Utils/ApiResponse.js";
import { toSafeObject } from "../Services/Safe_object.js"
import jwt from "jsonwebtoken"
const generateAccessTokenANDgenerateRefreshToken = async(userid) => {
  try {
    const user = await User.findById(userid)
  if (!user) {
       throw new ApiError(404, "Token generation failed: User not found");
  }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
 return { accessToken, refreshToken };
  }
  catch (err) {
     if (error instanceof ApiError) {
       throw error;
     }

     // 3. Catch Mongoose/Database connection errors and turn them into a clean 500 error
     throw new ApiError(
       500,
       "Internal server error occurred while establishing user session",
       error.stack,
     );
  }
  
}


    const cookieOptions = {           // for deployment
           httpOnly: true,
           secure: true, // Must be true for HTTPS/deployed
           sameSite: "none", // Must be "none" for cross-site cookies
           maxAge: 86400000 * 7,
         };


const authController = async (req, res, next) => {
 
      let response;
      const { email, password } = req.body;
      if ( !email || !password) {
        throw new ApiError(400, "email or password  is required");
      }
      
      const userWithEmail = await User.findOne({ email });
      if (!userWithEmail) {
        throw new ApiError(404, "User with this email is not exist");
      }
      const match = userWithEmail.comparePassword(userWithEmail.password);
      if (!match) {
        throw new ApiError(401, "Login failed due to wrong email or password");
      }

  
const { accessToken, refreshToken }= await generateAccessTokenANDgenerateRefreshToken(userWithEmail._id)

      const user = toSafeObject(userWithEmail);
    

     

      // for local hosting


     
      
      response = new ApiResponse(200, user, "Login successfully !!");
      return res
        .status(response.statusCode)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(response);
    
}



const registerController = async (req, res, next) => {

      let response; 
      // console.log(req.body)
    const { fullname, email, password, onboardingCompleted } = req.body;
    const userExist = await User.findOne({ email: email })
   
    if (!userExist) {
       const user= await User.create({
            fullname, email, password , onboardingCompleted
       });
        const createdUser =toSafeObject(user)
        
        response = new ApiResponse(
            201,
            createdUser,
            "User is created successfully!!",
          
        );
          return res.status(response.statusCode).json(response);
       
    }
    else {
             throw new ApiError(
              409,
              "User with this email alredy exist",
            );
           
    }
   
};

const logoutController = async (req, res, next) => {
  const userid = req.user._id;


    if (userid) {
      const user = await User.findById(userid)
      user.refreshToken = null;
      await user.save();
      }
      const response = new ApiResponse(200, "logout successfully !!")
       const cookieOptions = {
         httpOnly: true,
         secure: false, 
         sameSite: "lax", 
      
       };
      return res
        .status(response.statusCode)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(response);
  
}


const accessTokenController = async(req, res, next) => {
  try {

    // console.log("request refresh token")
    const Token = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!Token ) {
    throw new ApiError(401, "Refresh token missing or unauthorized request");
    }
    let decoded;
  try {
     decoded = jwt.verify(Token , process.env.REFRESH_TOKEN);
 
  } catch (jwterr) {
        throw new ApiError(401, "Refresh token is expired or altered", jwterr);

  }
    const user = await User.findById(decoded._id)
    if (!user) {
       throw new ApiError(
         401,
         "Session invalid: User profile no longer exists",
       );
    }
  const check = user.refreshToken == Token;
  if (!check) {
    throw new ApiError(
      401,
      "Session invalid: Refresh token has expired or been reused",
    );
  }
    const { accessToken, refreshToken } = await generateAccessTokenANDgenerateRefreshToken(user._id)
   
    user.save()
    const response = new ApiResponse(200, "Access token refreshed smoothly");
     return res
       .status(response.statusCode)
       .cookie("accessToken", accessToken, cookieOptions)
       .cookie("refreshToken", refreshToken, cookieOptions)
       .json(response);

  }
  catch (err) {
      if (
        err instanceof jwt.JsonWebTokenError ||
        err instanceof jwt.TokenExpiredError
      ) {
        return next(
          new ApiError(401, "Authorization failed: Token expired or corrupt"),
        );
      }
      next(err);
  }
}
 
const oathController = async (req, res, next) => {
  
}
export {
  authController,
  registerController,
  logoutController,
  accessTokenController,
  oathController,
  generateAccessTokenANDgenerateRefreshToken,
  cookieOptions,
};