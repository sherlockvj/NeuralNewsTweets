import { BaseUser } from "./BaseUser.js";

export class GoogleUser extends BaseUser {
  constructor({ email, googleId, role }) {
    super({ email, role, provider: "google" });
    this.googleId = googleId;
  }

  toDocument() {
    return {
      email: this.email,
      googleId: this.googleId,
      role: this.role,
      provider: this.provider,
      createdAt: this.createdAt,
    };
  }
}
