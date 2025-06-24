import { AuthFactory } from "../auth/authFactory.js";
import { loginUser, registerUser } from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { strategy, ...credentials } = req.body;
    const { token, user } = await loginUser(strategy, credentials);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const register = async (req, res) => {
  try {
    const { strategy, ...credentials } = req.body;
    const result = await registerUser(strategy, credentials);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const strategyInstance = AuthFactory("email");
    const result = await strategyInstance.verifyOtp({ email, otp });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};