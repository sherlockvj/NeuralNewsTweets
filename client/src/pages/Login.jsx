import { useRef, useState } from "react";
import { login } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/global.css";
import Toast from "../components/Toast";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const intervalRef = useRef(null);

    const [loaderMessage, setLoaderMessage] = useState("");
    const loaderMessages = [
        "Warming up your tweet engine...",
        "Logging you in securely...",
        "Authenticating your awesomeness...",
        "Double-checking your credentials...",
        "Loading your personalized tweet feed...",
        "Fetching your sarcasm settings...",
        "Ensuring the snark level is just right...",
        "Grabbing the latest trends for you...",
        "Polishing your neural feathers...",
        "One moment... AI is brewing your dashboard",
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

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        startLoaderMessages();

        try {
            const response = await login({ strategy: "email", email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            const message =
                err?.response?.data?.message || "Login failed. Please try again.";
            setError(message);
        } finally {
            stopLoaderMessages();
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            {error && <Toast message={error} onClose={() => setError(null)} />}
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {loading ? (
                        <div className="loader-area">
                            <div className="loader-spinner"></div>
                            <p className="loader-message">{loaderMessage}</p>
                        </div>
                    ) : (
                        <button type="submit">Login</button>)}
                </form>
                <p className="register-text">
                    Don't have an account?{" "}
                    <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
