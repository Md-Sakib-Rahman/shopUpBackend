const authMiddleware = require("../middleware/auth.middleware");
const emailVerificationController = require("../controllers/emailVerification.controller")
async function emailRoutes(req, res) {
  if (
    req.method === "POST" &&
    req.url === "/api/email-auth/send-verification-email"
  ) {
    console.log("emailRoutes got hit");

    const ok = await authMiddleware(req, res);

    if (!ok) return;

    return emailVerificationController.sendVerificationEmail(req, res);
  }

  if (
    req.method === "GET" &&
    req.url.startsWith("/api/email-auth/verify-email")
  ) {
    return emailVerificationController.verifyEmail(req, res);
  }

  res.statusCode = 404;

  res.end(
    JSON.stringify({
      message: "Email route not found",
    })
  );
}

module.exports = emailRoutes;