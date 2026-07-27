

const asyncHandler = (handlerFunction) => {
   return function (req, res, next)  {
      Promise.resolve(handlerFunction(req, res, next)).catch((err) =>
        next(err),
      );
    };

} 


export default asyncHandler;