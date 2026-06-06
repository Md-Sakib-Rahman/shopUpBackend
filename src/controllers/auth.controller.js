const authService = require("../services/auth.service");
const {
  validateRegister,
  validateLogin,
} = require("../validators/auth.validator");

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

async function register(req, res) {
  try {
    const validation = validateRegister(req.body);

    if (!validation.isValid) {
      return sendJson(res, 400, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const result = await authService.register(req.body);

    res.setHeader("Set-Cookie", [
      `refreshToken=${result.refreshToken}; HttpOnly; Path=/; SameSite=Strict`,
    ]);

    return sendJson(res, 201, {
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (err) {
    return sendJson(res, 400, {
      message: err.message,
    });
  }
}

async function login(req, res) {
  try {
    const validation = validateLogin(req.body);

    if (!validation.isValid) {
      return sendJson(res, 400, {
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const result = await authService.login(req.body);

    res.setHeader("Set-Cookie", [
      `refreshToken=${result.refreshToken}; HttpOnly; Path=/; SameSite=Strict`,
    ]);

    return sendJson(res, 200, {
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (err) {
    return sendJson(res, 401, {
      message: err.message,
    });
  }
}

module.exports = {
  register,
  login,
};