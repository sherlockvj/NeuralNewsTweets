import { useEffect } from "react";
import "../styles/toast.css";

const Toast = ({ message, onClose, type = "warning", duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    if (!message) return null;

    return (
        <div className={`toast toast-${type}`}>
            <span>{message}</span>
            <button onClick={onClose}>&times;</button>
        </div>
    );
};

export default Toast;