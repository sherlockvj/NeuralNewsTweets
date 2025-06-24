import EmailAuthStrategy from "./strategies/email.strategy.js";
// import GoogleAuthStrategy from "./strategies/google.strategy.js";
// import TwitterAuthStrategy from "./strategies/twitter.strategy.js";

export const AuthFactory = (type) => {
  switch (type) {
    case "email":
      return new EmailAuthStrategy();
    // case "google":
    //   return new GoogleAuthStrategy();
    // case "twitter":
    //   return new TwitterAuthStrategy();
    default:
      throw new Error("Unsupported auth strategy");
  }
};
