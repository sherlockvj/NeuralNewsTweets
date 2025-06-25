import { getDB } from "../config/db.js";
import { EmailUser } from "../models/EmailUser.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const COLLECTION_NAME = process.env.MONGODB_USERCOLLECTION;

export async function findUserByEmail(email) {
  const db = getDB();
  return db.collection(COLLECTION_NAME).findOne({ email });
}

export async function createUser({ email, password, role = "user" }) {
  const db = getDB();

  const existingUser = await findUserByEmail(email);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  if (existingUser) {
    // If verified user already exists, block
    if (existingUser.isVerified) {
      throw new Error("User already exists and is verified.");
    }

    // If unverified user but OTP is expired, update OTP and expiry
    if (new Date() > new Date(existingUser.otpExpiry)) {
      await collection.updateOne(
        { email },
        {
          $set: {
            otp,
            otpExpiry,
            password: await bcrypt.hash(password, 10)
          },
        }
      );

      await sendOtpEmail(email, otp);
      return { id: existingUser._id, email, role };
    }
    throw new Error("User already exists. Please verify your email.");
  }

  const newUser = new EmailUser({
    email,
    password,
    role,
    isVerified: false,
    otp,
    otpExpiry,
  });

  await newUser.hashPassword();

  const { insertedId } = await db
    .collection(COLLECTION_NAME)
    .insertOne(newUser);

  await sendOtpEmail(email, otp);

  return { id: insertedId, email, role };
}

// Add OTP verification logic
export async function verifyUserOtp(email, otp) {
  const db = getDB();
  const user = await findUserByEmail(email);

  if (!user) throw new Error("User not found");
  if (user.isVerified) throw new Error("User already verified");
  console.log(user.otp + "===>" + otp);
  if (user.otp != otp) throw new Error("Invalid OTP");
  if (new Date() > new Date(user.otpExpiry)) throw new Error("OTP expired");

  await db
    .collection(COLLECTION_NAME)
    .updateOne(
      { email },
      { $set: { isVerified: true, otp: null, otpExpiry: null } }
    );
  return true;
}

export async function validateUserCredentials(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  if (!user.isVerified) throw new Error("Email not verified");

  const isMatch = await EmailUser.comparePasswords(password, user.password);
  if (!isMatch) return null;

  return user;
}

async function sendOtpEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"SIRIN" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Verify your email with OTP",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 16px;">
        <h2>🔐 Login OTP</h2>
        <p>Your OTP is:</p>
        <h1 style="color: #2c3e50">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
        <br/>
        <small>If you didn't request this, you can ignore this email.</small>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.messageId);
  } catch (err) {
    console.error("Failed to send OTP email:", err.message);
    throw new Error("Failed to send OTP");
  }
}
