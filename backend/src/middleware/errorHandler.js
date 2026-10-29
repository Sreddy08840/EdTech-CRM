function notFoundHandler(request, _response, next) {
  const error = new Error(`Cannot ${request.method} ${request.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

function errorHandler(error, _request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || error.status || 500;
  const message = statusCode >= 500
    ? error.publicMessage || 'Internal server error'
    : error.message;

  if (statusCode >= 500) {
    console.error(error.cause || error);
  }

  response.status(statusCode).json({ error: message });
}

module.exports = { errorHandler, notFoundHandler };