
// Method 1 :  Promices method

// const asyncHandler = (requestHandler) => {
//   (req,res,next) => {
//     Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
//   }
// }

export {asyncHandler}

// Method 2 : tryCatch method

const asyncHandler = (requestHandler) => async(req,res,next) => {
  try {
    await requestHandler(req,res,next);
  } catch (error) {
    res.status(error.code || 500)
       .json({
         success: false,
         message: error.message
        });
  }
} 

//both are industry standard methods i got method 2 so i am going with method 2 for now.