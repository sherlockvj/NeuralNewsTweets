import { useEffect, useRef, useState } from "react";
import { register } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Toast from "../components/Toast";
import "../styles/global.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loaderMessage, setLoaderMessage] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const intervalRef = useRef(null);

    const loaderMessages = [
        "Setting up your secure vault...",
        "Warming up the tweet engines...",
        "Checking for duplicate usernames...",
        "Encrypting your credentials...",
        "Establishing a neural handshake...",
        "Summoning AI birds to deliver tweets...",
    ];

    const startLoaderMessages = () => {
        let index = 0;
        setLoaderMessage(loaderMessages[index]);

        intervalRef.current = setInterval(() => {
            index = (index + 1) % loaderMessages.length;
            setLoaderMessage(loaderMessages[index]);
        }, 2500);
    };

    const stopLoaderMessages = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

        if (!passwordRegex.test(password)) {
            setError("Password must be at least 6 characters long and include at least one letter and one number.");
            return;
        }

        setLoading(true);
        startLoaderMessages();

        try {
            const response = await register({
                strategy: "email",
                email,
                password,
                name,
            });

            if (response.status === 200) {
                navigate("/verify-otp", { state: { email } });
            } else {
                setError("Registration failed");
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Registration failed. Email already in use!");
        } finally {
            stopLoaderMessages();
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="gradient-blob"></div>
            <div className="login-card">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span onClick={() => setShowPassword(!showPassword)} className="toggle-password">
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span onClick={() => setShowPassword(!showPassword)} className="toggle-password">
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>
                    {loading ? (
                        <div className="loader-area">
                            <div className="loader-spinner"></div>
                            <p className="loader-message">{loaderMessage}</p>
                        </div>
                    ) : (
                        <button type="submit">Register</button>
                    )}
                </form>

                <div className="register-text">
                    Already have an account? <Link to="/login">Sign in</Link>
                </div>
            </div>

            {error && (
                <Toast
                    message={error}
                    type="warning"
                    onClose={() => setError("")}
                />
            )}
        </div>
    );
}

export default Register;
