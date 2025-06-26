import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import OtpVerification from "./pages/OtpVerification";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route
                    path="/login"
                    element={
                        <RedirectIfAuthenticated>
                            <Login />
                        </RedirectIfAuthenticated>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <RedirectIfAuthenticated>
                            <Register />
                        </RedirectIfAuthenticated>
                    }
                />
                <Route path="/verify-otp" element={<RedirectIfAuthenticated><OtpVerification /></RedirectIfAuthenticated>} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
