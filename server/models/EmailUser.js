import bcrypt from "bcrypt";
import { BaseUser } from "./BaseUser.js";

export class EmailUser extends BaseUser {
  constructor({ email, password, role, isVerified = false, otp = null, otpExpiry = null }) {
    super({ email, role, provider: "email" });
    this.password = password;
    this.isVerified = isVerified;
    this.otp = otp;
    this.otpExpiry = otpExpiry;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  static async comparePasswords(inputPassword, hashedPassword) {
    return bcrypt.compare(inputPassword, hashedPassword);
  }

  toDocument() {
    return {
      email: this.email,
      password: this.password,
      role: this.role,
      provider: this.provider,
      createdAt: this.createdAt,
      isVerified: this.isVerified,
      otp: this.otp,
      otpExpiry: this.otpExpiry,
    };
  }
}
