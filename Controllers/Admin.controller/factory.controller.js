import asyncHandler from "../../Utils/AsyncHandler.js"

const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    // 1. Data persistence
    const document = await Model.create(req.body);

    // 2. Uniform JSON response
    res.status(201).json({
      status: "success",
      data: document,
    });
  });

  export {createOne}