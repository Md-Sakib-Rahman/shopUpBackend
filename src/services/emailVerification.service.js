const userRepo = require("../repository/user.repository");

const { generateEmailToken, verifyEmailToken } = require("../utils/emailToken");

const { sendEmail } = require("../utils/mailer");

const { ACCOUNT_STATUS } = require("../models/enums/user.enums");

async function sendVerificationEmail(userId) {
  const user = await userRepo.findById(userId);
  if (!user) throw new Error("User Not Found !");
  if (user.accountStatus == ACCOUNT_STATUS.EMAIL_VERIFIED)
    throw new Error("Email Already Verified");

  const emailToken = generateEmailToken(user);
  const link = `http://localhost:5000/api/email-auth/verify-email?token=${emailToken}`;

  await sendEmail(
    user.email,
    "Verify your email",
    `<p>Click below to verify your email:</p>
   <a href="${link}">Verify Email</a>`,
  );

  return { message: "Verification email sent" };
}

async function verifyEmail(token) {
  const decoded = verifyEmailToken(token);
  console.log(decoded)
  const user = await userRepo.findById(decoded.id);
  if (!user) throw new Error("User Not Found !");
  if (user.accountStatus === ACCOUNT_STATUS.EMAIL_VERIFIED) {
    throw new Error("Email already verified");
  }
  await userRepo.updateById(user._id, {
    accountStatus: ACCOUNT_STATUS.EMAIL_VERIFIED,
    updatedAt: new Date(),
  });

  return { message: "Email Verified  Successfully!" };
}

module.exports = {
  sendVerificationEmail,
  verifyEmail
}