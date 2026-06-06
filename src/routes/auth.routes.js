const { getBody } = require("../utils/bodyParser");
const authController = require("../controllers/auth.controller");

async function authRoutes(req, res) {
  const body = await getBody(req);
  req.body = body;
  const { method, url } = req;

  if (method === "POST" && url === "/api/auth/register") {
    return authController.register(req, res);
  }

  if (method === "POST" && url === "/api/auth/login") {
    return authController.login(req, res);
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      message: "Auth route not found",
    })
  );
}

module.exports = authRoutes;