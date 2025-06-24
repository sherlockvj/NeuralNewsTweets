import EmailAuthStrategy from "./strategies/email.strategy.js";

export const AuthFactory = (type) => {
  switch (type) {
    case "email":
      return new EmailAuthStrategy();
    default:
      throw new Error("Unsupported auth strategy");
  }
};
