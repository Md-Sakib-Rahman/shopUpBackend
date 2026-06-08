const userRepo = require("../repository/user.repository");
const { userRoles } = require("../models/enums/user.enums");
const { hashPassword, comparePassword } = require("../utils/password");
const { ACCOUNT_STATUS, SELLER_STATUS } = require("../models/enums/user.enums");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

async function register(data) {
  if (!data.email || !data.password || !data.name) {
    throw new Error("Missing required fields");
  }

  const existingUser = await userRepo.findByEmail(data.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  if (data.role === userRoles.ADMIN) {
    throw new Error("Cannot self register as admin");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = {
    name: data.name,
    email: data.email,
    phone: data.phone || null,

    role: userRoles.USER,

    passwordHash: hashedPassword,

    accountStatus: ACCOUNT_STATUS.PENDING,
    sellerStatus: SELLER_STATUS.NONE,

    isActive: true,

    addresses: [],

    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await userRepo.create(user);

  const accessToken = generateAccessToken({
    _id: result.insertedId,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    _id: result.insertedId,
  });
  await userRepo.updateRefreshToken(result.insertedId, refreshToken);
  return {
    user: {
      _id: result.insertedId,
      name: user.name,
      email: user.email,

      role: user.role,

      accountStatus: user.accountStatus,

      sellerStatus: user.sellerStatus,
    },
    accessToken,
    refreshToken,
  };
}

async function login(data) {
  const user = await userRepo.findByEmail(data.email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (user.accountStatus === ACCOUNT_STATUS.SUSPENDED) {
    throw new Error("Account suspended");
  }
  if (!user.isActive) {
    throw new Error("Account deactivated");
  }
  const isMatch = await comparePassword(data.password, user.passwordHash);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken({
    _id: user._id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    _id: user._id,
  });
  await userRepo.updateRefreshToken(user._id, refreshToken);
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,

      role: user.role,

      accountStatus: user.accountStatus,

      sellerStatus: user.sellerStatus,
    },
    accessToken,
    refreshToken,
  };
}

async function refresh(refreshToken) {
  if (!refreshToken) throw new Error("No Refresh Token");
  const decoded = verifyRefreshToken(refreshToken);
  const user = await userRepo.findById(decoded.userId);
  if (!user) throw new Error("No User Found");
  if (user.refreshToken !== refreshToken)
    throw new Error("invalid refresh token");
  const newAccessToken = generateAccessToken({
    _id: user._id,
    role: user.role,
  });
  const newRefreshToken = generateRefreshToken({
    _id: user._id,
  });
  await userRepo.updateRefreshToken(user._id, newRefreshToken);
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

async function logout(userId) {
  await userRepo.clearRefreshToken(userId);

  return {
    message: "Logged out successfully",
  };
}

module.exports = {
  register,
  login,
  refresh,
  logout,
};
