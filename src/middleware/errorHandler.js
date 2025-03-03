const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);

  if (err.response && err.response.status) {
    return res.status(err.response.status).json({
      error: "External API error",
      message: err.message,
    });
  }

  res.status(500).json({
    error: "Server error",
    message:
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred"
        : err.message,
  });
};
