const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Multer errors
  if (err.name === "MulterError") {
    statusCode = 400;
    message = err.message;
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // Duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  // Hide error details in production
  if (process.env.NODE_ENV === "production") {
    return res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Something went wrong. Please try again later."
          : message
    });
  }

  // Development response
  res.status(statusCode).json({
    success: false,
    message,
    stack: err.stack
  });
};

export default errorHandler;
