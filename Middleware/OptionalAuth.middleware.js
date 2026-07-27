import jwt from "jsonwebtoken";


 export const optionalAuth = async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return next();
  }

  try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    req.user = decoded;
  } catch (err) {
    // Ignore invalid token for public routes
  }

  next();
};
