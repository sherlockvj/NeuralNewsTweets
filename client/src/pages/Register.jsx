import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { response } = await register({ strategy: "email", email, password });
            if (response.data.success)
                navigate("/verify-otp", { state: { email } });
            else
                alert("Registration failed");
        } catch (err) {
            alert("Registration failed");
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
