class ApiError extends Error {
  constructor(name, statusCode, message) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = { ApiError };
