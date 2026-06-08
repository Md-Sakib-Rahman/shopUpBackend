const emailService = require("../services/emailVerification.service");

async function sendVerificationEmail(req, res) {
  try {
    const userId = req.user.userId;
    const result = await emailService.sendVerificationEmail(userId);
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  } catch (err) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: err.message }));
  }
}

async function verifyEmail(req, res) {
  try {
    const url = new URL(req.url, "http://localhost:5000");
    const token = url.searchParams.get("token");
    if (!token) throw new Error("invalid TOken or token required");
    const result = await emailService.verifyEmail(token);
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  } catch (err) {
    res.statusCode = 400;

    res.end(
      JSON.stringify({
        message: err.message,
      }),
    );
  }
}

module.exports = {
  sendVerificationEmail,
  verifyEmail,
};
