import { ZodError } from "zod";

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  // ZOD VALIDATION ERROR
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",

      errors: err.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message
      }))
    });
  }

  // NORMAL ERRORS
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error"
  });
};

export default errorMiddleware;