const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    {
      userId: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};