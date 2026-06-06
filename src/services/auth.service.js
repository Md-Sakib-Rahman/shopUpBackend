const userRepo = require("../repository/user.repository");
const { userRoles } = require("../models/enums/user.enums");

const { hashPassword, comparePassword } = require("../utils/password");
const { ACCOUNT_STATUS } = require("../models/enums/user.enums");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

async function register(data) {
  if (!data.email || !data.password || !data.name) {
    throw new Error("Missing required fields");
  }

  const existingUser = await userRepo.findByEmail(data.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  if (!Object.values(userRoles).includes(data.role)) {
    throw new Error("Invalid role");
  }

  if (data.role === userRoles.ADMIN) {
    throw new Error("Cannot self register as admin");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = {
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    role: data.role || userRoles.CUSTOMER,
    passwordHash: hashedPassword,
    accountStatus: ACCOUNT_STATUS.PENDING,
    isActive: true,
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

  return {
    user: {
      _id: result.insertedId,
      name: user.name,
      email: user.email,
      role: user.role,
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

  if (user.accountStatus === ACCOUNT_STATUS.REJECTED) {
    throw new Error("Account rejected");
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

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
}

module.exports = {
  register,
  login,
};
