const { verifyAccessToken } = require("../utils/jwt");

async function authMiddleware(req, res) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.statusCode = 401;

      res.end(
        JSON.stringify({
          message: "Unauthorized: No token provided",
        })
      );

      return false;
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    if (!decoded) {
      res.statusCode = 401;

      res.end(
        JSON.stringify({
          message: "Unauthorized: Invalid token",
        })
      );

      return false;
    }
    console.log("DECODED TOKEN:", decoded);
    req.user = decoded;
    console.log(req.user)
    return true;
  } catch (err) {
    res.statusCode = 401;

    res.end(
      JSON.stringify({
        message: "Unauthorized",
      })
    );

    return false;
  }
}

module.exports = authMiddleware;