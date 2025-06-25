import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../services/api";

function OtpVerification() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await verifyOtp({
                email,
                otp,
            });

            if (response.data.success) {
                alert("OTP verified successfully!");
                navigate("/login");
            } else {
                setError("Invalid OTP");
            }
        } catch (err) {
            setError("Something went wrong.");
        }
    };

    return (
        <div className="form-container">
            <h2>OTP Verification</h2>
            <p>Please enter the OTP sent to your email.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <button type="submit">Verify</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default OtpVerification;
