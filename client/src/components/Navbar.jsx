import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import { isLoggedIn } from "../utils/auth";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="nav-container">

                <Link to="/" className="nav-logo"><span className="logo-text">&lt;</span>  NEURAL TWEETS
                    <span className="logo-text"> /&gt;</span></Link>

                <div
                    className={`nav-toggle ${isOpen ? "open" : ""}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                <ul className={`nav-menu ${isOpen ? "show" : ""}`}>
                    <li>
                        <Link to="/" className={isActive("/") ? "active" : ""}>
                            Home
                        </Link>
                    </li>
                    {isLoggedIn() ? (
                        <li>
                            <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
                                Dashboard
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className={isActive("/login") ? "active" : ""}>
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className={isActive("/register") ? "active" : ""}>
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
