function logError(err) {
  console.error(err);
}

function logErrorMiddleware(err, req, res, next) {
  logError(err);
  next(err);
}

function returnError(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    err.statusCode = 401;
  }
  if (res.headersSent) {
    return next(err);
  }
  res.send({
    statusCode: err.statusCode,
    name: err.name,
    message: err.message,
  });
}
module.exports = {
  logError,
  logErrorMiddleware,
  returnError,
};
