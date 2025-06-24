export class BaseUser {
  constructor({ email, role = "user", provider }) {
    this.email = email;
    this.role = role;
    this.provider = provider;
    this.createdAt = new Date();
  }

  toPublicJSON() {
    return {
      email: this.email,
      role: this.role,
      provider: this.provider,
    };
  }
}
