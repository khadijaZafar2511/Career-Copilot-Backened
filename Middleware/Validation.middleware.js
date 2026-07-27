import ApiError from "../Utils/ApiError.js";
import { z } from "zod";

 const validateData = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next(); 
    } catch (error) {
      if (error instanceof z.ZodError) {
          const errorMessages = error.errors?.map(
            (err) => `${err.path.join(".")}: ${err.message}`,
          );
            throw new ApiError(400, errorMessages, "Validation Error");
        }
         res
           .status(500)
           .json({ success: false, message: "Internal Server Error" });
  
    }
  };
};

export default validateData;