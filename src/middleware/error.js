function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  const code = err.code || (status === 500 ? 'INTERNAL_ERROR' : 'ERROR');
  const message = err.message || 'Something went wrong';
  const details = err.details || undefined;
  res.status(status).json({ error: { code, message, details } });
}

module.exports = errorHandler;




