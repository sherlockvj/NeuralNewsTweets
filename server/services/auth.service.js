import { AuthFactory } from "../auth/authFactory.js";

export const loginUser = async (strategyType, credentials) => {
  const strategy = AuthFactory(strategyType);
  return await strategy.login(credentials);
};

export const registerUser = async (strategyType, credentials) => {
  const strategy = AuthFactory(strategyType);
  return await strategy.register(credentials);
};
