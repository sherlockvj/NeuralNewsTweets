import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../services/api";
import Toast from "../components/Toast";
import "../styles/global.css";

function OtpVerification() {
    const [emailInput, setEmailInput] = useState("");
    const [otp, setOtp] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const stateEmail = location.state?.email;

    const email = stateEmail || emailInput;

    useEffect(() => {
        if (stateEmail) {
            setSuccessMessage(`OTP has been sent to ${stateEmail}`);
        }
    }, [stateEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await verifyOtp({ email, otp });

            if (response.status === 200) {
                setSuccessMessage("OTP verified successfully! Login");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                setErrorMessage("Invalid OTP");
            }
        } catch (err) {
            setErrorMessage(
                err?.response?.data?.message || "Something went wrong."
            );
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Verify OTP</h2>
                <p>Please enter the OTP sent to your email.</p>
                <form onSubmit={handleSubmit}>
                    {!stateEmail && (
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button type="submit">Verify</button>
                </form>
            </div>

            {successMessage && (
                <Toast
                    message={successMessage}
                    type="success"
                    onClose={() => setSuccessMessage("")}
                />
            )}
            {errorMessage && (
                <Toast
                    message={errorMessage}
                    type="warning"
                    onClose={() => setErrorMessage("")}
                />
            )}
        </div>
    );
}

export default OtpVerification;
