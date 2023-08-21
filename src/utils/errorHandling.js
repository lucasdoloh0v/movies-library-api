class Errors {
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

const errorHandling = (error, req, res, next) => {
  if (error instanceof Errors) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.log(error);

  return res.status(500).json({ message: "Internal server error" });
};

module.exports = errorHandling;
