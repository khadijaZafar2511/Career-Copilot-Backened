import ApiError from "../Utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {

    
    
    if (res.headersSent) {
        console.error("Error after response was sent:", err);
        return next(err);
    }

    // Log every error
    console.error(err);

    // Operational (expected) errors
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err,
            errors: err.errors,
        });
    }

    // Unexpected errors
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};

export default errorMiddleware;

