const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    console.error(err);

    // Mongoose bad ObjectId
    if (error.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message);
      error.statusCode = 404;
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
      const message = "Duplicate key error";
      error = new Error(message);
      error.statusCode = 400;
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      const messages = error.errors
        ? Object.values(error.errors).map((val) => val.message)
        : [error.message];
      error = new Error(messages.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  } catch (err) {
    next(err);
  }
};

export default errorMiddleware;
