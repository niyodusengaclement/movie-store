function onError(res, status, error) {
  return res.status(status).json({
    status: status,
    error,
  });
}
module.exports = onError;