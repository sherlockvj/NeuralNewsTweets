import { jwtDecode } from "jwt-decode";

export function isLoggedIn() {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp && decoded.exp > currentTime;
    } catch (err) {
        return false;
    }
}

export function getUser() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (err) {
        return null;
    }
}
