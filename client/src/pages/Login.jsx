import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ strategy: "email", email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
