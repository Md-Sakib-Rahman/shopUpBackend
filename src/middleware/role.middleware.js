async function roleMiddleware(req, res, allowedRoles = []) {
  if (!req.user) {
    res.statusCode = 401;

    res.end(
      JSON.stringify({
        message: "Unauthorized",
      })
    );

    return false;
  }

  if (!allowedRoles.includes(req.user.role)) {
    res.statusCode = 403;

    res.end(
      JSON.stringify({
        message: "Forbidden",
      })
    );

    return false;
  }

  return true;
}

module.exports = roleMiddleware;