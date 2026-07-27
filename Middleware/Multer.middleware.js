import multer from "multer";
import ApiError from "../Utils/ApiError.js";

const storage = multer.memoryStorage();

const limits = {
  fileSize: 1024 * 1024 * 5, // 5 mb
};
const fileFilter = (req, file, cb) => {
  const fileFilters = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];
  if (fileFilters.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        `Invalid file type. Allowed types: ${fileFilters}`,
        false,
      ),
    );
  }
};
export const upload=multer({storage,limits,fileFilter})