import jwt from "jsonwebtoken"
import ApiError from "../Utils/ApiError.js";
import User from "../Models/User.models/User.model.js"
const authMiddleware = async ( req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
        throw new ApiError(401, "Authorization failed: Token missing");
    }
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        if (!decoded || !decoded._id) {
          throw new ApiError(
            401,
            "Authorization failed: Invalid token payload",
          );
        }
            const user = await User.findById(decoded._id).select(
              "-password -refreshToken",
            );
            if (!user) {
                throw new ApiError(
                  401,
                  "Unauthorized access: User no longer exists",
                );
            }
        req.user = user;
    next()
    } catch (err) {
              if (
                err instanceof jwt.JsonWebTokenError ||
                err instanceof jwt.TokenExpiredError
              ) {
                return next(
                  new ApiError(
                    401,
                    "Authorization failed: Token expired or corrupt",
                  ),
                );
              }
        next(err)
   }
}

export {authMiddleware}