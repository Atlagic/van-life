import {Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthRequired() {
    const isLoggedIn = localStorage.getItem('loggedin')
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{message: "You must be logged in first", fromPath: location.pathname }} replace /> // replace => go to the previous page, not /host after logging in
    }
    return <Outlet />
}
