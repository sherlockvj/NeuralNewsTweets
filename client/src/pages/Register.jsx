import { useState } from "react";
import { register } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import Toast from "../components/Toast";
import "../styles/global.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

          setLoading(true);

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
            setError(err?.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
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
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Re-enter Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {loading ? (
                        <div className="spinner"></div>
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
